//import { expect } from '@playwright/test';
//const { test } = require('@playwright/test');
class MiniCartCheck {

    /**
     * @param {any} page
     */
    constructor(page) {
        this.page = page;
        //this.minicart = page.locator("[routerlink*='cart']");
        //this.productCheck = page.locator("h3:has-text('ZARA COAT 3')");
        this.subtotalButton = page.locator('div.subtotal button');

    }

    /**
     * @param {string} productName
     */
    async verifyMiniCart(productName) {
        await this.page.locator('div li').first().waitFor();
        const productCheck = this.page.locator(`h3:has-text('${productName}')`);
        //await this.productCheck.waitFor({ state: 'visible' });
        return await productCheck.isVisible();
    }
       async checkoutFromMiniCart(){
         await this.subtotalButton.waitFor({ state: 'visible' });
        await this.subtotalButton.click();
     
        //await this.page.pause();
    }
}
module.exports={ MiniCartCheck};

