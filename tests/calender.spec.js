// @ts-check
import { test, expect } from '@playwright/test';
import { log, timeLog } from 'node:console';
import { TIMEOUT } from 'node:dns';

test('@login calener', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
  const month='6';
  const date='1';
  const year='2027';
  await page.locator('button.react-date-picker__calendar-button').click();
  await page.locator('.react-calendar__navigation__label').click();
  await page.locator('.react-calendar__navigation__label').click();
  await page.locator('.react-calendar__tile').getByText(year).click();
// @ts-ignore
await page.locator('.react-calendar__year-view__months__month').nth(Number(month-1)).click();
await page.locator('.react-calendar__month-view__days__day').nth(Number(date)).click();
const datePicker= page.locator('.react-date-picker__inputGroup__input');
const array=[month,date,year];
for(let i =0; i<array.length;i++){
  //await datePicker.first().isVisible();
  const valueToCompare=await datePicker.nth(i).inputValue();
  expect(valueToCompare).toEqual(array[i]);
}
});
