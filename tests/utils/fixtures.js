const { APiUtils } = require('./APiUtils.js');
const { request } = require('@playwright/test');
const base = require('@playwright/test');
const loginPayLoad = { userEmail: "abhilashsky10@gmail.com", userPassword: "Testing@123" };
const orderPayLoad = { country: "India", productName: "Zara Coat", quantity: 1 };
exports.customtest = base.test.extend(
    {

        authenticatedpage: async ({ browser }, use) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
            await page.getByPlaceholder("email@example.com").fill("abhilashsky10@gmail.com");
            await page.getByPlaceholder("enter your passsword").fill("Testing@123");
            await page.getByRole('button', { name: 'login' }).click();
            await page.waitForLoadState('networkidle');
            await use(page);
        },
        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APiUtils(apiContext, loginPayLoad);
            const response = await apiUtils.createOrder(orderPayLoad);
            await use(response);

        }
    }

);