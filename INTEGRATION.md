# 🔗 FRONTEND + BACKEND INTEGRATION GUIDE

Complete guide to connect your CyberNova frontend with the backend API.

## 📋 OVERVIEW

Your project now has:
- ✅ **Frontend**: React app with registration form
- ✅ **Backend**: Node.js API with Excel storage
- 🔗 **Need**: Connect them together

## 🚀 QUICK START

### Step 1: Start Backend Server

```bash
# Navigate to backend folder
cd backend

# Install dependencies (first time only)
npm install

# Start the server
npm start
```

**Expected output:**
```
╔════════════════════════════════════════════════════╗
║   CYBERNOVA SERIES 2026 - BACKEND API SERVER      ║
║   Status: RUNNING                                  ║
║   Port: 3001                                       ║
╚════════════════════════════════════════════════════╝
```

Keep this terminal window open!

### Step 2: Configure Frontend

Create a `.env` file in your **frontend root directory**:

```bash
# Create .env file
cp .env.example .env
```

Your `.env` file should contain:
```env
VITE_API_URL=http://localhost:3001
```

### Step 3: Start Frontend

```bash
# In a NEW terminal window
# Navigate to your frontend directory (if not already there)
npm run dev
```

### Step 4: Test the Integration

1. Open `http://localhost:5173` in your browser
2. Navigate to the registration page
3. Fill out the form with valid data
4. Click "SUBMIT REGISTRATION"
5. You should see the success page!

**Check your backend terminal** - you'll see:
```
📝 New registration request received
✓ Registration saved: John Doe (2024CS001)
```

**Check the Excel file:**
```
backend/data/cybernova_registrations.xlsx
```

## 🔧 DETAILED SETUP

### Backend Configuration

The backend is already configured to accept requests from your frontend.

**File:** `backend/.env`
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ADMIN_KEY=cybernova2026
```

**Important:**
- `FRONTEND_URL` must match where your frontend is running
- Default Vite dev server: `http://localhost:5173`
- If your frontend runs on a different port, update this value

### Frontend Configuration

The frontend automatically reads the API URL from environment variables.

**File:** `.env` (in frontend root)
```env
VITE_API_URL=http://localhost:3001
```

**How it works:**
```javascript
// In Registration.tsx
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const response = await fetch(`${apiUrl}/api/register`, { ... });
```

### Default Behavior

If you don't create a `.env` file, the frontend will default to:
```
http://localhost:3001
```

This works fine for local development!

## 🌐 PORTS

| Service | Default Port | URL |
|---------|--------------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 3001 | http://localhost:3001 |

**If ports conflict:**
- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite usually auto-increments (5174, 5175, etc.)

## ✅ TESTING THE CONNECTION

### Test 1: Health Check

Open browser and go to:
```
http://localhost:3001/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "CyberNova API is running",
  "timestamp": "2026-02-03T10:30:00.000Z"
}
```

### Test 2: Manual API Call

Use cURL or Postman:
```bash
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Student",
    "registrationNumber": "2024TEST001",
    "email": "test@college.edu",
    "year": "3rd",
    "section": "A",
    "mobile": "9876543210",
    "whatsappJoined": "Yes"
  }'
```

### Test 3: Frontend Form Submission

1. Go to: `http://localhost:5173/registration`
2. Fill the form:
   - Full Name: Test Student
   - Registration Number: 2024TEST002
   - Email: student@college.edu
   - Year: 3rd
   - Section: A
   - Mobile: 9876543211
   - WhatsApp: Yes
3. Click Submit
4. Should navigate to success page

**Check backend terminal for logs:**
```
[2026-02-03T10:30:00.000Z] POST /api/register
📝 New registration request received
✓ Registration saved: Test Student (2024TEST002)
```

## 🔍 DEBUGGING

### Problem: CORS Errors

**Error in browser console:**
```
Access to fetch at 'http://localhost:3001/api/register' has been blocked by CORS policy
```

**Solution:**
1. Check `FRONTEND_URL` in `backend/.env`:
   ```env
   FRONTEND_URL=http://localhost:5173
   ```
2. Restart backend server
3. Clear browser cache (Ctrl+Shift+R)

### Problem: Network Error

**Error:** "Failed to fetch" or "Network request failed"

**Solutions:**
1. Ensure backend is running:
   ```bash
   curl http://localhost:3001/api/health
   ```
2. Check `VITE_API_URL` in frontend `.env`
3. Verify port 3001 is not blocked by firewall

### Problem: 404 Not Found

**Error:** `POST /api/register 404`

**Solutions:**
1. Verify backend endpoint URL: `http://localhost:3001/api/register`
2. Check backend is running
3. Review backend console for route registration

