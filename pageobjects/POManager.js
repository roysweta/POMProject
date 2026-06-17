const { LoginPage } = require('../pageobjects/LoginPage');
const { DashboardPage}=require('../pageobjects/DashboardPage');
const { MiniCartCheck }=require('../pageobjects/MiniCartCheck');
const {CheckoutPage}=require('../pageobjects/CheckoutPage');
const {OrderHistory}=require('../pageobjects/OrderHistory');
class POManager{
    /**
     * @param {any} page
     */
    constructor(page){
        this.page=page;
          this.loginpage = new LoginPage(this.page);
        this.dashboardpage=new DashboardPage(this.page);
          this.minicart=new MiniCartCheck(this.page);
            this.checkoutpage=new CheckoutPage(this.page);
           this.orderhistory=new OrderHistory(this.page);

    }
    gotoLoginPage(){
        return this.loginpage;
    }
    gotoDashboardPage(){
        return this.dashboardpage;
    }
    gotoMiniCartCheck(){
        return this.minicart;
    }
    gotoCheckoutPage(){
        return this.checkoutpage;
    }
    gotoOrderHistory(){
        return this.orderhistory;
    }


}
module.exports={POManager}