// Renders each logo to PNG (2048px) and SVG, plus a preview sheet with Facebook circle crops.
// Usage: node brand/los-primos/src/render.js
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const logos = require('./logos');

const src = __dirname;
const out = path.join(src, '..');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const shoot = async (name, svg, w, h, scale) => {
    fs.writeFileSync(path.join(out, `${name}.svg`), svg);
    const html = path.join(src, `_${name}.html`);
    fs.writeFileSync(html, `<!doctype html><html><body style="margin:0">${svg.replace(
      /width="\d+" height="\d+"/, `width="${w * scale}" height="${h * scale}"`)}</body></html>`);
    await page.setViewportSize({ width: w * scale, height: h * scale });
    await page.goto('file://' + html);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(out, `${name}.png`) });
    fs.unlinkSync(html);
  };
  await shoot('01-seal', logos.seal(), 1000, 1000, 2.048);
  await shoot('02-monogram', logos.monogram(), 1000, 1000, 2.048);
  await shoot('03-papel-picado', logos.picado(), 1000, 1000, 2.048);
  await shoot('facebook-cover', logos.cover(), 1640, 624, 1);

  // Preview: each concept as Facebook shows it (circle) at large and tiny sizes
  const names = ['01-seal', '02-monogram', '03-papel-picado'];
  const cell = (n) => `<div style="text-align:center">
      <img src="${n}.png" style="width:340px;height:340px;border-radius:50%;box-shadow:0 2px 12px #0003">
      <div style="margin-top:14px;display:flex;gap:14px;justify-content:center;align-items:center">
        <img src="${n}.png" style="width:72px;border-radius:50%"><img src="${n}.png" style="width:40px;border-radius:50%">
      </div><div style="font:600 18px Archivo;margin-top:10px">${n.replace(/^\d+-/, '').replace('-', ' ')}</div></div>`;
  fs.writeFileSync(path.join(out, '_preview.html'), `<!doctype html><html><head><style>
    @font-face{font-family:Archivo;src:url(src/Archivo.ttf)}</style></head>
    <body style="margin:0;background:#fff;padding:40px;display:flex;gap:50px;font-family:Archivo">
    ${names.map(cell).join('')}</body></html>`);
  await page.setViewportSize({ width: 1200, height: 560 });
  await page.goto('file://' + path.join(out, '_preview.html'));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(out, 'preview-facebook-crop.png') });
  fs.unlinkSync(path.join(out, '_preview.html'));
  await browser.close();
})();
