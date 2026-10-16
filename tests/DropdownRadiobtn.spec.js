const {test,expect} = require('@playwright/test');
    test('UI Controls',async ({page})=>{

    //chrome - plugins/Cookies
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName=page.locator("#username");
    const signIN=page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");// select dropdown by value
    await page.locator(".radiotextsty").last().click();//select radio button
    await page.locator("#okayBtn").click();//select ok button in popup
    
    console.log(await page.locator(".radiotextsty").last().isChecked());//print true if selected
    await expect(page.locator(".radiotextsty").last()).toBeChecked(); 
      //assertion to check if radio button is selected
      await page.locator("#terms").click();//select checkbox
      await page.screenshot({path:"screenshot.png"});//take screenshot
      await expect(page.locator("#terms")).toBeChecked();//assertion to check if checkbox is selected
      await page.locator("#terms").uncheck();//uncheck the checkbox
       expect(await page.locator("#terms").isChecked()).toBeFalsy();
    
    
       await expect(documentLink).toHaveAttribute("class","blinkingText");//assertion to check if link has class attribute blinkingText


    //await page.pause();
    


    
    
    
   
    
    
    //type - fill - to clear the text box and type the new value
});

test('visual testing',async({page})=>
{
 await page.goto("https://www.google.com/");
 const screenshot = await page.screenshot();
 await expect(screenshot).toMatchSnapshot("landing.png");//compare the screenshot with the existing screenshot in the snapshot folder


})