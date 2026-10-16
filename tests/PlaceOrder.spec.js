
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayload = {
    userEmail: "abhilashsky10@gmail.com",
    userPassword: "Testing@123"
};

const orderPayload = {
    orders: [
        {
            country: "Cuba",
            productOrderedId: "6960eac0c941646b7a8b3e68"
        }
    ]
};

let token;
let orderID;

test.beforeAll(async () => {

    // Create API context
    const apiContext = await request.newContext();

    // Create API utility object
    const apiUtils = new APIUtils(apiContext, loginPayload);

    // Login + Create Order
    const response = await apiUtils.createOrder(orderPayload);

    token = response.token;
    orderID = response.orderID;

    console.log("Token:", token);
    console.log("Order ID:", orderID);

    await apiContext.dispose();
});


test('Verify created order in My Orders page', async ({ page }) => {

    // Inject token into browser local storage
    await page.addInitScript((value) => {
        window.localStorage.setItem('token', value);
    }, token);

    // Open application
    await page.goto("https://rahulshettyacademy.com/client");

    // Click My Orders
    await page.locator("button[routerlink*='myorders']").click();

    // Wait for orders table
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");

    // Find the created order
    for (let i = 0; i < await rows.count(); i++) {

        const rowOrderId = await rows.nth(i).locator("th").textContent();

        console.log("Order in UI:", rowOrderId);

        if (orderID.includes(rowOrderId.trim())) {

            // Click View button
            await rows.nth(i).locator("button").first().click();

            break;
        }
    }

    // Verify order details page
    const orderIDDetails = await page.locator(".col-text").textContent();

    console.log("Order ID in Details:", orderIDDetails);

    expect(orderIDDetails.trim()).toBe(orderID);

});
