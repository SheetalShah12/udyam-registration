// test_scraper.js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // false so you can see browser
  const page = await browser.newPage();
  await page.goto('https://example.com', { waitUntil: 'networkidle2' });

  const title = await page.title();
  console.log("Page title:", title);

  await browser.close();
})();
