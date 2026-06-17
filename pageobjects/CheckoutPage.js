class CheckoutPage {
    /**
     * @param {any} page
     */
    constructor(page) {
        this.page = page;
        this.countrySelector = page.locator('[placeholder*="Country"]')
        this.dropdown = page.locator(".ta-results");
        this.submit=page.locator("[type='submit']");
        this.placeOrder=page.locator('.action__submit');
        this.orderTitle=page.locator('label.ng-star-inserted');
    }
    async fillShippingDetails() {
        const dropdown = this.dropdown;
        //await this.page.locator("[css='1']").click();
        await this.page.locator('div.field input ').first().fill('4542 1111 9292 2293');
        await this.page.locator('div.field input ').nth(1).fill('293');
        await this.page.locator('div.field input ').nth(2).fill('katie');
        await this.countrySelector.pressSequentially('ind', { delay: 150 });
        await this.page.waitForTimeout(1000);
        await dropdown.waitFor();
        const length = await dropdown.locator('button').count();
        for (let i = 0; i < length; i++) {
            if (await dropdown.locator("button").nth(i).textContent() === " India") {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
        await this.page.locator('div.field input ').nth(3).fill('rahulshettycode');
        await this.submit.click();
        await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState('networkidle');
    }
    async checkout() {
        await this.placeOrder.click();
        


        // await expect( page.locator('.user__name label')).toHaveText(email);
        

       
    }
    async orderDetails(){
         const rawText= await this.orderTitle.textContent();
         const orderId = rawText.replace(/\|/g, "").trim();
        //console.log(`order id :${orderId}`);
        return orderId;

    }

}
module.exports={CheckoutPage};