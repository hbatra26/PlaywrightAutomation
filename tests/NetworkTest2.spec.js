import { expect,test,request} from '@playwright/test';


test('network request intercept',async ({page})=>{

await page.goto("https://rahulshettyacademy.com/client/");
await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("pass@123");
await page.getByRole("button",{name: 'login' }).click();
await page.locator(".card-body").first().waitFor();
await page.getByRole("button",{name:"ORDERS"}).click();
await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*', 
route => route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'}))
await page.locator("td .btn-primary").first().click();
await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");

});