
// @ts-check
const { test, expect } = require('@playwright/test');// we are importing test ,expect assertions here
//const { assert } = require('node:console');
test('first playwright page test', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
    console.log(await page.title());



});
test.only ('first playwright browser test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const loginErrorMsg = page.locator("[style*='block']");
    const userName = page.locator('[name="username"]');
    const password = page.locator('#password')
    const radio = page.locator('.radiotextsty');
    const dropdown = page.locator('select.form-control');
    const documentLink = page.locator("[href*='documents-request']");

    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");

    await radio.last().click();
    await page.locator('#okayBtn').click();
    await radio.last().waitFor();

    await expect(radio.last()).toBeChecked();

    await dropdown.selectOption('Teacher');
   await page.locator('#terms').check();


    await page.locator('#signInBtn').click();
    //console.log(loginErrorMsg.textContent());
    //await expect(loginErrorMsg).toContainText('Incorrect');
   // await page.pause();



});

test('child window', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage]=await Promise.all([
        context.waitForEvent('page'),
       documentLink.click(),
        
    ]);
    const text =await newPage.locator(".red").textContent();
    console.log(text);

});