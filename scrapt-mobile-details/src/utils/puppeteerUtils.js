const puppeteer = require('puppeteer');

const launchBrowserWithOptions = async (headless = true) => {

    return puppeteer.launch({
      headless: headless ? "new" : false,
      ignoreDefaultArgs: [
        "--mute-audio",
      ],
      args: [
        "--deny-permission-prompts",
        "--autoplay-policy=no-user-gesture-required",
      ]
    });
}

const openPage = async (browser, url) => {
  const pages = await browser.pages();
  const page = pages[0];
  await page.goto(url);
  return page;
}

const openPageInNewTab = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

async function randomClickRadio(page, radioSelectors) {
  await page.waitForSelector(radioSelectors[radioSelectors.length - 1]);
  const randomIndex = Math.floor(Math.random() * radioSelectors.length);
  const radioBtn = radioSelectors[randomIndex];
  await page.click(radioBtn);
}

const randomSelectCheckboxes = async (page, checkBoxes) => {
  const shuffledCheckboxes = [...checkBoxes]; // Create a copy of the checkboxes array
  for (let i = shuffledCheckboxes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCheckboxes[i], shuffledCheckboxes[j]] = [shuffledCheckboxes[j], shuffledCheckboxes[i]];
  }

  const numberOfCheckboxesToSelect = Math.floor(Math.random() * 3) + 1; // Random number from 1 to 3

  for (let i = 0; i < numberOfCheckboxesToSelect; i++) {
    const checkboxSelector = shuffledCheckboxes[i];
    await page.click(checkboxSelector);
  }
}

const typeText = async (page, selector, text) => {
  await page.waitForSelector(selector);
  await page.focus(selector);
  await page.keyboard.type(text);
}

const typeRandomText = async (page, selector, texts) => {
  const randomIndex = Math.floor(Math.random() * texts.length);
  const randomText = texts[randomIndex];
  await typeText(page, selector, randomText);
}

const clickButton = async (page, btnSelector) => {
  await page.waitForSelector(btnSelector);
  await page.click(btnSelector);
}

const getTextContext = async (page, selector) => {
  const f = await page.$(selector)
  const text = await (await f.getProperty('textContent')).jsonValue()
  return text;
}

module.exports = {
  launchBrowserWithOptions,
  openPage,
  openPageInNewTab,
  randomClickRadio,
  randomSelectCheckboxes,
  typeText,
  clickButton,
  getTextContext,
};
