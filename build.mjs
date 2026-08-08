import { readFileSync, writeFileSync, cpSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const VERSION = (process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || 'local').slice(0, 10);

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true });

const read = file => readFileSync(join(ROOT, file), 'utf8');
const stripFontImports = source => source
  .split(/\r?\n/)
  .filter(line => !line.trim().startsWith('@import'))
  .join('\n');
const trimCssComments = source => source
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\n{3,}/g, '\n\n');

const cssFiles = [
  'v3.css',
  'polish.css',
  'final-polish.css',
  'interaction-polish.css',
  'brand-assets.css',
  'mobile-stability.css',
  'campaign-v4.css',
  'performance-pass.css'
];

const css = trimCssComments(cssFiles
  .map(file => stripFontImports(read(file)))
  .join('\n\n'));
writeFileSync(join(DIST, 'app.css'), css);

function optimizeV3(source) {
  /* Legacy stylesheet injection is dead in production because CSS is bundled. */
  source = source.replace(/const polish=document\.createElement\("link"\);[\s\S]*?document\.head\.appendChild\(polish\);\s*/m, '');

  /* The performance profile is decided by performance-pass.js immediately before v3. */
  source = source.replace(
    'const root=document.documentElement;\nconst body=document.body;',
    'const root=document.documentElement;\nconst lite=root.dataset.perf==="lite";\nconst body=document.body;'
  );

  /* Mobile/lite keeps all visuals but skips decorative JS work. */
  source = source.replace('if(!reduced&&heroVisual){', 'if(!lite&&!reduced&&heroVisual){');
  source = source.replace('if(!reduced&&cutRing&&innerWidth>720){', 'if(!lite&&!reduced&&cutRing&&innerWidth>720){');
  source = source.replace('if(fine&&!reduced&&glow){', 'if(!lite&&fine&&!reduced&&glow){');
  source = source.replaceAll('if(fine&&!reduced){', 'if(!lite&&fine&&!reduced){');
  source = source.replace('if(!fine||reduced)return;', 'if(lite||!fine||reduced)return;');
  source = source.replace('if(magnetic&&fine&&!reduced){', 'if(magnetic&&!lite&&fine&&!reduced){');
  source = source.replace('if(redacted&&!reduced){', 'if(redacted&&!lite&&!reduced){');
  source = source.replace('const max=document.documentElement.scrollHeight-innerHeight;', 'const max=progress?document.documentElement.scrollHeight-innerHeight:0;');
  source = source.replace('setInterval(()=>{\n    redactIndex=', 'setInterval(()=>{\n    if(document.hidden)return;\n    redactIndex=');

  /* Particles remain on capable desktop, but decorative canvas does not need retina-2x cost. */
  source = source.replace('if(!canvas||reduced)return;', 'if(lite||!canvas||reduced)return;');
  source = source.replace('const dpr=Math.min(devicePixelRatio||1,2);', 'const dpr=Math.min(devicePixelRatio||1,1.5);');
  source = source.replace('const count=Math.min(74,Math.max(22,Math.floor(w*h/24000)));', 'const count=Math.min(56,Math.max(20,Math.floor(w*h/28000)));');

  return source;
}

const coreFiles = ['performance-pass.js', 'v3.js', 'final-polish.js', 'campaign-v4.js'];
const coreParts = coreFiles.map(file => {
  let source = read(file);
  if (file === 'v3.js') source = optimizeV3(source);
  return source;
});

coreParts.push(`(() => {
  const lite = document.documentElement.dataset.perf === 'lite';
  const loadRuntime = () => {
    const script = document.createElement('script');
    script.src = lite ? 'mobile-runtime.js?v=${VERSION}' : 'desktop-runtime.js?v=${VERSION}';
    script.async = true;
    document.head.appendChild(script);
  };
  if (lite) loadRuntime();
  else if ('requestIdleCallback' in window) requestIdleCallback(loadRuntime, {timeout:700});
  else setTimeout(loadRuntime, 90);
})();`);

const appJs = coreParts.join('\n\n');
const mobileJs = read('mobile-stability.js');
const desktopJs = read('interaction-polish.js');

/* Parse-check every generated runtime so broken concatenation never reaches Production. */
new Function(appJs);
new Function(mobileJs);
new Function(desktopJs);

writeFileSync(join(DIST, 'app.js'), appJs);
writeFileSync(join(DIST, 'mobile-runtime.js'), mobileJs);
writeFileSync(join(DIST, 'desktop-runtime.js'), desktopJs);

let html = read('index.html');

/* Source CSS/JS stays readable in GitHub; Production gets one CSS and one core JS. */
html = html.replace(/^\s*<link rel="stylesheet" href="(?:v3|polish|final-polish|interaction-polish|brand-assets|mobile-stability|campaign-v4|performance-pass)\.css[^\n]*\n/gm, '');
html = html.replace(/^\s*<script src="(?:performance-pass|v3|final-polish|mobile-stability|campaign-v4|interaction-polish)\.js[^\n]*<\/script>\s*$/gm, '');

/* Load each font family once, without legacy CSS @imports. */
html = html.replace(
  /https:\/\/fonts\.googleapis\.com\/css2\?family=Alexandria[^\"]+display=swap/,
  'https://fonts.googleapis.com/css2?family=Alexandria:wght@400..800&family=Inter:wght@400..800&display=swap'
);

const fontLink = /(<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]+>\s*)/;
html = html.replace(fontLink, `$1  <link rel="stylesheet" href="app.css?v=${VERSION}" />\n`);
html = html.replace('</body>', `  <script src="app.js?v=${VERSION}" defer></script>\n</body>`);

writeFileSync(join(DIST, 'index.html'), html);

console.log(`Production version: ${VERSION}`);
console.log(`Bundled ${cssFiles.length} CSS sources -> dist/app.css`);
console.log(`Bundled ${coreFiles.length} core JS sources -> dist/app.js`);
console.log('Pruned lite-device JS work and deferred premium desktop runtime until idle');
console.log('Copied assets and generated dist/index.html');
