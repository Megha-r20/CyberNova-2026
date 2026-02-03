const ExcelJS = require('exceljs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'backend', 'data', 'cybernova_registrations.xlsx');

async function readExcel() {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(FILE_PATH);
        const worksheet = workbook.getWorksheet('Registrations');

        console.log(`Row Count: ${worksheet.rowCount}`);

        worksheet.eachRow((row, rowNumber) => {
            console.log(`Row ${rowNumber}: ${JSON.stringify(row.values)}`);
        });

    } catch (error) {
        console.error('Error reading excel:', error);
    }
}

readExcel();
