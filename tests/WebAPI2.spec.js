import { expect,test,request} from '@playwright/test';
let webContext;

test.beforeAll(async({browser}) => {

const context=await browser.newContext();
const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/client/");
await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("pass@123");
await page.getByRole("button",{name: 'login' }).click();
await page.locator(".card-body").first().waitFor(); 
await context.storageState({path: 'state.json'});
webContext= await browser.newContext({storageState: 'state.json'});


});


test('place the order using logged in session ', async ()=>
{
    
const page1=await webContext.newPage();
await page1.goto("https://rahulshettyacademy.com/client/");
await page1.locator(".card-body").filter({hasText:" ZARA COAT 3"}).getByRole("button",{name:" Add To Cart"}).click();
await page1.getByRole("listitem").getByRole("button",{name: 'Cart'}).click();
await page1.locator("div li").first().waitFor();
await expect(page1.getByText("ZARA COAT 3")).toBeVisible();
await page1.getByRole("button",{name:"Checkout"}).click();
await page1.getByPlaceholder("Select Country").pressSequentially("ind");
await page1.getByRole("button",{name:"India"}).nth(1).click();
await page1.getByText("PLACE ORDER").click();
await expect(page1.getByText(" Thankyou for the order. ")).toBeVisible();
const orderid= await page1.locator(".em-spacer-1 .ng-star-inserted").textContent();
await page1.getByRole("button",{name:"ORDERS"}).click();
await page1.locator("tbody ").waitFor();
const rows=page1.locator("tbody tr");
for(let i=0;i<await rows.count();i++)
{
const roworderid=await rows.nth(i).locator("th").textContent();
if(orderid.includes(roworderid))
{
    await rows.nth(i).locator("button").first().click();
    break;
}

}

const orderIDdetail=await page1.locator(".col-text.-main").textContent();
expect(orderid.includes(orderIDdetail)).toBeTruthy();



});