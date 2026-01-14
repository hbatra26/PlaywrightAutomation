import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });
test('@Web browser Playwright test', async ({browser,page})=>
{
const context= browser.newContext();
await page.goto("https://www.google.com");

});

test('@Web page  Playwright test', async ({page})=>
{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const username=page.locator("#username");
const signin=page.locator("#signInBtn");
const pagetitles=page.locator(".card-body a");
await username.fill("rahulshetty");
await page.locator("#password").fill("learning");
await signin.click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText("Incorrect");
await username.fill("");
await username.fill("rahulshettyacademy");
await signin.click();
console.log(await pagetitles.nth(0).textContent());
const alltitles=await pagetitles.allTextContents();
console.log(alltitles)

});

test('ui controls rsa', async ({page})=>
{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const username=page.locator("#username");
const signin=page.locator("#signInBtn");
const dropdown=page.locator("select[class='form-control']");
await username.fill("rahulshetty");
await page.locator("#password").fill("learning");
dropdown.selectOption("consult");
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click();
await expect (page.locator("#terms")).toBeChecked();
await expect(page.locator(".blinkingText")).toHaveAttribute('class','blinkingText');
//await page.pause();
await signin.click();



});

test('child window handle', async ({browser})=>
{
const context= await browser.newContext();
const page= await context.newPage();
page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const doclink=page.locator(".blinkingText");
const [newPage]=await Promise.all([

context.waitForEvent('page'),
doclink.click()])

const text=await newPage.locator(".im-para.red").textContent();
const arraytext=text.split("@");
const domain=arraytext[1].split(" ")[0];
await page.locator("#username").fill(domain);
console.log(await page.locator("#username").inputValue());
});