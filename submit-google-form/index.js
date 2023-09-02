const { 
  launchBrowserWithOptions,
  openPage, 
  randomClickRadio,
  randomSelectCheckboxes,
  typeText,
  clickButton,
} = require('./src/utils/puppeteerUtils.js');

const FORM_URL = "https://forms.gle/G4CXU2AAfQpGencj9";

const radioSelectBox = '#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx';

const RADIO_SELECTORS = [
  radioSelectBox + ' > div:nth-child(1) > div > div > div.oyXaNc > div > div > span > div > div:nth-child(1) > label > div > div.d7L4fc.bJNwt.FXLARc.aomaEc.ECvBRb',
  radioSelectBox + ' > div:nth-child(1) > div > div > div.oyXaNc > div > div > span > div > div:nth-child(2) > label > div > div.d7L4fc.bJNwt.FXLARc.aomaEc.ECvBRb',
];

const textField1 = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(2) > div > div > div.AgroKb > div > div.RpC4Ne.oJeWuf > div.Pc9Gce.Wic03c > textarea";

const checkBox1 = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.Y6Myld > div:nth-child(2) > div:nth-child(1) > label > div";
const checkBox2 = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.Y6Myld > div:nth-child(2) > div:nth-child(2) > label > div";
const checkBox3 = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.o3Dpx > div:nth-child(3) > div > div > div.Y6Myld > div:nth-child(2) > div:nth-child(3) > label > div";

const checkBoxes = [checkBox1, checkBox2, checkBox3];

const submitButton = "#mG61Hd > div.RH5hzf.RLS9Fe > div > div.ThHDze > div.DE3NNc.CekdCb > div.lRwqcd > div > span";

const fillOutForm = async (page) => {
  await Promise.all([
    page.waitForNavigation({ waitUntil: ["domcontentloaded", "networkidle0"] }),
  ]);

  await randomClickRadio(page, RADIO_SELECTORS);

  await typeText(
    page, 
    textField1, 
    "Steve, John, Kelvin"
  );
  
  await randomSelectCheckboxes(page, checkBoxes);

  await clickButton(page, submitButton);
};

(() => {
  for (var i = 0; i < 5; i++) {
    main()
  }
})();

async function main() {
  const browser = await launchBrowserWithOptions();

  while (true) {
    const page = await openPage(browser, FORM_URL);
    await fillOutForm(page);
  }

  // await browser.close();
}