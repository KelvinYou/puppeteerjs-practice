const { 
  launchBrowserWithOptions,
  openPage, 
  randomClickRadio,
  randomSelectCheckboxes,
  typeText,
  clickButton,
  getTextContext,
} = require('./src/utils/puppeteerUtils');

const fs = require('fs-extra');
const path = require('path');
const { PHONE_DETAIL_PATH } = require('./src/constants/routes');

const getPhoneDetail = (filePath) => {
  
  let phoneDetail = [];
  // Check if the JSON file already exists
  if (!fs.existsSync(filePath)) {
    return;
  }
  // Read the existing JSON data from the file
  phoneDetail = JSON.parse(fs.readFileSync(filePath));
  console.log("phoneDetail:", phoneDetail);

  return phoneDetail;
}

(async () => {
  const filePath = path.join(__dirname, PHONE_DETAIL_PATH);
  const { phoneId, phoneName } = getPhoneDetail(filePath);

  const gsmLink = `https://www.gsmarena.com/${phoneName.replace(/\s+/g, '_').toLowerCase()}-${phoneId}.php`;

  const browser = await launchBrowserWithOptions();
  const page = await openPage(browser, gsmLink);

  const osSelector = "#specs-list > table:nth-child(6) > tbody > tr:nth-child(1) > td.nfo";
  console.log("Text is: " + await getTextContext(page, osSelector))

  await browser.close();

  // Write the updated data back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify({
    phoneId,
    phoneName,
    "hehe": "hehe"
  }, null, 2));

  console.log(`Data saved to ${PHONE_DETAIL_PATH}`);
})();