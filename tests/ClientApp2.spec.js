
const { test, expect } = require('@playwright/test');

test('Client app Login', async ({ page }) => {

    const productName = 'ZARA COAT 3';
    const productCards = page.locator('.card-body');
    const email = 'abhilashsky10@gmail.com';

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Testing@123');
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');

    // Wait for products to load
    await productCards.first().waitFor();

    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    // Find product and add to cart
    const count = await productCards.count();

    for (let i = 0; i < count; i++) {

        const title = await productCards.nth(i).locator('b').textContent();

        if (title?.trim() === productName) {
            await productCards
                .nth(i)
                .locator('button:has-text("Add To Cart")')
                .click();

            break;
        }
    }

    // Go to cart
    await page.locator('[routerlink*="cart"]').click();

    await page.locator('div li').first().waitFor();

    // Verify product in cart
    await expect(
        page.locator('h3', { hasText: 'ZARA COAT 3' })
    ).toBeVisible();

    // Checkout
    await page.getByText('Checkout', { exact: true }).click();

    // Select country
    await page
        .locator("[placeholder*='Select Country']")
        .pressSequentially('ind', { delay: 100 });

    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator('button').count();

    for (let i = 0; i < optionsCount; i++) {

        const text = await dropdown
            .locator('button')
            .nth(i)
            .textContent();

        if (text?.trim() === 'India') {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    // Verify email
    await expect(
        page.locator(".user__name.mt-5 [type='text']").first()
    ).toHaveValue(email);

    // Place order
    await page.locator('.btnn.action__submit.ng-star-inserted').click();

    await expect(page.locator('.hero-primary'))
        .toHaveText(' Thankyou for the order. ');

    // Capture order ID
    const orderID = await page
        .locator('.em-spacer-1 .ng-star-inserted')
        .textContent();

    console.log('Order ID:', orderID);

    // Go to My Orders
    await page.locator('button[routerlink*="myorders"]').click();

    await page.locator('tbody').waitFor();

    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();

    // Find order and view it
    for (let i = 0; i < rowCount; i++) {

        const rowOrderID = await rows
            .nth(i)
            .locator('th')
            .textContent();

        if (orderID?.includes(rowOrderID?.trim())) {
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
});
