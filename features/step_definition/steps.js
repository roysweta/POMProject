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
Given('a login to ecommerce site with {string} and {string}',{ timeout: 30 * 1000 }, async function (username, password) {
  //   browser = await chromium.launch({ headless: false }); 
  // context = await browser.newContext();
  // page = await context.newPage();
// @ts-ignore
const product = this.page.locator('.card-body');
  this.pomanager=new POManager(this.page);
  const loginpage=this.pomanager.gotoLoginPage();
    await loginpage.goTo();
  await loginpage.validLogin(username,password);
 
});

When('Add product namely {string} to the cart', async function (productToCompare) {
 this.dashboardpage=this.pomanager.gotoDashboardPage();
  await this.dashboardpage.searchProductAddToCart(productToCompare);
  await this.dashboardpage.navigateToCart();

});

Then('Verify {string} is displayed in the cart', async function (productToCompare) {
  const minicart=this.pomanager.gotoMiniCartCheck();
    const bool=await minicart.verifyMiniCart(productToCompare);
     expect(bool).toBeTruthy();
    await minicart.checkoutFromMiniCart();
});

When('enter valid details and place order',{ timeout: 30 * 1000 }, async function () {
  const checkoutpage=this.pomanager.gotoCheckoutPage();
  await checkoutpage.fillShippingDetails();
  await checkoutpage.checkout();
   this.orderId=await checkoutpage.orderDetails();
  console.log(`order id :${this.orderId}`);
});

Then('verify order is present in order history', async function () {
     //const orderId=await checkoutpage.orderDetails();
 const orderhistory=this.pomanager.gotoOrderHistory();
  await orderhistory.clickOrderButton();
 await orderhistory.getOrderHistory(this.orderId);
const detailsElement = await orderhistory.checkForOrderId();
await expect(detailsElement).toContainText(this.orderId);
});

