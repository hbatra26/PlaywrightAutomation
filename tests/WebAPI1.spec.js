import { expect,test,request} from '@playwright/test';
import { APiUtils } from '../utils/APiUtils/APiUtils.js';

const loginPayLoad = {userEmail:"anshika@gmail.com",userPassword:"pass@123"};
const orderPayLoad = {orders:[{country:"India",productOrderedId:"68a961459320a140fe1ca57a"}]};
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
await page.getByRole("button",{name:"ORDERS"}).click();
await page.locator("tbody ").waitFor();
const rows=page.locator("tbody tr");
for(let i=0;i<await rows.count();i++)
{
const roworderid=await rows.nth(i).locator("th").textContent();
if(response.orderId.includes(roworderid))
{
    await rows.nth(i).locator("button").first().click();
    break;
}

}

const orderIDdetail=await page.locator(".col-text.-main").textContent();
expect(response.orderId.includes(orderIDdetail)).toBeTruthy();



});