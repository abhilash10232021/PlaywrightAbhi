const {test,expect}= require('@playwright/test')

test("Handling popups",async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
await page.pause();
page.on('dialog',dialog => dialog.accept());//dialog.dismiss()// java/java script popups
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();// mouse hover
await page.getByText("Reload").click();//select option on mouse hover
const framespage=await page.frameLocator("#courses-iframe");
//await framespage.locator("li a [href*='lifetime-access']:isvisible").click();
await framespage.getByRole('link', {name:'lifetime-access'}).click();
const textcheck = await framespage.locator(".text h2").textContent();
console.log(textcheck.split("").nth(1));





});