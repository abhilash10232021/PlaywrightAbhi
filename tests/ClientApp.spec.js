const {test,expect}= require('@playwright/test');

test('Client app Login', async({page})=>{
    const productName = 'ZARA COAT 3';
    const productCards = page.locator('.card-body');
    const email= 'abhilashsky10@gmail.com';

await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.locator('#userEmail').fill(email);
await page.locator('#userPassword').fill('Testing@123');
await page.locator('#login').click();
await page.waitForLoadState('networkidle');
await productCards.first().waitFor();
const Titles = await page.locator('.card-body b').allTextContents();
console.log(Titles);
const count = await productCards.count();
for (let i = 0; i < count; ++i) {
    const title = await productCards.nth(i).locator('b').textContent();
    if (title?.trim() === productName) {
        await productCards.nth(i).locator('button:has-text("Add To Cart")').click();
        break;
    }
}
await page.locator('[routerlink*=cart]').click();
await page.locator("div li").first().waitFor();
const bool=await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();

await page
  .locator("[placeholder*='Select Country']")
  .pressSequentially("ind", { delay: 100 });

const dropdown = page.locator(".ta-results");
await dropdown.waitFor();

const optionsCount = await dropdown.locator("button").count();

for (let i = 0; i < optionsCount; ++i) {
  const text = await dropdown.locator("button").nth(i).textContent();

  if (text.trim() === "India") {
    await dropdown.locator("button").nth(i).click();
    

  }
}


// Fixed: Locator is passed inside expect(), followed by the .toHaveText matcher
await expect(page.locator(".user__name.mt-5 [type='text']")).first().toHaveText(email);

await page.locator(".btnn.action__submit.ng-star-inserted").click();
await page.locator(".hero-primary").toHaveText(" Thankyou for the order. ");
const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderID);

await page.locator("button[routerlink*=myorders] ").click();
await page.locator("tbody").waitFor();
const rows=await page.locator("tbody tr");

for(let i=0;i<rows.count();++i)
{
  const rowOrderID = await rows.nth(i).locator("th").textContent();
  if(orderID.includes(rowOrderID))
  {
    await rows.nth(i).locator("button").first().click();
    break;

  }

}








});

//demo
