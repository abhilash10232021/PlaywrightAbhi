const {test}=require('@playwright/test');
// test - These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
/*test('@Child Window Handles',async({browser})=>{
const context=await browser.newContext();//create new incognito browser context
const page=await context.newPage();//create new page in the incognito browser context
const userName=page.locator("#username");//locator for username text box
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink= page.locator("[href*='documents-request']");

const [newpage]=await Promise.all([
context.waitForEvent('page'),//wait for new page to open    
    documentLink.click(),
])

    const text=await newpage.locator(".red").textContent();//get text from new page
    //pause the test execution to see the new page opened
   
   const arraytext=text.split("@");//split the text by @ symbol and store in array
   const domain=arraytext[1].split(" ")[0];//split the second element of the array by space and get the first
   console.log(domain);//print the domain
   await page.locator("#username").fill(domain);//fill the username text box with the domain
   await page.pause();//pause the test execution to see the username text box filled with the domain
});*/

/*const { test } = require('@playwright/test');

test('@Child Window Handles', async ({ page, context }) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("[href*='documents-request']").click()
    ]);

    await newPage.waitForLoadState();

    const text = await newPage.locator('.red').textContent();
    const domain = text.split('@')[1].split(' ')[0];

    await page.locator('#username').fill(domain);

    await page.pause();
});*/

test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 })