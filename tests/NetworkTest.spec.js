const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('./utils/APiUtils');

const loginPayLoad = { userEmail: 'abhilashsky10@gmail.com', userPassword: 'Testing@123' };
const orderPayLoad = {
  orders: [{ country: 'Cuba', productOrderedId: '6960eac0c941646b7a8b3e68' }],
};
const fakePayLoadOrders = { data: [], message: 'No Orders' };

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  try {
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
    expect(response.token).toBeTruthy();
    expect(response.orderId).toBeTruthy();
  } finally {
    await apiContext.dispose();
  }
});

test('@SP Place the order', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async (route) => {
      const apiResponse = await page.request.fetch(route.request());
      await route.fulfill({
        response: apiResponse,
        body: JSON.stringify(fakePayLoadOrders),
      });
    },
  );
//page.request - page turn to API mode and  fetch the response of this route.request() - fetched response stored in varibale - real response.
//route.fulfill - send response back to browser .
////intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end

  await page.goto('https://rahulshettyacademy.com/client');
  const ordersResponsePromise = page.waitForResponse((ordersResponse) =>
    ordersResponse.url().includes('/api/ecom/order/get-orders-for-customer/'),
  );
  await page.locator("button[routerlink*='myorders']").click();

  const ordersResponse = await ordersResponsePromise;
  expect(ordersResponse.ok()).toBeTruthy();
  console.log(await page.locator(".mt-4").textContent());
});
