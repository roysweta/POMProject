// @ts-check
import { test, expect, request } from '@playwright/test';
//const {ApiUtils} = require('./utils/ApiUtils');
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
let orderId;
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };

/**
 * @type {any}
 */
let loginToken;
test.beforeAll(async () => {
  //we are creating a response context. then using that we are using a post method{because login url was post} passing the login url and the json obj data(login details). then verifying if the login was success by using the reponse code(200 ok)
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login  ",
    { data: loginPayload }
  );
  expect(loginResponse.ok()).toBeTruthy();
  //now we have to grab the json reposnse against the login request and then from that json response we need to grab the token variable(token is required so that login session can be used)
  const loginResponseJson = await loginResponse.json();
  //now u need to parse loginResponseJson and extract token from this.since token is part of loginResonseJSon onject therefore u can get token as below
  loginToken = loginResponseJson.token;

  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayLoad,
      headers: {
        'authorization': loginToken,
        'content-type': 'application/json'
      }
    }
  )

  const orderResponseJson = await orderResponse.json();
  orderId = orderResponseJson.orders[0];
});
//order api

test('place order', async ({ page }) => {

  //const apiUtils=new ApiUtils(apiContext);

  //bringin in the token in the script
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);

  }, loginToken);
 
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  //await page.waitForTimeout(1000);
  await page.waitForLoadState('networkidle', { timeout: 40000, });
  await page.locator('button.btn').nth(1).click();
  await page.locator("tbody").waitFor();
  const rowLocator = page.locator('tr');
  const orderRow = rowLocator
    .filter({ hasText: orderId }).getByRole('button', { name: "View" }).click();
});

