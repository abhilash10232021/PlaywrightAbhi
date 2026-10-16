const {test,expect}= require('@playwright/test');
//30 seconds - test timeout error
test('Client app other', async({page})=>{
    test.setTimeout(6000);
    page.setDefaultTimeout(10000);
    const slowExpect=expect.configure({timeout:9000});
    //test level timeout expect assesrtions. 
    const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");

await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.getByPlaceholder("email@example.com").fill("abhilashsky10@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("Testing@123");
await page.getByRole("button",{name:'login'}).click();
await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();

await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:' Add To Cart'}).click();
await page.getByRole("listitem").getByRole("button",{name:"cart"}).click();
await page.locator("div li").first().waitFor();
await slowExpect(page.getByText("ZARA COAT 3")).toBeVisible();

await page.getByRole("button",{name:'Checkout'}).click({timeout:15000});// step level action time out
await page.getByPlaceholder("Select Country").pressSequentially("ind");
await page.getByRole("button",{name:"India"}).nth(1).click();
await page.getByText('PLACE ORDER').click();
//5 seconds default timeout for expect assertions -{timeout:10000}- step level

await expect(page.getByText(" Thankyou for the order. ")).toBeVisible({timeout:10_000});

});
