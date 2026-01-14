import { Locator, Page } from "@playwright/test";

export class CheckOutPage
{
    page: Page;
    countryInput: Locator;      
    placeOrderButton: Locator;

    constructor(page: Page)
    {
        this.page=page;
        this.countryInput= page.getByPlaceholder("Select Country");
        this.placeOrderButton= page.getByText("PLACE ORDER");
    }
    async selectCountry(country: string, partialName: string)
    {
        await this.countryInput.pressSequentially(partialName);
        await this.page.getByRole("button",{name:country}).nth(1).click();
    }
    async placeOrder()
    {
        await this.placeOrderButton.click();
    }
}