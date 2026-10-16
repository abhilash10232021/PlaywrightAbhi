const {test,expect}=require('@playwright/test')

test("hidden feature",async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.goto("https://www.google.com/");
await page.goBack();
await page.goForward();


});