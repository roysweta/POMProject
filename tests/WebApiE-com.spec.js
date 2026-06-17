// @ts-check
import { test, expect, request } from '@playwright/test';
const {ApiUtils} = require('./utils/ApiUtils');
import { log, timeLog } from 'node:console';
import { TIMEOUT } from 'node:dns';
import { parse } from 'node:querystring';
const loginPayload = {
  userEmail: "katie@email.com",
  userPassword: "Password1"
};
/**
 * @type {any}
 */
//let orderId;
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };

/**
 * @type {any}
 */
let response;
/**
 * @type {import("playwright-core").APIRequestContext}
 */
let apiContext;
test.beforeAll(async () => {

   apiContext = await request.newContext();
  const apiUtils=new ApiUtils(apiContext,loginPayload);
 response=await apiUtils.createOrder(orderPayLoad);
});
//order api

test('place order', async ({ page }) => {
  //bringin in the token in the script
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);

  }, response.loginToken);
   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.waitForLoadState('networkidle', { timeout: 40000, });
  await page.locator('button.btn').nth(1).click();
  await page.locator("tbody").waitFor();
  const rowLocator = page.locator('tr');
  await rowLocator.filter({ hasText: response.orderId }).getByRole('button', { name: "View" }).click();
  });

