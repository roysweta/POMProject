const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");
const { POManager } = require('../../pageobjects/POManager');
let browser;
let context;
let page;
//let dashboardpage;
/**
 * @type {string | RegExp | readonly (string | RegExp)[]}
 */
//let orderId;

/**
 * @type {POManager}
 */
//let pomanager;

Given('a login to web site with {string} and {string}',{ timeout: 30 * 1000 }, async function (username, password) {
//  const product = this.page.locator('.card-body');
  // this.pomanager=new POManager(this.page);
  // const loginpage=this.pomanager.gotoLoginPage();
  //   await loginpage.goTo();
  // await loginpage.validLogin(username,password);
  
       await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
       await this.page.locator('#userEmail').fill(username);;
        await this.page.locator('#userPassword').fill(password);
         await this.page.locator('#login').click();
          await this.page.waitForLoadState('networkidle', { timeout: 40000, });
        await expect(this.page.getByRole('alert', { name: /Incorrect email or password/ })).toBeVisible();
        
 
});

