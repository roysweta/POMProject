// @ts-check
import { test, expect } from '@playwright/test';
import { log, timeLog } from 'node:console';
import { TIMEOUT } from 'node:dns';

test('ecom login test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  console.log(await page.title());
  //await expect(page).toHaveTitle("Let's Shop");
  const userEmail = page.locator('#userEmail');
  const userPassword = page.locator('#userPassword');
  const email='katie@email.com';
  const login = page.locator('#login');

  await userEmail.fill('katie@email.com');
  await userPassword.fill('Password1');
  await login.click();
  await page.waitForLoadState('networkidle', { timeout: 40000, }

  );
  const productToCompare = 'ZARA COAT 3';

  await page.locator('.card-body').first().waitFor();
  const product = page.locator('.card-body');
  const count = await product.count();
  const addToCart = page.locator('button.w-10');
  // console.log(`this is count${count}`);
  for (let i = 0; i < count; i++) {
    const productTitle = await product.nth(i).locator('b').textContent();
    //console.log(productTitle);
    if (productTitle === productToCompare) {

      //await product.nth(i).locator('button').last().click();//this also add product
      await product.nth(i).locator('text=" Add To Cart"').click();//this also add product
       break;
    }
   
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator('div li').first().waitFor();
  //method 1
  // if(await page.locator('h3:has-text"ZARA COAT 3"').textContent() ===productToCompare){
  //   console.log(`${productToCompare} is found in cart`);

  // }
  //methdod 2
  const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator('div.subtotal button').click();


// checkout page
//await page.locator("[css='1']").click();
await page.locator('div.field input ').first().fill('4542 1111 9292 2293');
await page.locator('div.field input ').nth(1).fill('293');
await page.locator('div.field input ').nth(2).fill('katie');

//seclecting dropdown

await page.locator('[placeholder*="Country"]').pressSequentially('ind',{delay:150});await page.waitForTimeout(1000);
const dropdown=await page.locator(".ta-results");
await dropdown.waitFor();
const length =await dropdown.locator('button').count();
for (let i=0; i<length; i++){
  if( await dropdown.locator("button").nth(i).textContent()===" India"){
    await dropdown.locator("button").nth(i).click();
    break;
  }
}
await page.locator('div.field input ').nth(3).fill('rahulshettycode');
await page.locator("[type='submit']").click();await page.waitForTimeout(1000);
// await page.waitForLoadState('networkidle');


await expect( page.locator('.user__name label')).toHaveText(email);
await page.locator('.action__submit').click();

const orderId= await page.locator('label.ng-star-inserted').textContent();
console.log(`order id :${orderId}`);
await page.locator('button.btn').nth(1).click();
await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      // @ts-ignore
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   // @ts-ignore
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
// checking order is in order details table

// const orderRow=await page.locator('tr.ng-star-inserted');
// const rowCounter=orderRow.count();// give how many rows are there in order id.
// console.log(rowCounter);


//await page.pause();
});

test('ecom order test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  console.log(await page.title());
  //await expect(page).toHaveTitle("Let's Shop");
  const userEmail = page.locator('#userEmail');
  const userPassword = page.locator('#userPassword');
  const email='katie@email.com';
  const login = page.locator('#login');

  await userEmail.fill('katie@email.com');
  await userPassword.fill('Password1');
  await login.click();
  await page.waitForLoadState('networkidle', { timeout: 40000, }

  );
  await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
//   const orderRow=await page.locator('tr.ng-star-inserted');
// const rowCounter=orderRow.count();// give how many rows are there in order id.
// console.log(`row count:${rowCounter}`);
                                                                                                                                                                
const rowLocator = page.locator('tr');
// ...
const orderRow=rowLocator
    .filter({ hasText: '6a04be91965c23b43b172a73' });
    

   //await orderRow.getByRole('button', { name: 'View' }).click();// this will also give buttobb
   await orderRow.locator('text=View').click();

//console.log(`row count:${rowCount}`);

//await page.pause();
});
