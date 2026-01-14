import { LoginPage } from './LoginPage.js';
import { DashboardPage } from './DashboardPage.js';
import { CartPage } from './CartPage.js';
import { CheckOutPage } from './CheckOutPage.js';
import { VerifyOrderPage } from './VerifyOrderPage.js';
import { OrdersPage } from './OrdersPage.js';
import { OrderViewPage } from './OrderViewPage.js'; 
import { Page } from '@playwright/test';

export class POManager
{
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    checkOutPage: CheckOutPage;
    verifyOrderPage: VerifyOrderPage;
    ordersPage: OrdersPage;
    orderViewPage: OrderViewPage;   
    constructor(page: Page)
    {
        this.page=page; 
        this.loginPage= new LoginPage(this.page);
        this.dashboardPage= new DashboardPage(this.page);
        this.cartPage= new CartPage(this.page);
        this.checkOutPage= new CheckOutPage(this.page);
        this.verifyOrderPage= new VerifyOrderPage(this.page);
        this.ordersPage= new OrdersPage(this.page);
        this.orderViewPage= new OrderViewPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboardPage()
    {
        return this.dashboardPage;
    }   
    getCartPage()
    {
        return this.cartPage;
    }
    getCheckOutPage()
    {
        return this.checkOutPage;
    }
    getVerifyOrderPage()
    {
        return this.verifyOrderPage;
    }
    getOrdersPage()
    {
        return this.ordersPage;
    }
    getOrderViewPage()
    {
        return this.orderViewPage;
    }   
}