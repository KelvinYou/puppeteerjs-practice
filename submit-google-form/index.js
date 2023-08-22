const puppeteer = require('puppeteer');

const FORM_URL = "https://forms.gle/G4CXU2AAfQpGencj9";


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

// radio buttons
const radioSelectBox = '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx';
const radioBtn1 = radioSelectBox + ' > div:nth-child(1) > div > div > div.oyXaNc > div > div > span > div > div:nth-child(1) > label > div > div.d7L4fc.bJNwt.FXLARc.aomaEc.ECvBRb';
const radioBtn2 = radioSelectBox + ' > div:nth-child(1) > div > div > div.oyXaNc > div > div > span > div > div:nth-child(2) > label > div > div.d7L4fc.bJNwt.FXLARc.aomaEc.ECvBRb';

async function randomClickRadio(page) {
  const randomNum = Math.random();
  if (randomNum < 0.5) {
    await page.click(radioBtn1);
  } else {
    await page.click(radioBtn2);
  }
}

const textField1 = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(2) > div > div > div.AgroKb > div > div.RpC4Ne.oJeWuf > div.Pc9Gce.Wic03c > textarea";

const checkBox1 = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.Y6Myld > div:nth-child(2) > div:nth-child(1) > label > div";
const checkBox2 = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.Y6Myld > div:nth-child(2) > div:nth-child(2) > label > div";
const checkBox3 = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.Y6Myld > div:nth-child(2) > div:nth-child(3) > label > div";

const checkBoxes = [checkBox1, checkBox2, checkBox3];

async function randomSelectCheckboxes(page) {
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

main = async () => {
  const browser = await launchBrowser();
  const page = await openPage(browser, FORM_URL);
  
  await Promise.all([
    page.waitForNavigation({ waitUntil: ["domcontentloaded", "networkidle0"] }),
    waitForSelector(page, radioSelectBox)
  ]);

  await randomClickRadio(page);

  await page.focus(textField1);
  await page.keyboard.type("Steve, John, Kelvin");

  await randomSelectCheckboxes(page);

  // Don't forget to close the browser when you're done
  // await browser.close();
};

(() => main()) ();