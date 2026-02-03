# ⚡ 5-MINUTE QUICKSTART

Get CyberNova platform running in 5 minutes or less.

## 🎯 GOAL

By the end of this guide, you'll have:
- ✅ Backend API running on port 3001
- ✅ Frontend running on port 5173
- ✅ Test registration in Excel file
- ✅ Full platform operational

---

## 📋 PREREQUISITES

Before starting, ensure you have:
- [ ] Node.js installed (version 16+)
- [ ] Terminal/Command Prompt access
- [ ] Project files downloaded/cloned

**Check Node.js:**
```bash
node --version
# Should show v16.0.0 or higher
```

---

## 🚀 STEP-BY-STEP

### 1️⃣ Start Backend (2 minutes)

Open Terminal/Command Prompt:

```bash
# Navigate to backend folder
cd backend

# Install dependencies (first time only)
npm install

# Create environment file
cp .env.example .env

# Start server
npm start
```

**✅ Success when you see:**
```
╔════════════════════════════════════════════════════╗
║   CYBERNOVA SERIES 2026 - BACKEND API SERVER      ║
║   Status: RUNNING                                  ║
║   Port: 3001                                       ║
╚════════════════════════════════════════════════════╝
```

**⚠️ Keep this terminal open!**

---

### 2️⃣ Start Frontend (2 minutes)

Open a **NEW** terminal window:

```bash
# Navigate to project root (or frontend directory)
cd ..

# Install dependencies (first time only, if not already done)
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

**✅ Success when you see:**
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

---

### 3️⃣ Test Registration (1 minute)

1. **Open browser:** `http://localhost:5173`

2. **Navigate:** Click "REGISTER NOW"

3. **Fill form with test data:**
   - Full Name: `Test Student`
   - Registration Number: `2024TEST001`
   - Email: `test@college.edu`
   - Year: `3rd`
   - Section: `A`
   - Mobile: `9876543210`
   - WhatsApp: `Yes`

4. **Submit form**

5. **Verify success page appears**

---

### 4️⃣ Verify Excel File (30 seconds)

Navigate to:
```
backend/data/cybernova_registrations.xlsx
```

Open the file - you should see your test registration!

---

## 🎉 YOU'RE DONE!

Platform is now fully operational.

---

## 🧪 QUICK TESTS

### Test 1: Health Check
Open in browser: `http://localhost:3001/api/health`

Should see:
```json
{
  "success": true,
  "message": "CyberNova API is running"
}
```

### Test 2: Duplicate Prevention
Try submitting the same registration again → Should see error

### Test 3: Validation
Try submitting with invalid email → Should see validation error

---

## 🚨 TROUBLESHOOTING

### Backend won't start

**Problem:** Port 3001 already in use

**Solution:**
```bash
# Edit backend/.env
PORT=3002

# Restart backend
npm start

# Update frontend/.env
VITE_API_URL=http://localhost:3002
```

### Frontend won't start

**Problem:** Port 5173 already in use

**Solution:**
Vite will automatically use next available port (5174, 5175, etc.)

### CORS Error

**Problem:** "blocked by CORS policy" in browser console

**Solution:**
```bash
# Check backend/.env has:
FRONTEND_URL=http://localhost:5173

# Restart backend
cd backend
npm start
```

### Can't find Excel file

**Problem:** Excel file doesn't exist

**Solution:**
File is auto-created on first registration. Just submit a test registration!

---

## 📝 WHAT'S RUNNING?

| Service | Port | URL | Status |
|---------|------|-----|--------|
| Backend API | 3001 | http://localhost:3001 | Check `/api/health` |
| Frontend | 5173 | http://localhost:5173 | Check browser |
| Excel File | - | `backend/data/*.xlsx` | Check file system |

---

## 🎯 NEXT STEPS

Now that everything is running:

1. **Explore all pages:**
   - Landing page (/)
   - Event details (/event-details)
   - Registration (/registration)
   - Success (/success)

2. **Test all features:**
   - Form validation
   - Error messages
   - Duplicate prevention
   - Excel data storage

3. **Review documentation:**
   - `/README.md` - Project overview
   - `/backend/README.md` - API docs
   - `/INTEGRATION.md` - Integration guide

4. **Customize:**
   - Update event details
   - Modify design/colors
   - Add new features

---

## 🛑 STOPPING SERVERS

### Stop Backend
In backend terminal, press: `Ctrl + C`

### Stop Frontend
In frontend terminal, press: `Ctrl + C`

---

## 🔄 RESTARTING

### Restart Backend
```bash
cd backend
npm start
```

### Restart Frontend
```bash
npm run dev
```

---

## ✅ CHECKLIST

Before considering setup complete:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Health check returns success
- [ ] Registration form loads
- [ ] Test registration succeeds
- [ ] Success page appears
- [ ] Excel file contains data
- [ ] No errors in browser console
- [ ] No errors in backend terminal

---

## 📞 STILL STUCK?

1. **Read full documentation:** `/README.md`
2. **Check detailed setup:** `/backend/SETUP.md`
3. **Review integration guide:** `/INTEGRATION.md`
4. **Check both terminal windows** for error messages
5. **Verify Node.js version** is 16 or higher

---

## 🎓 COMMON MISTAKES

❌ **Mistake:** Forgetting to create `.env` files  
✅ **Fix:** `cp .env.example .env` in both root and backend

❌ **Mistake:** Not installing dependencies  
✅ **Fix:** Run `npm install` in both directories

❌ **Mistake:** Backend not running when testing frontend  
✅ **Fix:** Keep backend terminal open and running

❌ **Mistake:** Wrong API URL in frontend  
✅ **Fix:** Check `VITE_API_URL` in frontend `.env`

❌ **Mistake:** Opening Excel file while backend is writing  
✅ **Fix:** Close Excel, backend will retry automatically

---

## 🚀 PRODUCTION DEPLOYMENT

Once everything works locally:

1. **Deploy backend** to Heroku/Render/Railway
2. **Get backend URL** (e.g., `https://api.cybernova.com`)
3. **Update frontend `.env`:**
   ```env
   VITE_API_URL=https://api.cybernova.com
   ```
4. **Build frontend:**
   ```bash
   npm run build
   ```
5. **Deploy frontend** to Vercel/Netlify

See `/README.md` for detailed deployment guide.

---

**🎉 Congratulations!** Your CyberNova platform is live and ready for registrations.

---

**Questions?** Check the full documentation in `/README.md` and `/backend/README.md`
