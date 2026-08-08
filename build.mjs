import { readFileSync, writeFileSync, cpSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true });

const read = file => readFileSync(join(ROOT, file), 'utf8');
const stripFontImports = source => source
  .split(/\r?\n/)
  .filter(line => !line.trim().startsWith('@import'))
  .join('\n');

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

const css = cssFiles
  .map(file => `/* ---- ${file} ---- */\n${stripFontImports(read(file))}`)
  .join('\n\n');
writeFileSync(join(DIST, 'app.css'), css);

function cleanV3(source) {
  // The current CSS is bundled. Never inject an older polish sheet at runtime.
  return source.replace(/const polish=document\.createElement\("link"\);[\s\S]*?document\.head\.appendChild\(polish\);\s*/m, '');
}

function cleanDesktopEffects(source) {
  // Campaign resources are already part of app.css/app.js; do not request them again.
  return source.replace(/\s*if \(!document\.querySelector\('link\[data-elitedom-campaign\]'\)\) \{[\s\S]*?\}\s*if \(!document\.querySelector\('script\[data-elitedom-campaign\]'\)\) \{[\s\S]*?\}\s*/m, '\n');
}

const coreFiles = ['performance-pass.js', 'v3.js', 'final-polish.js', 'campaign-v4.js'];
const coreParts = coreFiles.map(file => {
  let source = read(file);
  if (file === 'v3.js') source = cleanV3(source);
  return `/* ---- ${file} ---- */\n${source}`;
});

coreParts.push(`/* ---- adaptive runtime loader ---- */
(() => {
  const lite = document.documentElement.dataset.perf === 'lite';
  const script = document.createElement('script');
  script.src = lite ? 'mobile-runtime.js?v=3' : 'desktop-runtime.js?v=3';
  script.async = true;
  document.head.appendChild(script);
})();`);

const appJs = coreParts.join('\n\n');
const mobileJs = `/* ---- mobile-stability.js ---- */\n${read('mobile-stability.js')}`;
const desktopJs = `/* ---- interaction-polish.js ---- */\n${cleanDesktopEffects(read('interaction-polish.js'))}`;

// Parse-check bundles during every deployment so a bad concatenation can never reach production.
new Function(appJs);
new Function(mobileJs);
new Function(desktopJs);

writeFileSync(join(DIST, 'app.js'), appJs);
writeFileSync(join(DIST, 'mobile-runtime.js'), mobileJs);
writeFileSync(join(DIST, 'desktop-runtime.js'), desktopJs);

let html = read('index.html');

// Remove the development stylesheet stack; production serves one CSS file.
html = html.replace(/^\s*<link rel="stylesheet" href="(?:v3|polish|final-polish|interaction-polish|brand-assets|mobile-stability|campaign-v4|performance-pass)\.css[^\n]*\n/gm, '');

// One variable font file per family instead of multiple static weights, with no CSS @imports.
html = html.replace(
  /https:\/\/fonts\.googleapis\.com\/css2\?family=Alexandria[^\"]+display=swap/,
  'https://fonts.googleapis.com/css2?family=Alexandria:wght@400..800&family=Inter:wght@400..800&display=swap'
);

const fontLink = /(<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]+>\s*)/;
html = html.replace(fontLink, `$1  <link rel="stylesheet" href="app.css?v=3" />\n`);

// Remove all source runtime fragments; app.js loads the small device-specific runtime only when needed.
html = html.replace(/^\s*<script src="(?:performance-pass|v3|final-polish|mobile-stability|campaign-v4|interaction-polish)\.js[^\n]*<\/script>\s*$/gm, '');
html = html.replace('</body>', '  <script src="app.js?v=3" defer></script>\n</body>');

writeFileSync(join(DIST, 'index.html'), html);

console.log(`Bundled ${cssFiles.length} CSS sources -> dist/app.css`);
console.log(`Bundled ${coreFiles.length} core JS sources -> dist/app.js`);
console.log('Split mobile/desktop interaction runtimes and removed legacy font imports');
console.log('Copied assets and generated dist/index.html');
