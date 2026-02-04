/**
 * CYBERNOVA SERIES 2026 – PRODUCTION BACKEND
 * Hybrid Storage: MongoDB (Cloud) + JSON/Excel (Local Backup)
 */

const express = require('express');
const cors = require('cors');
const ExcelJS = require('exceljs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs').promises;
const { Mutex } = require('async-mutex');
require('dotenv').config();

const connectDB = require('./db');
const Registration = require('./models/Registration');

const app = express();
const PORT = process.env.PORT || 3002;

// ───────────────────────────────
// FILE STORAGE CONFIG
// ───────────────────────────────
const DATA_DIR = path.join(__dirname, 'data');
const JSON_FILE = path.join(DATA_DIR, 'registrations.json');
const EXCEL_FILE = path.join(DATA_DIR, 'cybernova_registrations.xlsx');
const mutex = new Mutex();

app.use(cors({ origin: '*' }));
app.use(express.json());

// ───────────────────────────────
// ADMIN CONFIG
// ───────────────────────────────
const ADMIN_PASSWORD = 'CyberNova@2026';
const JWT_SECRET = process.env.JWT_SECRET || 'cybernova_secret_key';

// ───────────────────────────────
// DATABASE CONNECTION
// ───────────────────────────────
connectDB();

// ───────────────────────────────
// FILE HELPERS
// ───────────────────────────────
async function initDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(JSON_FILE);
  } catch {
    await fs.writeFile(JSON_FILE, JSON.stringify([], null, 2));
  }
}

async function readLocalData() {
  try {
    const content = await fs.readFile(JSON_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeLocalData(data) {
  await fs.writeFile(JSON_FILE, JSON.stringify(data, null, 2));
}

async function updateLocalExcel(data) {
  try {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Registrations');

    ws.columns = [
      { header: 'Full Name', key: 'fullName', width: 25 },
      { header: 'Registration Number', key: 'registrationNumber', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Year', key: 'year', width: 10 },
      { header: 'Section', key: 'section', width: 10 },
      { header: 'Mobile', key: 'mobile', width: 15 },
      { header: 'WhatsApp Joined', key: 'whatsappJoined', width: 18 },
      { header: 'Timestamp', key: 'timestamp', width: 25 }
    ];

    ws.getRow(1).font = { bold: true };

    data.forEach(row => {
      ws.addRow({
        fullName: row.fullName,
        registrationNumber: row.registrationNumber,
        email: row.email,
        year: row.year,
        section: row.section,
        mobile: row.mobile,
        whatsappJoined: row.whatsappJoined ? 'Yes' : 'No',
        timestamp: new Date(row.timestamp).toISOString()
      });
    });

    await wb.xlsx.writeFile(EXCEL_FILE);
    console.log('📊 Excel backup updated');
  } catch (err) {
    console.error('⚠️ Excel update failed:', err.message);
  }
}

// ───────────────────────────────
// JWT MIDDLEWARE
// ───────────────────────────────
function verifyAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    req.admin = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

// ───────────────────────────────
// ADMIN LOGIN
// ───────────────────────────────
app.post('/api/admin/login', (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }

  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '6h' });
  res.json({ success: true, token });
});

// ───────────────────────────────
// REGISTER USER (FIXED BOOLEAN ISSUE)
// ───────────────────────────────
app.post('/api/register', async (req, res) => {
  try {
    const {
      fullName,
      registrationNumber,
      email,
      year,
      section,
      mobile,
      whatsappJoined
    } = req.body;

    // ✅ Normalize WhatsApp Joined to Boolean
    const normalizedWhatsappJoined =
      whatsappJoined === true ||
      whatsappJoined === 'Yes' ||
      whatsappJoined === 'yes' ||
      whatsappJoined === 'true' ||
      whatsappJoined === 1;

    // 1. Save to MongoDB
    const savedDoc = await Registration.create({
      fullName,
      registrationNumber,
      email,
      year,
      section,
      mobile,
      whatsappJoined: normalizedWhatsappJoined
    });

    console.log('✅ MongoDB Save:', fullName);

    // 2. Save to Local Backup (JSON + Excel) - BACKGROUND PROCESS
    // We do NOT await this so the user gets an instant response
    mutex.runExclusive(async () => {
      try {
        const localData = await readLocalData();
        const plain = savedDoc.toObject();
        plain.timestamp = plain.timestamp.toISOString();
        localData.push(plain);

        await writeLocalData(localData);
        await updateLocalExcel(localData);
      } catch (err) {
        console.error('⚠️ Background backup failed:', err.message);
      }
    });

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (err) {
    console.error('❌ Registration error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ───────────────────────────────
// ADMIN DATA
// ───────────────────────────────
app.get('/api/admin/data', verifyAdmin, async (req, res) => {
  const data = await Registration.find().sort({ timestamp: -1 });
  res.json({ success: true, data, count: data.length });
});

// ───────────────────────────────
// DOWNLOAD EXCEL (FROM MONGODB)
// ───────────────────────────────
app.get('/api/admin/download', verifyAdmin, async (req, res) => {
  const data = await Registration.find().sort({ timestamp: -1 });

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Registrations');

  ws.columns = [
    { header: 'Full Name', key: 'fullName', width: 25 },
    { header: 'Registration Number', key: 'registrationNumber', width: 20 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Year', key: 'year', width: 10 },
    { header: 'Section', key: 'section', width: 10 },
    { header: 'Mobile', key: 'mobile', width: 15 },
    { header: 'WhatsApp Joined', key: 'whatsappJoined', width: 18 },
    { header: 'Timestamp', key: 'timestamp', width: 25 }
  ];

  ws.getRow(1).font = { bold: true };

  data.forEach(r => {
    ws.addRow({
      fullName: r.fullName,
      registrationNumber: r.registrationNumber,
      email: r.email,
      year: r.year,
      section: r.section,
      mobile: r.mobile,
      whatsappJoined: r.whatsappJoined ? 'Yes' : 'No',
      timestamp: r.timestamp.toISOString()
    });
  });

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=cybernova_registrations.xlsx'
  );

  await wb.xlsx.write(res);
  res.end();
});

// ───────────────────────────────
// CLEAR ALL DATA
// ───────────────────────────────
app.delete('/api/admin/clear-all', verifyAdmin, async (req, res) => {
  await Registration.deleteMany({});
  await mutex.runExclusive(async () => {
    await writeLocalData([]);
    await updateLocalExcel([]);
  });

  res.json({ success: true, message: 'All data cleared' });
});

// ───────────────────────────────
// HEALTH CHECK
// ───────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'CyberNova API running' });
});

// ───────────────────────────────
// START SERVER
// ───────────────────────────────
(async () => {
  await initDataFile();
  app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log('║   CYBERNOVA SERIES 2026 - BACKEND API SERVER      ║');
    console.log('╠════════════════════════════════════════════════════╣');
    console.log('║   🚀 SERVER STARTED (Hybrid Mode)                  ║');
    console.log(`║   Port: ${PORT.toString().padEnd(44)}║`);
    console.log('║   Storage: MongoDB Atlas + Local JSON/XLSX        ║');
    console.log('╚════════════════════════════════════════════════════╝\n');
  });
})();
