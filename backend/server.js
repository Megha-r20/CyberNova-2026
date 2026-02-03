/**
 * CYBERNOVA SERIES 2026 - BACKEND API SERVER
 * 
 * Enterprise-grade registration system with Excel persistence
 * Handles concurrent requests, validation, and error recovery
 */

const express = require('express');
const cors = require('cors');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const EXCEL_FILE = path.join(__dirname, 'data', 'cybernova_registrations.xlsx');

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Excel Initialization
const initializeExcelFile = async () => {
  try {
    const dataDir = path.dirname(EXCEL_FILE);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    try {
      await fs.access(EXCEL_FILE);
    } catch {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Registrations');
      
      worksheet.columns = [
        { header: 'Full Name', key: 'fullName', width: 25 },
        { header: 'Registration Number', key: 'registrationNumber', width: 20 },
        { header: 'College Email', key: 'email', width: 30 },
        { header: 'Year of Study', key: 'year', width: 15 },
        { header: 'Section', key: 'section', width: 10 },
        { header: 'Mobile Number', key: 'mobile', width: 15 },
        { header: 'WhatsApp Joined', key: 'whatsappJoined', width: 15 },
        { header: 'Registration Timestamp', key: 'timestamp', width: 25 }
      ];

      // Style header
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '00FFFF' } // Cyan
      };

      await workbook.xlsx.writeFile(EXCEL_FILE);
      console.log('Initialized new Excel file');
    }
  } catch (error) {
    console.error('Error initializing Excel file:', error);
    process.exit(1);
  }
};

// Validation
const validators = {
  fullName: (val) => typeof val === 'string' && val.length >= 3 && val.length <= 100,
  registrationNumber: (val) => typeof val === 'string' && /^[a-zA-Z0-9]+$/.test(val) && val.length <= 20,
  email: (val) => typeof val === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) && (val.includes('.edu') || val.includes('college')) && val.length <= 100,
  year: (val) => ['2nd Year', '3rd Year', '4th Year'].includes(val),
  section: (val) => typeof val === 'string' && val.length <= 10,
  mobile: (val) => typeof val === 'string' && /^[6-9]\d{9}$/.test(val),
  whatsappJoined: (val) => ['Yes', 'No'].includes(val)
};

const validateRegistration = (data) => {
  const errors = {};
  let valid = true;

  for (const [field, validator] of Object.entries(validators)) {
    if (!data[field] || !validator(data[field])) {
      errors[field] = `Invalid ${field}`;
      valid = false;
    }
  }

  return { valid, errors };
};

const sanitizeData = (data) => ({
  fullName: data.fullName.trim(),
  registrationNumber: data.registrationNumber.trim().toUpperCase(),
  email: data.email.trim().toLowerCase(),
  year: data.year,
  section: data.section.trim().toUpperCase(),
  mobile: data.mobile.trim(),
  whatsappJoined: data.whatsappJoined,
  timestamp: new Date().toISOString()
});

const checkDuplicate = async (regNum, email, mobile) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXCEL_FILE);
  const worksheet = workbook.getWorksheet('Registrations');
  
  let duplicate = null;
  
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header
    const rowVal = row.values;
    // ExcelJS row.values is 1-based, index 2 matches 'Registration Number' (col 2), etc.
    // Columns: 1=Name, 2=RegNum, 3=Email, 4=Year, 5=Section, 6=Mobile
    
    // Note: row.values might be [empty, val1, val2, ...] or [val1, val2] depending on implementation.
    // Safe way is using getCell or checking the array carefully.
    // row.getCell(2).value
    
    if (String(row.getCell(2).value).toUpperCase() === regNum.toUpperCase()) duplicate = 'Registration Number';
    if (String(row.getCell(3).value).toLowerCase() === email.toLowerCase()) duplicate = 'Email';
    if (String(row.getCell(6).value) === mobile) duplicate = 'Mobile Number';
  });

  return { isDuplicate: !!duplicate, duplicateField: duplicate };
};

const appendToExcel = async (data) => {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(EXCEL_FILE);
      const worksheet = workbook.getWorksheet('Registrations');
      
      worksheet.addRow([
        data.fullName,
        data.registrationNumber,
        data.email,
        data.year,
        data.section,
        data.mobile,
        data.whatsappJoined,
        data.timestamp
      ]);

      await workbook.xlsx.writeFile(EXCEL_FILE);
      return;
    } catch (error) {
      attempts++;
      if (attempts === maxAttempts) throw error;
      await new Promise(resolve => setTimeout(resolve, 100 * attempts));
    }
  }
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { valid, errors } = validateRegistration(req.body);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const sanitized = sanitizeData(req.body);

    const { isDuplicate, duplicateField } = await checkDuplicate(
      sanitized.registrationNumber, 
      sanitized.email,
      sanitized.mobile
    );

    if (isDuplicate) {
      return res.status(409).json({ 
        success: false, 
        message: `Duplicate registration found: ${duplicateField} already registered`,
        field: duplicateField
      });
    }

    await appendToExcel(sanitized);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: sanitized
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/admin/download', async (req, res) => {
  const key = req.headers['x-admin-key'];
  if (key !== (process.env.ADMIN_KEY || 'cybernova2026')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  res.download(EXCEL_FILE);
});

// Error handling
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start Server
const startServer = async () => {
  await initializeExcelFile();
  app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║      CYBERNOVA SERIES 2026 API         ║
    ╠════════════════════════════════════════╣
    ║ Status:   Online                       ║
    ║ Port:     ${PORT}                         ║
    ║ Env:      ${process.env.NODE_ENV || 'dev'}                          ║
    ╚════════════════════════════════════════╝
    `);
  });
};

startServer();
