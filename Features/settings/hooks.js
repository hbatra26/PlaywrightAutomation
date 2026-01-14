import { Before,After, BeforeStep, AfterStep,Status } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { POManager } from "../../PageObjects/POManager.js";
import path from "node:path";

Before(async function () {
    this.browser= await chromium.launch({ headless: true });
    this.context= await this.browser.newContext();
    this.page= await this.context.newPage();
    this.poManager= new POManager(this.page);
});

After(async function () {
   console.log("After Hook: Closing browser");
   if (this.context) await this.context.close();
   if (this.browser) await this.browser.close();
});

BeforeStep(async function () {
   //console.log("Before Step Hook: Executing before each step");
});

AfterStep(async function ({result}) {
   if (result.status === Status.FAILED) {
        await this.page.screenshot({path:'screenshot1.png',fullPage:true});
     
   }
   //console.log("After Step Hook: Executing after each step");
}); 