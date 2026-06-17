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
       const loginToken = loginResponseJson.token;
        return loginToken;
    }
    async createOrder(orderPayLoad){
        let response={};
        response.loginToken=await this.getToken();
        const orderResponse = await this.apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayLoad,
      headers: {
        'authorization': response.loginToken,
        'content-type': 'application/json'
      }
    }
  )

  const orderResponseJson = await orderResponse.json();
  const orderId = orderResponseJson.orders[0];
  response.orderId=orderId;
  return response;
    }


}module.exports = { ApiUtils };