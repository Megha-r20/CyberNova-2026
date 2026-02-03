# 🔐 CyberNova 2026 - Admin Access Information

## ✅ Servers Running

Both development servers are now running successfully!

### 🎨 Frontend (Vite + React)
- **URL**: http://localhost:5173/
- **Status**: ✅ Running
- **Port**: 5173

### 🔧 Backend (Express API)
- **URL**: http://localhost:3001/
- **Status**: ✅ Running
- **Port**: 3001

---

## 🔑 Admin Portal Access

### Admin Dashboard URL
**http://localhost:5173/admin**

### Admin Credentials
- **Password**: `cybernova2026`

---

## 📋 Admin Portal Features

Once you access the admin portal, you can:

1. **View All Registrations** - See all student registrations in a table format
2. **Refresh Data** - Click the refresh button to get the latest registrations
3. **Download Excel** - Export all registration data as an Excel file
4. **Real-time Count** - See the total number of registrations

---

## 🗂️ Data Storage

All registration data is stored in:
```
backend/data/cybernova_registrations.xlsx
```

---

## 🚀 Quick Access Links

| Page | URL |
|------|-----|
| Landing Page | http://localhost:5173/ |
| Event Details | http://localhost:5173/event-details |
| Registration | http://localhost:5173/register |
| **Admin Portal** | **http://localhost:5173/admin** |

---

## 🛑 To Stop Servers

Press `Ctrl + C` in each terminal window running the servers.

---

## 🔒 Security Note

The admin key is currently set to `cybernova2026`. You can change this in:
- Backend: `backend/.env` (ADMIN_KEY variable)
- Frontend: `frontend/src/components/Admin.tsx` (line 25 and 39)

Make sure to update both locations if you change the password!
