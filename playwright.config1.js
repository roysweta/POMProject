// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { timeLog } from 'console';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = ({
  testDir: './tests',
  timeout: 40000,
  expect: {
    timeout: 50000
  },
  reporter: 'html',
  // reporter: [['html', { open: 'always' }]],

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on', // This helps confirm the report is working
        trace: 'retain-on-failure',
      }
    },
    {
    name: 'safari',
    use: {
    //browserName:'webkit',
    //browserName:'firefox',
    browserName: 'webkit',
    headless: true,
    screenshot: 'on', // This helps confirm the report is working
    trace: 'retain-on-failure',
    ...devices['iPhone 11 Pro Max']
  }
},
]

});
//module.exports = config;
export default config;
