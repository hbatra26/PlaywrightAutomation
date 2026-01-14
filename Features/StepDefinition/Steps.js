import { POManager } from "../../PageObjects/POManager.js";
import { Given,When,Then, } from "@cucumber/cucumber";
import {chromium, expect} from "@playwright/test";
 
      Given('the user enters username {string} and password {string}', async function (username, password) {
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const usernameField=this.page.locator("#username");
        const signin=this.page.locator("#signInBtn");
        await usernameField.fill(username);
        await this.page.locator("#password").fill(password);
        await signin.click();
         });
      
         Then('verify error message is displayed', async function () {
           console.log(await this.page.locator("[style*='block']").textContent());  
           await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
         });


Given('the user enters username {string} and password {string} on login page', async function (username, password) {   
   
    const loginPage= this.poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validlogin(username,password);
});

When('the user searches and adds {string} to the cart', async function (productname) {
    const dashboardPage= this.poManager.getDashboardPage(); 
    await dashboardPage.searchProduct(productname);
    await dashboardPage.navigateToCart();

});
Then('verify the product {string} is displayed in the cart', async function (productname) {
    const cartPage= this.poManager.getCartPage();
     await cartPage.verifyProductInCart(productname);
      await cartPage.goToCheckout();
});
When('the user proceeds to checkout and places the order with country {string} and partial name {string}', async function (country,partialName) {
    const checkOutPage= this.poManager.getCheckOutPage();
    await checkOutPage.selectCountry(country,partialName);
      await checkOutPage.placeOrder();
});
Then('verify the order is placed successfully and navigates to orders', async function () {
    const verifyOrderPage= this.poManager.getVerifyOrderPage();
    await verifyOrderPage.verifyOrderSuccess();
     this.orderId=  await verifyOrderPage.verifyOrderSuccess();
    await verifyOrderPage.navigateToOrders();
}   );
When('the user searches for the placed order and view the order details', async function () {
const ordersPage= this.poManager.getOrdersPage();  
await ordersPage.navigateToOrderDetails(this.orderId);
}   );
Then('verify order details are displayed correctly', async function () {
const orderViewPage= this.poManager.getOrderViewPage();
    const orderIDdetail=await orderViewPage.getOrderId();
          expect(this.orderId.includes(orderIDdetail)).toBeTruthy();
});

