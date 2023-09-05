const { 
  launchBrowserWithOptions,
  openPage, 
  randomClickRadio,
  randomSelectCheckboxes,
  typeText,
  clickButton,
} = require('./src/utils/puppeteerUtils');

const fs = require('fs-extra');
const path = require('path');
const { PHONE_LIST_PATH } = require('./src/constants/routes');
const { todayDateTime } = require('./src/utils/dateUtils');

(async () => {
  const link = "https://www.gsmarena.com/compare.php3";
  const browser = await launchBrowserWithOptions();
  const page = await openPage(browser, link);

  console.log(`Visiting ${link}`)

  const searchTerm = "iphone";
  await typeText(
    page, 
    '#sSearch1',
    searchTerm
  );
  await clickButton(page, '#body > header > div:nth-child(1) > div.candidate-search.candidate-search-1 > form > input.button.button-small');
  await page.waitForSelector("#body > header > div:nth-child(1) > div.candidate-search.candidate-search-1 > ul");
  const phones = await page.$eval(
    "#body > header > div:nth-child(1) > div.candidate-search.candidate-search-1 > ul",
    (ul) => {
        const phones = [];
        for (let i = 0; i < ul.children.length; i++) {
          const phoneInnerHtml = ul.children[i].innerHTML;

          // Use regular expression to extract the idPhone1 value
          const match = phoneInnerHtml.match(/idPhone1=(\d+)/);

          if (match) {
            const phoneId = match[1];
            const phoneName = ul.children[i].textContent;


            phones.push({ 
              phoneId,
              phoneName,
            });
          } else {
            console.log('idPhone1 not found in the HTML string.');
          }
        }

        return phones;
    }
  );
  await browser.close();

  const filePath = path.join(__dirname, PHONE_LIST_PATH);

  let existingData = [];
  // Check if the JSON file already exists
  if (fs.existsSync(filePath)) {
    // Read the existing JSON data from the file
    existingData = JSON.parse(fs.readFileSync(filePath)).phones;
    
    // Update or add entries based on phoneId
    phones.forEach((newEntry) => {
      const existingEntryIndex = existingData.findIndex((entry) => entry.phoneId === newEntry.phoneId);
      if (existingEntryIndex !== -1) {
        // If an entry with the same phoneId exists, update it with the new data
        existingData[existingEntryIndex] = newEntry;
      } else {
        // If not, add the new entry
        existingData.push(newEntry);
      }
    });
  } else {
    // If the JSON file doesn't exist, use the scraped data as is
    existingData = phones;
  }

  // Sort the existingData array by phoneId (id property) in ascending order
  existingData.sort((a, b) => {
    // Convert id values to numbers for proper numeric comparison
    const idA = parseInt(a.phoneId);
    const idB = parseInt(b.phoneId);

    return idA - idB;
  });


  // Write the updated data back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify({
    modifiedDate: todayDateTime(),
    phones: existingData
  }, null, 2));

  console.log(`Data saved to ${PHONE_LIST_PATH}`);
})();
