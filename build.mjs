import { readFileSync, writeFileSync, cpSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true });

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

let css = cssFiles
  .map(file => `/* ---- ${file} ---- */\n${readFileSync(join(ROOT, file), 'utf8')}`)
  .join('\n\n');

// Fonts are loaded once from <head>; avoid the legacy @import request from v3.css.
css = css.replace(/@import\s+url\([^;]+\);?/g, '');
writeFileSync(join(DIST, 'app.css'), css);

const jsFiles = [
  'performance-pass.js',
  'v3.js',
  'final-polish.js',
  'mobile-stability.js',
  'campaign-v4.js',
  'interaction-polish.js'
];

let jsParts = jsFiles.map(file => {
  let source = readFileSync(join(ROOT, file), 'utf8');

  if (file === 'v3.js') {
    // Remove the legacy duplicate polish stylesheet injection. The current CSS is bundled in app.css.
    source = source.replace(/const polish=document\.createElement\("link"\);[\s\S]*?document\.head\.appendChild\(polish\);\s*/m, '');
  }

  if (file === 'interaction-polish.js') {
    // Campaign CSS/JS is already included in the production bundles; never request it a second time.
    source = source.replace(/\s*if \(!document\.querySelector\('link\[data-elitedom-campaign\]'\)\) \{[\s\S]*?\}\s*if \(!document\.querySelector\('script\[data-elitedom-campaign\]'\)\) \{[\s\S]*?\}\s*/m, '\n');
  }

  return `/* ---- ${file} ---- */\n${source}`;
});

writeFileSync(join(DIST, 'app.js'), jsParts.join('\n\n'));

let html = readFileSync(join(ROOT, 'index.html'), 'utf8');

// Replace the stack of local stylesheets with one production stylesheet.
html = html.replace(/^\s*<link rel="stylesheet" href="(?:v3|polish|final-polish|interaction-polish|brand-assets|mobile-stability|campaign-v4|performance-pass)\.css[^\n]*\n/gm, '');
const fontLink = /(<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]+>\s*)/;
html = html.replace(fontLink, `$1  <link rel="stylesheet" href="app.css?v=2" />\n`);

// Replace all runtime fragments with a single ordered production bundle.
html = html.replace(/^\s*<script src="(?:performance-pass|v3|final-polish|mobile-stability|campaign-v4|interaction-polish)\.js[^\n]*<\/script>\s*$/gm, '');
html = html.replace('</body>', '  <script src="app.js?v=2" defer></script>\n</body>');

writeFileSync(join(DIST, 'index.html'), html);

console.log(`Built ${cssFiles.length} CSS files -> dist/app.css`);
console.log(`Built ${jsFiles.length} JS files -> dist/app.js`);
console.log('Copied assets and generated dist/index.html');
