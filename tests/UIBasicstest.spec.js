const {test,expect} = require('@playwright/test');



//test('First playwright test',async ()=>
//{
//playwright code

//});

/*test.only('Browser Context playwright test',async({browser})=>
{
    //chrome - plugins/Cookies
    const context=await browser.newContext(); 
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect credentials");

    
});*/

/*test.only('Browser Context playwright test',async({browser})=>
{
    //chrome - plugins/Cookies
    const context=await browser.newContext(); 
    const page=await context.newPage();
    const userName=page.locator("#username");
    const signIN=page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning");
    await signIN.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    
    
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK2");

    
    await signIN.click();
    console.log(await page.locator(".card-body a").nth(1).textContent());
    
    
    //type - fill - to clear the text box and type the new value
    
});

test('Page playwright test',async ({page})=>
{
    
    await page.goto("https://google.com/");
    // get title - assertion
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");
});

*/

test('Browser Context playwright test',async({browser})=>
{
    //chrome - plugins/Cookies
    const context=await browser.newContext(); 
    const page=await context.newPage();
    const userName=page.locator("#username");
    const signIN=page.locator("#signInBtn");
    const cardTitles=page.locator(".card-body a")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning");
    await signIN.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    
    
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK2");

    
    await signIN.click();
    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.nth(1).textContent());
     const allTitles =await cardTitles.allTextContents();
     console.log(allTitles);
    
    
    //type - fill - to clear the text box and type the new value
    
});