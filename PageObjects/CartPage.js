import { expect } from "@playwright/test";
export class CartPage
{

    constructor(page)
    {
        this.page=page;
        this.cartItems= page.locator("div li");
        this.checkoutButton= page.getByRole("button",{name:"Checkout"});
    }
    async verifyProductInCart(productname)
    {
        await this.cartItems.first().waitFor();
        const itemsText = await this.cartItems.allTextContents();
        console.log('Cart items:', itemsText);
        await expect(this.page.getByText(productname, { exact: false })).toBeVisible();
    }
    async goToCheckout()
    {
        await this.checkoutButton.click();
    }
}
