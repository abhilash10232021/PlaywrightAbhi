
import { test,expect } from '@playwright/test';
 test('Playwright special locators', async({page})=>
 {
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").check();
await page.getByLabel("Gender").selectOption("Female");
await page.getByLabel("Employed").check();
await page.getByPlaceholder("Password").fill("Test");
await page.getByRole("button",{name:'Submit'}).click();
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
await page.getByRole("link",{name:"shop"}).click();
await page.locator("card-body").filter({hastext:'Nokia Edge'}).getByRole("button").click();



 });



