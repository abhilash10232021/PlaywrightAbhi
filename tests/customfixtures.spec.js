const { expect } = require('@playwright/test');
const {customtest}= require('../tests/utils/fixtures.js');

customtest("Fixtures demo", async ({ authenticatedpage, createOrder }) => {

    await authenticatedpage.goto("https://rahulshettyacademy.com/client/#/dashboard");
    await authenticatedpage.locator("button[routerlink*='myorders']").click();
    await authenticatedpage.locator("tbody").waitFor();
    await expect(authenticatedpage.getByText(createOrder.orderId)).toBeVisible();
});



