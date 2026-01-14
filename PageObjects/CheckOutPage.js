export class CheckOutPage
{

    constructor(page)
    {
        this.page=page;
        this.countryInput= page.getByPlaceholder("Select Country");
        this.placeOrderButton= page.getByText("PLACE ORDER");
    }
    async selectCountry(country,partialName)
    {
        await this.countryInput.pressSequentially(partialName);
        await this.page.getByRole("button",{name:country}).nth(1).click();
    }
    async placeOrder()
    {
        await this.placeOrderButton.click();
    }
}
