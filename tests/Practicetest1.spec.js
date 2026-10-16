const { test } = require('@playwright/test');


test('Browser context playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('abhilashsky10@gmail.com');
    await page.locator('#userPassword').fill('Testing@123');
    await page.locator('#login').click();
    console.log(await page.locator('.card-body b ').first().textContent());


});

test('Client app login', async ({ page }) => {
    
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('abhilashsky10@gmail.com');
    await page.locator('#userPassword').fill('Testing@123');
    await page.locator('#login').click();
    //console.log(await page.locator('.card-body b ').first().textContent());
    await page.locator('.card-body b ').first().waitFor();
    console.log(await page.locator('.card-body b ').allTextContents());


});
