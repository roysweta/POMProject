class ApiUtils {

    constructor(apiContext,loginPayload){
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }

   async getToken() {

        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login  ",
            { data: this.loginPayload }
        );
        const loginResponseJson = await loginResponse.json();
        //this.loginToken = loginResponseJson.token;
        loginToken = loginResponseJson.token;
         return loginToken;
       // return this.loginToken;
    }
    async createOrder(orderPayLoad){
        const orderResponse = await this.apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: this.orderPayLoad,
      headers: {
        'authorization': this.getToken(),
        'content-type': 'application/json'
      }
    }
  )

  const orderResponseJson = await orderResponse.json();
  orderId = orderResponseJson.orders[0];
  return orderId;
    }


}module.exports = { ApiUtils };