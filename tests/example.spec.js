// @ts-check
import { test, expect } from '@playwright/test';
import { log, timeLog } from 'node:console';
import { TIMEOUT } from 'node:dns';

test('login test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  const title= await page.title();
  console.log(title);
  //await expect(page).toHaveTitle("Let's Shop");
  const userEmail= page.locator('#userEmail');
  const userPassword= page.locator('#userPassword');

  const login=page.locator('#login');
  await userEmail.fill('katie@email.com');
  await userPassword.fill('Password1');
  await login.click();
  await page.waitForLoadState('networkidle' ,{timeout:40000,}
  );
 //const t=await page.locator('[style*=uppercase]').first().textContent();
 const t =await page.locator('.card-body b').allTextContents();
  await console.log(t);

});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
