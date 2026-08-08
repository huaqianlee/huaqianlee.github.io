// Render the built resume pages to PDF via Playwright (print CSS → A4).
// Run AFTER `npm run build`. Output → astro/public/resume_{cn,en}.pdf
// so the next build serves them at /resume_cn.pdf and /resume_en.pdf.
//
//   npm run build && npm run resume:pdf
//
// Uses the system-installed Google Chrome (channel: 'chrome') — no browser download.
// Override with an alternate channel via CHROME_CHANNEL if needed (e.g. "chrome-beta").

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../../dist');
const PUBLIC = path.resolve(__dirname, '../public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

if (!existsSync(path.join(DIST, 'resume', 'index.html'))) {
  console.error('✗ dist/resume/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

// Minimal static server over dist/
const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let filePath = path.join(DIST, urlPath);
    if (urlPath.endsWith('/')) filePath = path.join(filePath, 'index.html');
    if (existsSync(filePath) && (await readFile(filePath).catch(() => null)) === null) {
      // directory without trailing slash
      filePath = path.join(filePath, 'index.html');
    }
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL || 'chrome' });
const targets = [
  { url: `${base}/resume/`, out: path.join(PUBLIC, 'resume_cn.pdf') },
  { url: `${base}/resume-en/`, out: path.join(PUBLIC, 'resume_en.pdf') },
];

for (const { url, out } of targets) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.pdf({ path: out, format: 'A4', printBackground: true });
  await page.close();
  console.log(`✓ ${path.basename(out)}`);
}

await browser.close();
server.close();
console.log('Done. PDFs written to astro/public/');
