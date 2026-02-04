/**
 * CYBERNOVA SERIES 2026 – PRODUCTION BACKEND
 * Storage: MongoDB (Cloud)
 * Note: specific local file storage removed as it does not persist on Render/Cloud hosting.
 *       Use the Admin Dashboard to download Excel exports.
 */

const express = require('express');
const cors = require('cors');
const ExcelJS = require('exceljs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const connectDB = require('./db');
const Registration = require('./models/Registration');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({ origin: '*' }));
app.use(express.json());

// ───────────────────────────────
// ADMIN CONFIG
// ───────────────────────────────
const ADMIN_PASSWORD = 'CyberNova@2026';
const JWT_SECRET = process.env.JWT_SECRET || 'cybernova_secret_key';

// ───────────────────────────────
// CONSTANTS
// ───────────────────────────────
const TOTAL_SLOTS = 100;

// ───────────────────────────────
// DATABASE CONNECTION
// ───────────────────────────────
connectDB();

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
// PUBLIC: GET SLOTS LEFT
// ───────────────────────────────
app.get('/api/slots-left', async (req, res) => {
  try {
    const count = await Registration.countDocuments();
    const slotsLeft = Math.max(0, TOTAL_SLOTS - count);
    res.json({ success: true, slotsLeft, totalRegistered: count });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching slots' });
  }
});

// ───────────────────────────────
// REGISTER USER
// ───────────────────────────────
app.post('/api/register', async (req, res) => {
  try {
    // Check Slot Availability
    const currentCount = await Registration.countDocuments();
    if (currentCount >= TOTAL_SLOTS) {
      return res.status(400).json({ success: false, message: 'Registration closed. All slots are full.' });
    }

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
    await Registration.create({
      fullName,
      registrationNumber,
      email,
      year,
      section,
      mobile,
      whatsappJoined: normalizedWhatsappJoined
    });

    console.log('✅ MongoDB Save:', fullName);

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
  try {
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
  } catch (err) {
    console.error('❌ Excel Download Error:', err);
    res.status(500).send('Error generating Excel file');
  }
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
app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════════════╗');
  console.log('║   CYBERNOVA SERIES 2026 - BACKEND API SERVER      ║');
  console.log('╠════════════════════════════════════════════════════╣');
  console.log('║   🚀 SERVER STARTED (Cloud Mode)                   ║');
  console.log(`║   Port: ${PORT.toString().padEnd(44)}║`);
  console.log('║   Storage: MongoDB Atlas Only                     ║');
  console.log('╚════════════════════════════════════════════════════╝\n');
});

