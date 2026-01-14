export class OrdersPage {


    constructor(page) {

        this.page = page;   
        this.orderRows = page.locator("tbody tr");

    }

    async navigateToOrderDetails(orderId) {

        await this.page.locator("tbody ").waitFor();
        const rows = this.orderRows;
        for (let i = 0; i < await rows.count(); i++) {
            const roworderid = await rows.nth(i).locator("th").textContent(); 
            if (orderId.includes(roworderid)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }


        }
    }
}

