// const ExcelJs=require('exceljs');
// const workbook=new ExcelJs.Workbook();//creating obj of workbook class that is present in exceljs library
// workbook.xlsx.readFile('C:/Users/neelu/Downloads/excelPlay.xlsx').then (function(){
// const worksheet= workbook.getWorksheet('Sheet1');
// worksheet.eachRow((row,rowNumber)=>{
//     row.eachCell((cell,columnNumber)=>{
//         let cellValue=cell.value;
//         console.log(cellValue);


//     })

// })

// })

//----------------Method 2 to print data of the excel sheet
// const ExcelJs = require('exceljs');
// const workbook = new ExcelJs.Workbook();//creating obj of workbook class that is present in exceljs library
// async function exceleg() {
//     await workbook.xlsx.readFile('C:/Users/neelu/Downloads/excelPlay.xlsx')
//     const worksheet = workbook.getWorksheet('Sheet1');
//     worksheet.eachRow((row, rowNumber) => {
//         row.eachCell((cell, columnNumber) => {
//             let cellValue = cell.value;
//             console.log(cellValue);
//         })
//     })
// }
// exceleg();
//-------------------------------Method3 
// const ExcelJs = require('exceljs');
// const workbook = new ExcelJs.Workbook();//creating obj of workbook class that is present in exceljs library
// async function exceleg() {
//     let output= {row:-1, col:-1};
//     await workbook.xlsx.readFile('C:/Users/neelu/Downloads/excelPlay.xlsx')
//     const worksheet = workbook.getWorksheet('Sheet1');
//     worksheet.eachRow((row, rowNumber) => {//row,colum helps to iterate them rowNumber, columnNumber keeps track of the no of row,col its iterating
//         row.eachCell((cell, columnNumber) => {
//             let cellValue = cell.value;
//             if(cellValue==='Apple')
//             {output.row=rowNumber;
//              output.col=columnNumber;   
//              //console.log(`row=${output.row} col:${output.col}`);
//             }
//         })
//     })
//     const cell=worksheet.getCell(output.row,output.col);
//     cell.value='Iphone';
//     await workbook.xlsx.writeFile('C:/Users/neelu/Downloads/excelPlay.xlsx');
// }
// exceleg();
//----------------------------------------- refactoring Method3
const ExcelJs = require('exceljs');
const workbook = new ExcelJs.Workbook();
//creating obj of workbook class that is present in exceljs library
async function writeExcel(word,replaceWord,FilePath) {
    // let output= {row:-1, col:-1};
    await workbook.xlsx.readFile(FilePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    
   let output1= await readExcel(worksheet,word);
     const cell=worksheet.getCell(output1.row,output1.col);
    cell.value=replaceWord;
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
    //      const cell=worksheet.getCell(output.row,output.col);
    // cell.value=replaceWord;
    // await workbook.xlsx.writeFile('C:/Users/neelu/Downloads/excelPlay.xlsx');
    }
   

writeExcel('Kivi','Iphone,','C:/Users/neelu/Downloads/excelPlay.xlsx');