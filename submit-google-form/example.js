const puppeteer = require('puppeteer');

const URL = "https://forms.gle/G4CXU2AAfQpGencj9";
const SELECTORS = {
  radioSelectBox: '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx',
  radioBtn1: '...', // Your selector here
  radioBtn2: '...', // Your selector here
  textField1: '...', // Your selector here
  checkBox1: '...', // Your selector here
  checkBox2: '...', // Your selector here
  checkBox3: '...'  // Your selector here
};

async function launchBrowser() {
  return puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: [
      "--mute-audio",
    ],
    args: [
      "--deny-permission-prompts",
      "--autoplay-policy=no-user-gesture-required",
    ]
  });
}

async function openPage(browser, url) {
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto(url);
  return page;
}

async function waitForSelector(page, selector) {
  await page.waitForSelector(selector);
}

async function randomClickRadio(page) {
  const randomNum = Math.random();
  const radioBtn = randomNum < 0.5 ? SELECTORS.radioBtn1 : SELECTORS.radioBtn2;
  await page.click(radioBtn);
}

async function randomSelectCheckboxes(page) {
  const shuffledCheckboxes = [...Object.values(SELECTORS).slice(3)]; // Skip radio buttons and text field
  // Shuffle logic here...
}

async function main() {
  const browser = await launchBrowser();
  const page = await openPage(browser, URL);

  await Promise.all([
    page.waitForNavigation({ waitUntil: ["domcontentloaded", "networkidle0"] }),
    waitForSelector(page, SELECTORS.radioSelectBox)
  ]);

  await randomClickRadio(page);

  await page.focus(SELECTORS.textField1);
  await page.keyboard.type("Steve, John, Kelvin");

  await randomSelectCheckboxes(page);

  // Don't forget to close the browser when you're done
  // await browser.close();
}

main();
