// @ts-check
import { test, expect } from '@playwright/test';
import { assert, log, timeLog } from 'node:console';
import { TIMEOUT } from 'node:dns';

test('login test', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  const eventTitle = 'sports day-1';
  const email = 'katie@email.com';
  const passsword = 'Password@1';
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByPlaceholder("••••••").fill(passsword);
  await page.locator('#login-btn').click();
  await expect(page.getByText('Browse Events →')).toBeVisible();
  await page.getByRole('button', { name: 'Admin' }).click();
  await page.locator('div.absolute a').first().click();
  const uniqueEventTitle = `Test Event ${Date.now()}`;
  await page.locator('#event-title-input').fill(eventTitle);
  await page.locator('#admin-event-form textarea').fill('sports day ddescription');
  await page.locator('#admin-event-form textarea').fill('sports day ddescription');
  await page.locator('select#category').click();
  const dropdown = page.locator('select#category');
  dropdown.selectOption('Sports');
  await page.locator('#city').fill('lucknow');
  await page.locator('#venue').fill('park street');
  await page.locator('input[id="event-date-&-time"]').fill('2027-09-01T14:30');
  await page.getByLabel('Price ($)').fill('1190');
  await page.getByLabel('Total Seats').fill('100');
  await page.locator("[type='submit']").click();
  await page.locator("div.hidden a[href='/events']").click();
  // 
  //---------------------------------------------------------------

  //-- await page.goto('https://eventhub.rahulshettyacademy.com/events');
  //--await page.goto('https://eventhub.rahulshettyacademy.com/bookings');
  await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible();
  const eventSelected = page.locator('[data-testid="event-card"]');
  const counter = await eventSelected.count();
  //console.log(counter);
  let seatsBeforeBooking = 0;
  for (let i = 0; i < counter; i++) {
    const title = await eventSelected.locator('h3').nth(i).textContent();

    if (title === eventTitle) {//console.log(title);
      const seats = await eventSelected.nth(i).locator(' div.p-4 div.justify-between span.text-xs').textContent();
      //console.log(`seat after booking:${seatsAfterBooking}`);

      // @ts-ignore
      const part = seats.split(" ");
      seatsBeforeBooking = parseInt(part[0]);
      console.log(`seat before booking:${seatsBeforeBooking}`);

      await eventSelected.nth(i).locator('#book-now-btn').click(); break;
    }

  }
  page.locator('#ticket-count').waitFor({ timeout: 5000 });
  await expect(page.locator('#ticket-count')).toBeVisible();
  await page.getByPlaceholder('Your full name').fill('Katie holmes');
  await page.getByPlaceholder('you@email.com').fill(email);
  await page.getByPlaceholder('+91 98765 43210').fill('1111111111');
  await page.locator(' .confirm-booking-btn').click();
  const booking = await page.locator('span.booking-ref').textContent();
  await expect(page.locator('span.booking-ref')).toBeVisible();
  // @ts-ignore
  const bookingRefId = booking.trim();
  console.log(`booking ref id:${bookingRefId}`);
  await page.locator("[data-testid='nav-bookings']").click();
  await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');
  expect(page.locator(".space-y-4 [id='booking-card']").first()).toBeVisible();
  await expect(page.locator('.space-y-4').filter({ hasText: bookingRefId })).toBeVisible();
  await expect(page.locator('.space-y-4').filter({ hasText: eventTitle })).toBeVisible();
  //step8
  await page.locator("div.hidden a[href='/events']").click();
  await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible();
  //const w=await page.locator('[data-testid="event-card"]');
  await expect(eventSelected.filter({ hasText: eventTitle })).toBeVisible();
  const updatedCounter = await eventSelected.count();
  let seatsAfterBooking = 0;
  await page.waitForTimeout(5000);
  for (let i = 0; i < updatedCounter; i++) {
    const title = await eventSelected.locator('h3').nth(i).textContent();

    if (title === eventTitle) {//console.log(title);
      eventSelected.locator('h3').nth(i).waitFor({ timeout: 5000 });
      const seats = await eventSelected.nth(i).locator(' div.p-4 div.justify-between span.text-xs').textContent(); //console.log(seats);
      // @ts-ignorea
      const part = seats.split(" ");
      seatsAfterBooking = parseInt(part[0]);
      console.log(`seat after booking:${seatsAfterBooking}`);
      //await eventSelected.nth(i).locator('#book-now-btn').click();
      break;
    }
  } await page.waitForTimeout(1000);
  expect(seatsAfterBooking === (seatsBeforeBooking - 1)).toBeTruthy();

});
