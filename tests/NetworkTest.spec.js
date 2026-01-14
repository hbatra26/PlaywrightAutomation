import { expect,test,request} from '@playwright/test';
import { APiUtils } from '../utils/APiUtils/APiUtils.js';

const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"pass@123"};
const orderPayLoad = {orders:[{country:"India",productOrderedId:"68a961459320a140fe1ca57a"}]};
const fakePayLoadOrders={data:[],message: "No Orders"};

let response;

test.beforeAll(async() => {
  
   const apiContext = await request.newContext();
   const apiutils = new APiUtils(apiContext,loginPayLoad);
   response = await apiutils.createOrder(orderPayLoad);
 
});

test('place the order', async ({page})=>
{

page.addInitScript(value =>
{
window.localStorage.setItem('token',value);
    
}, response.token);
await page.goto("https://rahulshettyacademy.com/client/");
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
  const response=await page.request.fetch(route.request());
  let body= JSON.stringify(fakePayLoadOrders);
  route.fulfill({
   response,
   body,
    });
});

await page.getByRole("button",{name:"ORDERS"}).click();
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
console.log(await page.locator(".mt-4").textContent());
});