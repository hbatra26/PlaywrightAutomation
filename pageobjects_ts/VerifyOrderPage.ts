import { Page,Locator } from '@playwright/test';

export class VerifyOrderPage
{
    page: Page;
    orderConfirmation: Locator;
    orderID: Locator;

    constructor(page: Page)
    {   
        this.page=page;
        this.orderConfirmation=page.getByText(" Thankyou for the order. ");
        this.orderID=page.locator(".em-spacer-1 .ng-star-inserted").first();    

    }
    async verifyOrderSuccess()
    {
        await this.orderConfirmation.waitFor();
        const orderId = await this.orderID.textContent();
        return orderId;
    }
    async navigateToOrders()
    {
        await this.page.getByRole("button",{name:"ORDERS"}).click();
      
    }
}