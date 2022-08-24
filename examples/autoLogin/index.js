const { getBrowser, closeBrowser } = require("../../src/puppeteer/index");
const screenshot = "github.png";
(async () => {
  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.goto("https://github.com/login");
  await page.type("#login_field", process.env.GITHUB_USER);
  await page.type("#password", process.env.GITHUB_PWD);
  await page.click('[name="commit"]');
  await page.waitForNavigation();
  await page.screenshot({ path: screenshot });
  closeBrowser();
  console.log("See screenshot: " + screenshot);
})();
