export class OrderViewPage {
    constructor(page) {
        this.page = page;
        this.orderIdLocator = page.locator(".col-text.-main");
    }
    async getOrderId() {
        return await this.orderIdLocator.textContent();
    }

    }   
    
