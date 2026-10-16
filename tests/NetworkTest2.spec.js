const {test,expect} = require('@playwright/test');

test('Security test request intercept',async({page})=>
{
//login and reach order page
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.getByPlaceholder("email@example.com").fill("abhilashsky10@gmail.com");
await page.locator("#userPassword").fill("Testing@123");
await page.getByRole('button',{name:'login'}).click();
await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().click();
await page.getByRole('button', { name: 'ORDERS' });


await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route=>route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=76767667676766776"})

)

await page.locator("button:has-text('View')").first().click();
await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");



})