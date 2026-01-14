import { expect, test } from '@playwright/test';


test('client app test', async ({page})=>
{
const email="anshika@gmail.com";
const productname="ZARA COAT 3";
const products=page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client/");
await page.locator("#userEmail").fill(email);
await page.locator("#userPassword").fill("Pass@123");
await page.locator("#login").click();
await page.waitForLoadState("networkidle");
const titles=await page.locator(".card-body b").allTextContents();
console.log(titles);
const count=await products.count();
console.log(count);
for(let i=0;i<count;i++)
{
    if(await products.nth(i).locator("b").textContent()===productname)
    {
        await products.nth(i).locator("text=Add To Cart").click();
        break;
    }
}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool=page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator("input[placeholder*='Country']").pressSequentially("ind");
const dropdown=page.locator(".ta-results");
await dropdown.waitFor();
const optioncount=await dropdown.locator("button").count();

for(let i=0;i<optioncount;i++)
{
    const text=await dropdown.locator("button").nth(i).textContent();
    if(text.trim() == "India")
    {
        await dropdown.locator("button").nth(i).click();
        break;
    }
}


await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.locator(".action__submit").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderid= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderid);
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();
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