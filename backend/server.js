/**
 * CYBERNOVA SERIES 2026 – PRODUCTION BACKEND
 * JSON Storage + JWT + Multiple Admins + Thread-Safe Writes
 */

const express = require('express');
const cors = require('cors');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Mutex } = require('async-mutex');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const DATA_DIR = path.join(__dirname, 'data');
const JSON_FILE = path.join(DATA_DIR, 'registrations.json');

app.use(cors({ origin: '*' }));
app.use(express.json());

/* ───────────────────────────────
   MULTIPLE ADMINS
─────────────────────────────── */
const ADMINS = [
  {
    email: 'admin@cybernova.com',
    passwordHash: bcrypt.hashSync('CyberNova@2026', 10),
    role: 'superadmin'
  },
  {
    email: 'staff@cybernova.com',
    passwordHash: bcrypt.hashSync('Staff@2026', 10),
    role: 'admin'
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'cybernova_secret_key';

/* ───────────────────────────────
   INITIALIZE JSON FILE
─────────────────────────────── */
async function initDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(JSON_FILE);
    console.log('✓ JSON file exists');
  } catch {
    console.log('⚠ Creating new JSON file...');
    await fs.writeFile(JSON_FILE, JSON.stringify([], null, 2));
    console.log('✓ JSON file created');
  }
}

/* ───────────────────────────────
   READ/WRITE JSON DATA
─────────────────────────────── */
async function readData() {
  const content = await fs.readFile(JSON_FILE, 'utf-8');
  return JSON.parse(content);
}

async function writeData(data) {
  await fs.writeFile(JSON_FILE, JSON.stringify(data, null, 2));
}

/* ───────────────────────────────
   JWT MIDDLEWARE
─────────────────────────────── */
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

/* ───────────────────────────────
   ADMIN LOGIN
─────────────────────────────── */
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  const admin = ADMINS.find(a => a.email === email);
  if (!admin || !bcrypt.compareSync(password, admin.passwordHash)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { email: admin.email, role: admin.role },
    JWT_SECRET,
    { expiresIn: '6h' }
  );

  res.json({ success: true, token, email: admin.email, role: admin.role });
});

/* ───────────────────────────────
   REGISTER USER (THREAD SAFE)
─────────────────────────────── */
const mutex = new Mutex();

app.post('/api/register', async (req, res) => {
  try {
    const data = {
      fullName: req.body.fullName,
      registrationNumber: req.body.registrationNumber,
      email: req.body.email,
      year: req.body.year,
      section: req.body.section,
      mobile: req.body.mobile,
      whatsappJoined: req.body.whatsappJoined,
      timestamp: new Date().toISOString()
    };

    console.log('📝 New registration:', data.fullName);

    await mutex.runExclusive(async () => {
      const registrations = await readData();
      const beforeCount = registrations.length;
      console.log('📊 Registrations before:', beforeCount);

      registrations.push(data);
      await writeData(registrations);
      console.log('💾 Data written to JSON');

      // Verify write
      const verify = await readData();
      const afterCount = verify.length;
      console.log('✅ Verification - Registrations after:', afterCount);

      if (afterCount <= beforeCount) {
        throw new Error('Data not persisted!');
      }

      console.log('✅ Registration saved and verified:', data.fullName);
    });

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    res.status(500).json({ success: false, message: 'Registration failed: ' + error.message });
  }
});

/* ───────────────────────────────
   ADMIN DATA
─────────────────────────────── */
app.get('/api/admin/data', verifyAdmin, async (req, res) => {
  try {
    const data = await readData();
    res.json({ success: true, data, count: data.length });
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
});

/* ───────────────────────────────
   DOWNLOAD EXCEL
─────────────────────────────── */
app.get('/api/admin/download', verifyAdmin, async (req, res) => {
  try {
    const data = await readData();

    // Create Excel workbook
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Registrations');

    ws.columns = [
      { header: 'Full Name', key: 'fullName', width: 25 },
      { header: 'Registration Number', key: 'registrationNumber', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Year', key: 'year', width: 10 },
      { header: 'Section', key: 'section', width: 10 },
      { header: 'Mobile', key: 'mobile', width: 15 },
      { header: 'WhatsApp', key: 'whatsappJoined', width: 15 },
      { header: 'Timestamp', key: 'timestamp', width: 25 }
    ];

    ws.getRow(1).font = { bold: true };

    // Add data rows
    data.forEach(row => ws.addRow(row));

    // Send as download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=cybernova_registrations.xlsx');

    await wb.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('❌ Download error:', error);
    res.status(500).json({ success: false, message: 'Download failed' });
  }
});

/* ───────────────────────────────
   DELETE ALL DATA
─────────────────────────────── */
app.delete('/api/admin/clear-all', verifyAdmin, async (req, res) => {
  try {
    await mutex.runExclusive(async () => {
      await writeData([]);
      console.log('✓ All data cleared');
    });

    res.json({ success: true, message: 'All data cleared successfully' });
  } catch (error) {
    console.error('❌ Clear error:', error);
    res.status(500).json({ success: false, message: 'Failed to clear data' });
  }
});

/* ───────────────────────────────
   HEALTH CHECK
─────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CyberNova API is running',
    timestamp: new Date().toISOString()
  });
});

/* ───────────────────────────────
   START
─────────────────────────────── */
(async () => {
  await initDataFile();
  app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log('║   CYBERNOVA SERIES 2026 - BACKEND API SERVER      ║');
    console.log('╠════════════════════════════════════════════════════╣');
    console.log(`║   Status: RUNNING                                  ║`);
    console.log(`║   Port: ${PORT.toString().padEnd(44)}║`);
    console.log('║   Storage: JSON (Reliable & Fast)                 ║');
    console.log('╠════════════════════════════════════════════════════╣');
    console.log('║   🔐 JWT Authentication Enabled                    ║');
    console.log('║   👥 Multiple Admin Support                        ║');
    console.log('║   🔒 Thread-Safe JSON Writes                       ║');
    console.log('║   📊 Excel Export Available                        ║');
    console.log('╠════════════════════════════════════════════════════╣');
    console.log('║   POST /api/register - Submit registration        ║');
    console.log('║   POST /api/admin/login - Admin login             ║');
    console.log('║   GET  /api/admin/data - View registrations       ║');
    console.log('║   GET  /api/admin/download - Download Excel       ║');
    console.log('║   DELETE /api/admin/clear-all - Clear all data    ║');
    console.log('║   GET  /api/health - Health check                 ║');
    console.log('╚════════════════════════════════════════════════════╝\n');
    console.log('📧 Admin Accounts:');
    console.log('   • admin@cybernova.com (CyberNova@2026)');
    console.log('   • staff@cybernova.com (Staff@2026)\n');
  });
})();
