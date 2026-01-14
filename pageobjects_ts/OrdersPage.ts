import { Locator, Page } from "@playwright/test";
export class OrdersPage {
    page: Page;
    orderRows: Locator;
    

    constructor(page: Page) {
        this.page = page;   
        this.orderRows = page.locator("tbody tr");

    }

    async navigateToOrderDetails(orderId: string) {

        await this.page.locator("tbody ").waitFor();
        const rows = this.orderRows;
        let roworderid: any;
        for (let i = 0; i < await rows.count(); i++) {
             roworderid = await rows.nth(i).locator("th").textContent(); 
            if (orderId.includes(roworderid)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }


        }
    }
}
