# 🚀 BACKEND SETUP GUIDE

Step-by-step instructions to get the CyberNova backend running in 5 minutes.

## ⚡ PREREQUISITES

Before you start, ensure you have:

1. **Node.js** (version 16 or higher)
   - Check: `node --version`
   - Download: https://nodejs.org/

2. **npm** (comes with Node.js)
   - Check: `npm --version`

3. **Terminal/Command Prompt** access

## 📥 STEP 1: OPEN TERMINAL

### Windows
- Press `Win + R`, type `cmd`, press Enter
- Or use PowerShell, Windows Terminal, or Git Bash

### Mac/Linux
- Press `Cmd + Space`, type `Terminal`, press Enter
- Or use your preferred terminal emulator

## 📂 STEP 2: NAVIGATE TO BACKEND FOLDER

```bash
# If your project is in Desktop
cd Desktop/cybernova-project/backend

# If your project is in Documents
cd Documents/cybernova-project/backend

# General format
cd path/to/your/project/backend
```

**Verify you're in the right folder:**
```bash
ls
# You should see: server.js, package.json, README.md, etc.
```

## 📦 STEP 3: INSTALL DEPENDENCIES

```bash
npm install
```

**What this does:**
- Downloads `express`, `exceljs`, `cors`, `dotenv`
- Creates `node_modules` folder
- Takes 30-60 seconds

**Expected output:**
```
added 57 packages, and audited 58 packages in 15s
found 0 vulnerabilities
```

## ⚙️ STEP 4: CONFIGURE ENVIRONMENT

```bash
# Copy example environment file
cp .env.example .env
```

**For Windows (if cp doesn't work):**
```bash
copy .env.example .env
```

**Edit `.env` file** (optional):
- Open `.env` in any text editor (Notepad, VS Code, etc.)
- Default values work fine for local development
- Only change if you need to

```env
PORT=3001                              # API server port
NODE_ENV=development                    # Environment mode
FRONTEND_URL=http://localhost:5173      # Your React app URL
ADMIN_KEY=cybernova2026                # Change in production
```

## 🎯 STEP 5: START THE SERVER

```bash
npm start
```

**Expected output:**
```
╔════════════════════════════════════════════════════╗
║   CYBERNOVA SERIES 2026 - BACKEND API SERVER      ║
╠════════════════════════════════════════════════════╣
║   Status: RUNNING                                  ║
║   Port: 3001                                       ║
║   Environment: development                         ║
╠════════════════════════════════════════════════════╣
║   Endpoints:                                       ║
║   POST /api/register - Submit registration        ║
║   GET  /api/admin/download - Download Excel       ║
║   GET  /api/health - Health check                 ║
╚════════════════════════════════════════════════════╝

✓ Excel file exists
```

**🎉 SUCCESS! Your backend is now running.**

## ✅ STEP 6: TEST THE API

Open a **NEW terminal window** (keep the server running) and test:

```bash
# Health check
curl http://localhost:3001/api/health
```

**Expected response:**
```json
{
  "success": true,
  "message": "CyberNova API is running",
  "timestamp": "2026-02-03T10:30:00.000Z"
}
```

**Alternative test (browser):**
- Open browser and go to: `http://localhost:3001/api/health`
- You should see the JSON response

## 🔗 STEP 7: CONNECT FRONTEND

Your frontend needs to know where the backend is running.

**Option A: Environment Variable (Recommended)**

Create `/frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
```

**Option B: Direct Configuration**

Update your frontend code to use:
```javascript
const API_URL = 'http://localhost:3001';
```

## 🧪 STEP 8: TEST REGISTRATION

Use the frontend registration form OR test with cURL:

```bash
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Student",
    "registrationNumber": "2024CS001",
    "email": "test@college.edu",
    "year": "3rd",
    "section": "A",
    "mobile": "9876543210",
    "whatsappJoined": "Yes"
  }'
```

**Check the Excel file:**
```bash
# It's created automatically at:
backend/data/cybernova_registrations.xlsx
```

Open it with Excel/Google Sheets to see the registration!

## 🛑 STOPPING THE SERVER

In the terminal where the server is running:
- Press `Ctrl + C`
- Confirm if prompted

## 🔄 RESTARTING THE SERVER

```bash
npm start
```

## 🔧 DEVELOPMENT MODE (AUTO-RELOAD)

For development with automatic restart on file changes:

```bash
npm run dev
```

This uses `nodemon` to watch for file changes and restart automatically.

## 📊 WHERE IS MY DATA?

All registrations are saved in:
```
backend/data/cybernova_registrations.xlsx
```

**Excel Structure:**
| Full Name | Registration Number | College Email | Year of Study | Section | Mobile Number | WhatsApp Joined | Registration Timestamp |
|-----------|---------------------|---------------|---------------|---------|---------------|-----------------|------------------------|
| Test Student | 2024CS001 | test@college.edu | 3rd | A | 9876543210 | Yes | 2026-02-03T10:30:00.000Z |

## 🚨 COMMON ISSUES

### Issue: Port 3001 already in use
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution 1:** Change port in `.env`
```env
PORT=3002
```

**Solution 2:** Kill process using port 3001
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### Issue: `npm install` fails
```
npm ERR! code EACCES
```

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Try again
npm install
```

### Issue: Excel file locked
```
Error: EBUSY: resource busy or locked
```

**Solution:**
- Close Excel if you have the file open
- Server will retry automatically

### Issue: CORS errors in browser
```
Access to fetch at 'http://localhost:3001' has been blocked by CORS policy
```

**Solution:**
- Update `FRONTEND_URL` in `.env` to match your frontend
- Restart backend server

## 🎓 WHAT NEXT?

1. **Test all validation rules** - Try submitting invalid data
2. **Check duplicate prevention** - Submit same registration twice
3. **Download Excel file** - Use admin endpoint
4. **Review logs** - Watch console for detailed operations
5. **Integrate with frontend** - Connect your React app

## 📞 NEED HELP?

1. **Check the console logs** - Most errors are logged with clear messages
2. **Read the full README** - `backend/README.md` has detailed documentation
3. **Verify environment** - Ensure `.env` is configured correctly
4. **Test endpoints individually** - Use cURL or Postman

## ✅ CHECKLIST

Before submitting your project, ensure:

- [ ] Backend starts without errors
- [ ] Health check returns success
- [ ] Registration endpoint accepts valid data
- [ ] Registration endpoint rejects invalid data
- [ ] Duplicate registrations are prevented
- [ ] Excel file is created and populated
- [ ] Frontend can connect to backend
- [ ] CORS is configured correctly
- [ ] Admin download works
- [ ] All logs are clear and informative

## 🎉 YOU'RE READY!

Your backend is production-ready and handles:
✅ Real data persistence (Excel)
✅ Input validation
✅ Duplicate prevention
✅ Error handling
✅ Concurrent requests
✅ Admin operations

**Now connect your frontend and start registering participants!**

---

**Questions?** Check `backend/README.md` for detailed API documentation.
