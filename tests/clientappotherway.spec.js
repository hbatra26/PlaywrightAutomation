import { expect, test } from '@playwright/test';


test('playwright locators e2e ecom', async ({page})=>
{
const email="anshika@gmail.com";
const productname="ZARA COAT 3";
const products=page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client/");
await page.getByPlaceholder("email@example.com").fill(email);
await page.getByPlaceholder("enter your passsword").fill("Pass@123");
await page.getByRole("button",{name: 'login' }).click();
await page.waitForLoadState("networkidle");
await page.locator(".card-body").first().waitFor();
await page.locator(".card-body").filter({hasText:" ZARA COAT 3"}).getByRole("button",{name:" Add To Cart"}).click();
await page.getByRole("listitem").getByRole("button",{name: 'Cart'}).click();
await page.locator("div li").first().waitFor();
await expect(page.getByText("ZARA COAT 3")).toBeVisible();
await page.getByRole("button",{name:"Checkout"}).click();
await page.getByPlaceholder("Select Country").pressSequentially("ind");
await page.getByRole("button",{name:"India"}).nth(1).click();
await page.getByText("PLACE ORDER").click();
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
const orderid= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
await page.getByRole("button",{name:"ORDERS"}).click();
await page.locator("tbody ").waitFor();

const rows=page.locator("tbody tr");

for(let i=0;i<await rows.count();i++)
{
const roworderid=await rows.nth(i).locator("th").textContent();
if(orderid.includes(roworderid))
{
    await rows.nth(i).locator("button").first().click();
    break;
}

}

const orderIDdetail=await page.locator(".col-text.-main").textContent();
expect(orderid.includes(orderIDdetail)).toBeTruthy();

});
