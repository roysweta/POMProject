//const { Page } = require('@playwright/test');

class LoginPage
 { 
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) 
    {
        this.page=page;
        this.signInButton = page.locator('#login');
        this.userName = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
    }
  
    /**
     * @param {string} username
     * @param {string} password
     */
    async validLogin(username,password)
    {
        await this.userName.fill(username);
       await this.userPassword.fill(password);
       await this.signInButton.click();
       await this.page.waitForLoadState('networkidle', { timeout: 40000, });
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }
    
 } 
module.exports = { LoginPage };
