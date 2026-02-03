# 🔥 CYBERNOVA SERIES 2026 — BACKEND API

Enterprise-grade registration system with Excel persistence, built for production use.

## 🎯 FEATURES

- ✅ **Excel Storage**: Automatic append-only writes to `.xlsx` files
- ✅ **Validation**: Comprehensive input validation and sanitization
- ✅ **Duplicate Prevention**: Checks registration number, email, and mobile
- ✅ **Thread-Safe Writes**: Handles concurrent requests with retry logic
- ✅ **Error Recovery**: Graceful error handling and detailed logging
- ✅ **CORS Enabled**: Secure cross-origin requests
- ✅ **Admin Download**: Protected Excel file download endpoint

## 📁 PROJECT STRUCTURE

```
backend/
├── server.js           # Main API server
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variable template
├── .gitignore         # Git ignore rules
├── README.md          # This file
└── data/              # Created automatically
    └── cybernova_registrations.xlsx
```

## 🚀 QUICK START

### Prerequisites

- Node.js v16 or higher
- npm or yarn

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file** (optional)
   ```env
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ADMIN_KEY=your_secure_admin_key_here
   ```

5. **Start the server**
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

### Verify Installation

The server should start and display:
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
```

Test with:
```bash
curl http://localhost:3001/api/health
```

## 📡 API ENDPOINTS

### 1. POST `/api/register`

Submit a new registration.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "registrationNumber": "2021CS001",
  "email": "john.doe@college.edu",
  "year": "3rd",
  "section": "A",
  "mobile": "9876543210",
  "whatsappJoined": "Yes"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "fullName": "John Doe",
    "registrationNumber": "2021CS001",
    "email": "john.doe@college.edu",
    "timestamp": "2026-02-03T10:30:00.000Z"
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "mobile": "Invalid mobile number"
  }
}
```

**Duplicate Error (409):**
```json
{
  "success": false,
  "message": "This email is already registered",
  "errors": {
    "duplicate": "email"
  }
}
```

### 2. GET `/api/admin/download`

Download the Excel file (admin only).

**Headers:**
```
x-admin-key: your_admin_key_from_env
```

**Success Response:**
Downloads `cybernova_registrations.xlsx`

**Unauthorized (401):**
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### 3. GET `/api/health`

Health check endpoint.

**Success Response (200):**
```json
{
  "success": true,
  "message": "CyberNova API is running",
  "timestamp": "2026-02-03T10:30:00.000Z"
}
```

## 📊 EXCEL FILE STRUCTURE

File: `data/cybernova_registrations.xlsx`

| Column | Description | Example |
|--------|-------------|---------|
| Full Name | Participant's full name | John Doe |
| Registration Number | College registration ID | 2021CS001 |
| College Email | Valid college email | john.doe@college.edu |
| Year of Study | 2nd, 3rd, or 4th | 3rd |
| Section | Class section | A |
| Mobile Number | 10-digit Indian mobile | 9876543210 |
| WhatsApp Joined | Yes or No | Yes |
| Registration Timestamp | ISO 8601 timestamp | 2026-02-03T10:30:00.000Z |

## ✅ VALIDATION RULES

- **Full Name**: 3-100 characters, required
- **Registration Number**: Alphanumeric, required
- **Email**: Valid format, must end with `.edu` or contain `college`
- **Year**: Must be `2nd`, `3rd`, or `4th`
- **Section**: Required, max 10 characters
- **Mobile**: Exactly 10 digits, must start with 6-9
- **WhatsApp Joined**: Must be `Yes` or `No`

## 🔒 SECURITY FEATURES

1. **Input Sanitization**: All inputs are trimmed and sanitized
2. **Duplicate Prevention**: Checks registration number, email, and mobile
3. **SQL Injection Safe**: No database queries (Excel-based)
4. **CORS Protection**: Whitelist frontend URL
5. **Admin Authentication**: Protected admin endpoints
6. **Error Hiding**: Production mode hides error details

## 🛠️ TESTING

### Test with cURL

```bash
# Health check
curl http://localhost:3001/api/health

# Submit registration
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "registrationNumber": "TEST001",
    "email": "test@college.edu",
    "year": "3rd",
    "section": "A",
    "mobile": "9876543210",
    "whatsappJoined": "Yes"
  }'

# Download Excel (replace YOUR_ADMIN_KEY)
curl -H "x-admin-key: YOUR_ADMIN_KEY" \
  http://localhost:3001/api/admin/download \
  -o registrations.xlsx
```

### Test with Postman

Import this collection:
- Base URL: `http://localhost:3001`
- POST `/api/register` with JSON body
- GET `/api/admin/download` with header `x-admin-key`

## 🚨 TROUBLESHOOTING

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3002
```

### Excel File Locked
- Close Excel if file is open
- Server will retry write operations automatically

### CORS Errors
- Update `FRONTEND_URL` in `.env` to match your frontend URL
- Restart the server after changing `.env`

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📦 DEPLOYMENT

### Production Checklist

- [ ] Change `ADMIN_KEY` to a secure random string
- [ ] Set `NODE_ENV=production`
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Set up proper authentication for admin endpoints
- [ ] Configure firewall rules
- [ ] Set up SSL/TLS certificate
- [ ] Enable process manager (PM2)
- [ ] Configure backup strategy for Excel files

### Deploy with PM2

```bash
npm install -g pm2
pm2 start server.js --name cybernova-api
pm2 save
pm2 startup
```

### Environment Variables

```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-production-domain.com
ADMIN_KEY=super_secret_random_string_here
```

## 📝 LOGS

The server logs all operations to console:
- ✓ Success operations
- ✗ Error operations
- 📝 Registration requests
- ⚠ Warnings

Example:
```
[2026-02-03T10:30:00.000Z] POST /api/register
📝 New registration request received
✓ Registration saved: John Doe (2021CS001)
```

## 🤝 SUPPORT

For issues or questions:
- Check logs in the console
- Verify `.env` configuration
- Ensure Excel file is not open
- Check file permissions in `data/` folder

## 📄 LICENSE

MIT License - Feel free to use for educational purposes.

---

**Built with excellence for CyberNova Series 2026**  
*Where Cyber Security Meets Innovation*
