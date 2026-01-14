import { expect, test } from '@playwright/test';
import path from 'path';
import Exceljs from 'exceljs';


async function writeExcel(searchtext, replacedText, filepath) {
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filepath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = readExcel(worksheet, searchtext);
    
    if (output.row === 0 || output.column === 0) {
        console.log(`Search text "${searchtext}" not found in the worksheet`);
        return;
    }
    
    const cell = worksheet.getCell(output.row, output.column);
    cell.value = replacedText;
    await workbook.xlsx.writeFile(filepath);
}

function readExcel(worksheet, searchtext) {
    let output = { row: 0, column: 0 };
    
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchtext) {
                output = { row: rowNumber, column: colNumber };
            }
        });
    });
    
    return output;
}

test('upload-download file', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button", { name: 'Download' }).click();
    const download = await downloadPromise;
    await download.saveAs("exceldownloadrsa.xlsx");
    
    await writeExcel("Spring", "Fall", "exceldownloadrsa.xlsx");

    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("exceldownloadrsa.xlsx");    
    await page.waitForTimeout(2000);

});
