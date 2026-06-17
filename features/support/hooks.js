const { Before, context, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");
const { POManager } = require('../../pageobjects/POManager');

Before(async function () {
 this. browser = await chromium.launch({ headless: false }); 
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

AfterStep( async function ({result}) {
   
   if (result.status === Status.FAILED) {
   await  this.page.screenshot({path:'sc.png'});
    
  }
});