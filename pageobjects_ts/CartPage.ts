import { expect, Locator, Page } from "@playwright/test";
export class CartPage
{
    page: Page;
    cartItems: Locator;
    checkoutButton: Locator;

    constructor(page: Page)
    {
        this.page=page;
        this.cartItems= page.locator("div li");
        this.checkoutButton= page.getByRole("button",{name:"Checkout"});
    }
    async verifyProductInCart(productname: string)
    {
        await this.cartItems.first().waitFor();
        await expect(this.page.getByText(productname)).toBeVisible();
    }
    async goToCheckout()
    {
        await this.checkoutButton.click();
    }
}