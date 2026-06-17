class DashboardPage {
    /**
     * @param {any} page
     */
    constructor(page) {
        this.page = page;
        this.product = page.locator('.card-body');
        this.productText = page.locator(".card-body b");
        this.minicart = page.locator("[routerlink*='cart']");
    }

    /**
    
     * @param {any} productToCompare
     */
    async searchProductAddToCart( productToCompare)
     {  
        
       // const product = this.page.locator('.card-body');
       const product=this.product;
       await product.first().waitFor();

        const count = await product.count();
       // const addToCart = this.page.locator('button.w-10');
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
    }
    async navigateToCart()
    {
       await this.minicart.click();
    }
}
module.exports = { DashboardPage };