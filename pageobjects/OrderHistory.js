class OrderHistory
{
    /**
     * @param {any} page
     */
    constructor(page)
    {
        this.page=page;
       this.orderIdAssert= page.locator('.col-text');
    }
    async clickOrderButton()
    {
        await this.page.locator('button.btn').nth(1).click();
    }
    /**
     * @param {any} orderId
     */
    async getOrderHistory(orderId)
    {  await this.page.locator("tbody").waitFor();
        //let orderRow=await this.page.locator('tr.ng-star-inserted');
  

  const rowLocator = this.page.locator('tr');
  // ...
   const orderRow=rowLocator
      .filter({ hasText: orderId });


     //await orderRow.getByRole('button', { name: 'View' }).click();// this will also give buttobb
     await orderRow.locator('text=View').click();

  //console.log(`row count:${rowCount}`);
    }
    async checkForOrderId(){
        return this.orderIdAssert;
    }
}
module.exports={ OrderHistory };