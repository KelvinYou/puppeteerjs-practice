const puppeteer = require('puppeteer');

// login
const groupIdInput = "#oDivDefine2 > div > div.menuContenttop > table > tbody > tr:nth-child(1) > td:nth-child(2) > input:nth-child(1)";
const userIdInput = "#oDivDefine2 > div > div.menuContenttop > table > tbody > tr:nth-child(1) > td:nth-child(2) > input:nth-child(2)";
const passwordInput = "#oDivDefine2 > div > div.menuContenttop > table > tbody > tr:nth-child(2) > td:nth-child(2) > input:nth-child(1)";
const signInBtn = "#oDivDefine2 > div > div.menuContenttop > table > tbody > tr:nth-child(3) > td:nth-child(2) > div > a:nth-child(1) > img";

(async () => {
  // const browser = await puppeteer.launch({
  //   headless: false,
  //   ignoreDefaultArgs: [
  //       "--mute-audio",
  //   ],
  //   args: [
  //       "--deny-permission-prompts",
  //       "--autoplay-policy=no-user-gesture-required",
  //   ]
  // });
  // let pages = await browser.pages();
  // let page = pages[0];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await Promise.all([
    page.goto("http://localhost:4002/cb/local/coral/index.html"),
    page.waitForNavigation({ waitUntil: ["domcontentloaded", "networkidle0"] })
  ]);

  const card = await page.$('#contDefine');
  await card.hover();
  
  await page.focus(groupIdInput)
  await page.keyboard.type("DEMO")

  await page.focus(userIdInput)
  await page.keyboard.type("DUSER")

  await page.focus(passwordInput)
  await page.keyboard.type("Demo2222")

  await Promise.all([
    page.click(signInBtn),
    page.waitForNavigation({waitUntil: ["domcontentloaded", "networkidle2"]})
  ]);

  await page.screenshot({path: 'coralwork2.png'})
  await browser.close();
})();