const puppeteer = require('puppeteer');

// radio buttons
const radioSelectBox = '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx';
const radioBtn1 = radioSelectBox + ' > div:nth-child(1) > div > div > div.oyXaNc > div > div > span > div > div:nth-child(1) > label > div > div.d7L4fc.bJNwt.FXLARc.aomaEc.ECvBRb';
const radioBtn2 = radioSelectBox + ' > div:nth-child(1) > div > div > div.oyXaNc > div > div > span > div > div:nth-child(2) > label > div > div.d7L4fc.bJNwt.FXLARc.aomaEc.ECvBRb';

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
  let pages = await browser.pages();
  let page = pages[0];
  await page.goto(url);
  return page;
}

async function waitForSelector(page, selector) {
  await page.waitForSelector(selector);
}

async function randomClickRadio(page) {
  const randomNum = Math.random();
  if (randomNum < 0.5) {
    await page.click(radioBtn1);
  } else {
    await page.click(radioBtn2);
  }
}

(async () => {
  const browser = await launchBrowser();
  const page = await openPage(browser, "https://forms.gle/G4CXU2AAfQpGencj9");
  
  await Promise.all([
    page.waitForNavigation({ waitUntil: ["domcontentloaded", "networkidle0"] }),
    waitForSelector(page, radioSelectBox)
  ]);

  await randomClickRadio(page);

  // Don't forget to close the browser when you're done
  // await browser.close();
})();