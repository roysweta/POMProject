import { test, expect } from '@playwright/test';
const ExcelJs = require('exceljs');
const workbook = new ExcelJs.Workbook();



//creating obj of workbook class that is present in exceljs library
async function writeExcel(word,replaceWord,FilePath,updatedPrice) {
    // let output= {row:-1, col:-1};
    await workbook.xlsx.readFile(FilePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    
   let output1= await readExcel(worksheet,word);
     const cell=worksheet.getCell(output1.row,output1.col);
    cell.value=replaceWord;
    const priceCell= worksheet.getCell(output1.row,output1.col+2);
    priceCell.value=updatedPrice;
    await workbook.xlsx.writeFile(FilePath);
}

    async function readExcel(worksheet,word) {
            let output= {row:-1, col:-1};

        worksheet.eachRow((row, rowNumber) => {
            //row,colum helps to iterate them rowNumber, columnNumber keeps track of the no of row,col its iterating
        row.eachCell((cell, columnNumber) => {
            let cellValue = cell.value;
            if(cellValue===word)
            {output.row=rowNumber;
             output.col=columnNumber;   
             
            }
        })
    })
        return output;

    }
   

//writeExcel('Kivi','Iphone,','C:/Users/neelu/Downloads/excelPlay.xlsx');
test('import export validation',async({ page} )=> {
      const textSearch = 'Kivi';
  const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/"); 
    const downloadPromise= page.waitForEvent("download");
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
const download = await downloadPromise;
const filePath = 'C:/Users/neelu/Downloads/download.xlsx';
await download.saveAs(filePath);
    await writeExcel(textSearch,'Iphone',filePath,updateValue);
    await page.locator("#fileinput").click();
     await page.locator("#fileinput").setInputFiles(filePath);
     const desiredRow = await page.getByRole('row').filter({ has: page.getByText('Iphone') });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);




})