### Problem: 400 Validation Error

**Error:** "Validation failed"

**This is expected behavior!** The backend is rejecting invalid data.

**Check:**
- All required fields are filled
- Email ends with `.edu` or contains `college`
- Mobile number is 10 digits (6-9 start)
- Year is exactly `2nd`, `3rd`, or `4th`

### Problem: 409 Duplicate Error

**Error:** "This email is already registered"

**This is expected behavior!** The backend prevents duplicates.

**Solution:**
- Use a different email/mobile/registration number
- Or delete the Excel file to reset (development only)

## 📊 DATA FLOW DIAGRAM

```
┌─────────────────┐
│   Frontend      │
│  (React Form)   │
└────────┬────────┘
         │
         │ 1. User fills form
         │
         ▼
┌─────────────────┐
│   Validation    │
│  (Client-side)  │
└────────┬────────┘
         │
         │ 2. POST /api/register
         │    with JSON data
         ▼
┌─────────────────┐
│   Backend API   │
│  (Express.js)   │
└────────┬────────┘
         │
         │ 3. Validate data
         │ 4. Check duplicates
         │
         ▼
┌─────────────────┐
│   Excel Write   │
│   (exceljs)     │
└────────┬────────┘
         │
         │ 5. Append new row
         │
         ▼
┌─────────────────┐
│ Success Response│
│   (JSON)        │
└────────┬────────┘
         │
         │ 6. Navigate to
         │    /success page
         ▼
┌─────────────────┐
│  Success Page   │
│  (Confirmation) │
└─────────────────┘
```

## 🎯 PRODUCTION DEPLOYMENT

### Backend Deployment

**Option 1: Heroku**
```bash
cd backend
heroku create cybernova-api
git push heroku main
```

**Option 2: Render**
1. Push backend to GitHub
2. Connect to Render
3. Set environment variables
4. Deploy

**Option 3: VPS (DigitalOcean, AWS, etc.)**
```bash
# Install Node.js
# Install PM2
npm install -g pm2

# Start server
pm2 start server.js --name cybernova-api
pm2 save
pm2 startup
```

**Update frontend `.env` for production:**
```env
VITE_API_URL=https://your-backend-domain.com
```

### Frontend Deployment

**Build for production:**
```bash
npm run build
```

**Deploy to:**
- Vercel
- Netlify
- GitHub Pages
- Your own hosting

**Important:** Update `.env` before building!

## 📝 ENVIRONMENT VARIABLES SUMMARY

### Backend (`backend/.env`)
```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
ADMIN_KEY=super_secret_key_change_this
```

### Frontend (`.env`)
```env
VITE_API_URL=https://your-backend-domain.com
```

## 🔐 SECURITY CHECKLIST

Before going to production:

- [ ] Change `ADMIN_KEY` in backend `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Update CORS `FRONTEND_URL` to production domain
- [ ] Use HTTPS for both frontend and backend
- [ ] Add rate limiting to API
- [ ] Implement proper admin authentication
- [ ] Set up automated backups for Excel file
- [ ] Add monitoring and logging
- [ ] Use environment-specific `.env` files

## ✅ INTEGRATION CHECKLIST

Development setup complete when:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Health check responds successfully
- [ ] Form submission creates Excel row
- [ ] Validation errors display correctly
- [ ] Duplicate prevention works
- [ ] Success page shows after registration
- [ ] Backend logs are clear and detailed
- [ ] No CORS errors in browser console
- [ ] Excel file contains test registrations

## 🎓 NEXT STEPS

1. **Test all validation scenarios**
   - Invalid email format
   - Duplicate submissions
   - Missing required fields
   - Invalid mobile number

2. **Test admin features**
   - Download Excel file
   - Verify data integrity

3. **Load testing** (optional)
   - Simulate multiple concurrent registrations
   - Verify thread-safe writes

4. **Production preparation**
   - Set up production environment variables
   - Configure deployment pipelines
   - Set up monitoring

## 📞 TROUBLESHOOTING HELP

1. **Check both terminals** - Frontend and backend logs
2. **Check browser console** - Network tab shows API calls
3. **Check Excel file** - Verify data is being written
4. **Review environment variables** - Both frontend and backend
5. **Test endpoints individually** - Use cURL/Postman

## 🎉 SUCCESS CRITERIA

You know integration is working when:

✅ Form submission shows loading state  
✅ Success page displays submitted data  
✅ Excel file contains new row  
✅ Backend logs show successful save  
✅ No errors in browser console  
✅ Duplicate prevention works  
✅ All validation rules enforce correctly  

---

**You're all set!** Your frontend and backend are now connected and ready for real registrations.

For detailed API documentation, see `backend/README.md`
