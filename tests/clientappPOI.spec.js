import { expect, test } from '@playwright/test';
import {POManager} from '../pageObjects/POManager.js';
import data from '../utils/PlaceorderTestData.json' with { type: 'json' };

data.forEach(d=>
{
   test(`E2E using POM with data set ${d.productname}`, async ({page,context})=>
   {
      await context.clearCookies();
      await context.clearPermissions();
                  
const poManager= new POManager(page);
const loginPage= poManager.getLoginPage();
const dashboardPage= poManager.getDashboardPage();
const cartPage= poManager.getCartPage();
const checkOutPage= poManager.getCheckOutPage();
const verifyOrderPage= poManager.getVerifyOrderPage();
const orderViewPage= poManager.getOrderViewPage();
const ordersPage= poManager.getOrdersPage();
      
      await loginPage.goto();
      await loginPage.validlogin(d.username,d.password);
     
      await dashboardPage.searchProduct(d.productname);
      await dashboardPage.navigateToCart();
     
      await cartPage.verifyProductInCart(d.productname);
      await cartPage.goToCheckout();
      
      await checkOutPage.selectCountry(d.country,d.partialName);
      await checkOutPage.placeOrder();
    
      await verifyOrderPage.verifyOrderSuccess();
      const orderId=  await verifyOrderPage.verifyOrderSuccess();
      await verifyOrderPage.navigateToOrders();
    
      await ordersPage.navigateToOrderDetails(orderId);
     
      const orderIDdetail=await orderViewPage.getOrderId();
      expect(orderId.includes(orderIDdetail)).toBeTruthy();

   });
});
