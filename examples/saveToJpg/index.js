const { getBrowser, closeBrowser } = require("../../src/puppeteer/index");
const viewPort = { width: 1280, height: 800 };
const options = {
  path: "clipped_blindMonk.png",
  fullPage: false,
  clip: {
    x: 0,
    y: 72,
    width: 1280,
    height: 234,
  },
};
(async () => {
  try {
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.setViewport(viewPort);
    await page.goto("https://juejin.cn/user/3016715636842622");
    await page.screenshot(options);
    await closeBrowser();
  } catch (e) {
    console.log(e);
  }
})();
