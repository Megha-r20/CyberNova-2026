const ExcelJS = require('exceljs');
const path = require('path');

async function directTest() {
    const EXCEL_FILE = path.join(__dirname, 'data', 'cybernova_registrations.xlsx');

    console.log('📁 Excel file path:', EXCEL_FILE);
    console.log('📁 Absolute path:', path.resolve(EXCEL_FILE));

    try {
        // Read existing file
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(EXCEL_FILE);
        const worksheet = workbook.getWorksheet('Registrations');

        console.log('\n📊 Current rows:');
        let rowCount = 0;
        worksheet.eachRow((row, rowNumber) => {
            rowCount++;
            console.log(`Row ${rowNumber}:`, row.values);
        });
        console.log(`Total rows: ${rowCount}`);

        // Add a test row
        console.log('\n➕ Adding test row...');
        worksheet.addRow({
            fullName: 'DIRECT TEST',
            registrationNumber: 'TEST123',
            email: 'test@test.com',
            year: '2nd',
            section: 'A',
            mobile: '1234567890',
            whatsappJoined: 'Yes',
            timestamp: new Date().toISOString()
        });

        // Save
        console.log('💾 Saving file...');
        await workbook.xlsx.writeFile(EXCEL_FILE);
        console.log('✅ File saved successfully!');

        // Read again to verify
        console.log('\n🔍 Reading file again to verify...');
        const workbook2 = new ExcelJS.Workbook();
        await workbook2.xlsx.readFile(EXCEL_FILE);
        const worksheet2 = workbook2.getWorksheet('Registrations');

        let newRowCount = 0;
        worksheet2.eachRow((row, rowNumber) => {
            newRowCount++;
        });
        console.log(`New total rows: ${newRowCount}`);

        if (newRowCount > rowCount) {
            console.log('✅ SUCCESS! Row was added and persisted!');
        } else {
            console.log('❌ FAILED! Row was NOT persisted!');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Stack:', error.stack);
    }
}

directTest();
