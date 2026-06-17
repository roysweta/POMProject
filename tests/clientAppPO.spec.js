// @ts-check
//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
const { customtest } = require('../TestData/clientAppPO_customtest');
const { POManager } = require('../pageobjects/POManager');
const testData=require('../TestData/clientAppPO_testData.json');
for (const data of testData){
test(`ecom order test for ${data.productToCompare} `, async ({ page }) => {
  
  const product = page.locator('.card-body');
  const pomanager=new POManager(page);
  const loginpage=pomanager.gotoLoginPage();
  // = new LoginPage(page);
  await loginpage.goTo();
  await loginpage.validLogin(data.username, data.password);

  const dashboardpage=pomanager.gotoDashboardPage();
  await dashboardpage.searchProductAddToCart(data.productToCompare);
  await dashboardpage.navigateToCart();

  const minicart=pomanager.gotoMiniCartCheck();
  const bool=await minicart.verifyMiniCart(data.productToCompare);
   expect(bool).toBeTruthy();
  await minicart.checkoutFromMiniCart();

 const checkoutpage=pomanager.gotoCheckoutPage();
  await checkoutpage.fillShippingDetails();
  await checkoutpage.checkout();
  const orderId=await checkoutpage.orderDetails();
  console.log(`order id :${orderId}`);

  const orderhistory=pomanager.gotoOrderHistory();
  await orderhistory.clickOrderButton();
 await orderhistory.getOrderHistory(orderId);
const detailsElement = await orderhistory.checkForOrderId();
await expect(detailsElement).toContainText(orderId);

});
}

// @ts-ignore
customtest(`ecom login `, async ({ page,testForLogin }) => {
  const product = page.locator('.card-body');
  const pomanager=new POManager(page);
  const loginpage=pomanager.gotoLoginPage();
  // = new LoginPage(page);
  await loginpage.goTo();
  await loginpage.validLogin(testForLogin.username, testForLogin.password);

});