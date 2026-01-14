import { expect, test } from '@playwright/test';


test('calendor handling', async ({page})=>
{
const dummy="123";
const date="26";
const monthNumber="9";
const year="2026";
const expectedList = [dummy,monthNumber,date,year];
await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();
await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber-1)).click();
await page.locator("//abbr[text()='"+date+"']").click();
const inputs=page.locator(".react-date-picker__inputGroup input");

for(let i=1;i<expectedList.length;i++)
{
    const value=await inputs.nth(i).inputValue();
    expect(value).toEqual(expectedList[i]);
}
});