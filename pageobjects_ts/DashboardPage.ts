import { Locator, Page } from "@playwright/test";

export class DashboardPage
{
    page: Page;
    products: Locator;
    cartButton: Locator;

    constructor(page: Page)          
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cartButton =  page.getByRole("listitem").getByRole("button",{name: 'Cart'});
    }

    async searchProduct(productname: string)
    {    await this.page.waitForLoadState("domcontentloaded");
         await this.products.first().waitFor();
        await this.products.filter({ hasText: productname }).getByRole("button", { name: " Add To Cart" }).click();
        await this.page.waitForLoadState("domcontentloaded");
       
    }

    async navigateToCart()
    {
        await this.cartButton.waitFor({ state: 'visible' });
        await this.cartButton.scrollIntoViewIfNeeded();
        await this.cartButton.click({ timeout: 15000 });
    }
}