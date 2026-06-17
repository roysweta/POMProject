// @ts-check
import { test, expect } from '@playwright/test';
import { log, timeLog } from 'node:console';
import { TIMEOUT } from 'node:dns';

test.only('ecom login test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  console.log(await page.title());
  //await expect(page).toHaveTitle("Let's Shop");
  await page.getByPlaceholder('email@example.com').fill('katie@email.com');
  await page.getByPlaceholder('enter your passsword').fill('Password1');
  await page.getByRole('button',{name:'login'}).click();
  await page.waitForLoadState('networkidle', { timeout: 40000, }

  );
  const productToCompare = 'ZARA COAT 3';
  await page.locator('.card-body').first().waitFor();
  const product = page.locator('.card-body');
   await product.filter({ hasText:productToCompare}).getByRole('button',{name:' Add To Cart'}).click();
  await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();

  
  await page.locator('div li').first().waitFor();
 
const bool=await page.getByText("ZARA COAT 3").isVisible();
expect(bool).toBeTruthy();
await page.getByRole('button',{name:"Checkout"}).click();
// checkout page

await page.getByRole('textbox').first().fill('4542 1111 9292 2293');
await page.getByRole('textbox').nth(1).fill('293');

await page.getByRole('textbox').nth(2).fill('katie');

await page.getByPlaceholder('Country').pressSequentially('ind',{delay:150});
await page.waitForTimeout(1000);
const dropdown=await page.locator(".ta-results"); await dropdown.waitFor();
await page.getByRole('button',{name:' India'}).nth(1).click();
await page.getByRole('textbox').nth(3).fill('dfwfw');
await page.getByRole('button',{name:'Apply Coupon'}).click();
    await page.getByText("PLACE ORDER").click();
 await expect(page.getByText("Thankyou for the order.")).toBeVisible();


const rawOrderId= await page.locator('label.ng-star-inserted').textContent();
// @ts-ignore
const cleanOrderId = rawOrderId.replaceAll('|', '').trim();
console.log(`Cleaned Order ID: ${cleanOrderId}`);
// console.log(`order id :${orderId}`);
await page.locator('button.btn').nth(1).click();
await page.locator("tbody").waitFor();
const rowLocator = page.locator('tr');
// ...
const orderRow=rowLocator
    .filter({ hasText: cleanOrderId }).getByRole('button',{name:"View"}).click();
    

 await page.pause();
});

// test('ecom order test', async ({ page }) => {
//   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
//   console.log(await page.title());
//   //await expect(page).toHaveTitle("Let's Shop");
//   const userEmail = page.locator('#userEmail');
//   const userPassword = page.locator('#userPassword');
//   const email='katie@email.com';
//   const login = page.locator('#login');

//   await userEmail.fill('katie@email.com');
//   await userPassword.fill('Password1');
//   await login.click();
//   await page.waitForLoadState('networkidle', { timeout: 40000, }

//   );
//   await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
                                
// const rowLocator = page.locator('tr');
// // ...
// const orderRow=rowLocator
//     .filter({ hasText: '6a04be91965c23b43b172a73' });
    

//    //await orderRow.getByRole('button', { name: 'View' }).click();// this will also give buttobb
//    await orderRow.locator('text=View').click();
//   await page.pause();
//console.log(`row count:${rowCount}`);

//await page.pause();
// });
