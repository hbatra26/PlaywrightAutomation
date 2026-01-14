import { Locator, Page } from '@playwright/test';

export class OrderViewPage {
    page: Page;
    orderIdLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderIdLocator = page.locator(".col-text.-main");
    }
    async getOrderId() {
        return await this.orderIdLocator.textContent();
    }
}