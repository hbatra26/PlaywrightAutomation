import { expect, test } from '@playwright/test';

test('popup validations and iframes', async ({page})=>
{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible();
page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
page.on('dialog',dailog => dailog.accept());
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();
const framespage=page.frameLocator("#courses-iframe");
framespage.locator(".hidden a[href='/all-access-subscription']").click();



});