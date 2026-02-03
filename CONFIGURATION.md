# ⚙️ CONFIGURATION GUIDE

Complete reference for all configuration options in the CyberNova platform.

---

## 📁 CONFIGURATION FILES

The platform uses environment variables for configuration:

```
cybernova-2026/
├── .env                    # Frontend environment variables
├── .env.example            # Frontend template
├── backend/
│   ├── .env               # Backend environment variables
│   └── .env.example       # Backend template
```

---

## 🎨 FRONTEND CONFIGURATION

**File:** `.env` (in project root)

### Environment Variables

#### `VITE_API_URL`
- **Purpose:** Backend API base URL
- **Type:** String (URL)
- **Required:** No (has default)
- **Default:** `http://localhost:3001`

**Examples:**
```env
# Local development
VITE_API_URL=http://localhost:3001

# Production
VITE_API_URL=https://api.cybernova.yourdomain.com

# Custom port
VITE_API_URL=http://localhost:3002
```

**Usage in code:**
```javascript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

### Creating Frontend .env

```bash
# Copy template
cp .env.example .env

# Edit as needed
nano .env
```

### Frontend .env Template

```env
# Backend API URL
# For local development with backend running on port 3001
VITE_API_URL=http://localhost:3001

# For production, update to your deployed backend URL
# VITE_API_URL=https://api.cybernova.yourdomain.com
```

---

## 🔧 BACKEND CONFIGURATION

**File:** `backend/.env`

### Environment Variables

#### `PORT`
- **Purpose:** Port number for backend server
- **Type:** Number
- **Required:** No (has default)
- **Default:** `3001`
- **Valid Range:** 1024-65535

**Examples:**
```env
PORT=3001          # Default
PORT=3002          # Alternative port
PORT=8080          # Standard HTTP alt
```

**Usage:**
```javascript
const PORT = process.env.PORT || 3001;
app.listen(PORT);
```

---

#### `NODE_ENV`
- **Purpose:** Environment mode
- **Type:** String
- **Required:** No (has default)
- **Default:** `development`
- **Valid Values:** `development`, `production`, `test`

**Examples:**
```env
NODE_ENV=development   # Local development
NODE_ENV=production    # Production deployment
NODE_ENV=test          # Testing environment
```

**Effects:**
- **Development:** Verbose error messages, detailed logs
- **Production:** Sanitized errors, optimized logging

---

#### `FRONTEND_URL`
- **Purpose:** Allowed CORS origin (frontend URL)
- **Type:** String (URL)
- **Required:** Yes
- **Default:** `http://localhost:5173`

**Examples:**
```env
# Local development (Vite default)
FRONTEND_URL=http://localhost:5173

# Custom local port
FRONTEND_URL=http://localhost:5174

# Production
FRONTEND_URL=https://cybernova.yourdomain.com

# Multiple origins (requires code change)
# FRONTEND_URL=https://cybernova.com,https://www.cybernova.com
```

**Security Note:** 
- Only add trusted frontend URLs
- Wildcard (`*`) not recommended for production

---

#### `ADMIN_KEY`
- **Purpose:** Admin authentication key
- **Type:** String
- **Required:** Yes (for admin endpoints)
- **Default:** `cybernova2026` (CHANGE IN PRODUCTION!)
- **Min Length:** 16 characters (recommended)

**Examples:**
```env
# Development (insecure - DO NOT USE IN PRODUCTION)
ADMIN_KEY=cybernova2026

# Production (use strong random string)
ADMIN_KEY=7f9d2a1e5b3c8a6f4e2d9c1b8a5f3e7d

# Generate secure key (Linux/Mac)
# openssl rand -hex 32
ADMIN_KEY=generated_secure_random_string_here
```

**Usage:**
```bash
# Download Excel file
curl -H "x-admin-key: YOUR_ADMIN_KEY" \
  http://localhost:3001/api/admin/download
```

**Security:**
- **MUST change before production**
- Never commit to Git
- Store securely (password manager, secrets manager)
- Rotate periodically

---

### Creating Backend .env

```bash
# Navigate to backend
cd backend

# Copy template
cp .env.example .env

# Edit configuration
nano .env
```

### Backend .env Template

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Admin Access
# ⚠️ CHANGE THIS IN PRODUCTION!
ADMIN_KEY=cybernova2026_change_this_in_production
```

---

## 🌍 ENVIRONMENT-SPECIFIC CONFIGURATIONS

### Local Development

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:3001
```

**Backend `.env`:**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ADMIN_KEY=dev_key_not_for_production
```

### Staging/Testing

**Frontend `.env`:**
```env
VITE_API_URL=https://staging-api.cybernova.com
```

**Backend `.env`:**
```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://staging.cybernova.com
ADMIN_KEY=staging_secure_key_here
```

### Production

**Frontend `.env`:**
```env
VITE_API_URL=https://api.cybernova.com
```

**Backend `.env`:**
```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://cybernova.com
ADMIN_KEY=production_ultra_secure_key_here
```

---

## 🔒 SECURITY BEST PRACTICES

### DO:
✅ Use different keys for dev/staging/production  
✅ Keep `.env` files in `.gitignore`  
✅ Use strong, random admin keys (32+ chars)  
✅ Rotate admin keys periodically  
✅ Use HTTPS in production  
✅ Restrict CORS to specific domains  
✅ Use environment-specific configurations  

### DON'T:
❌ Commit `.env` files to Git  
❌ Share `.env` files publicly  
❌ Use weak admin keys  
❌ Use same keys across environments  
❌ Hardcode sensitive values in code  
❌ Allow CORS wildcard (`*`) in production  
❌ Expose admin keys in client-side code  

---

## 🔄 UPDATING CONFIGURATION

### When to Restart

**Must restart after changing:**
- Any `.env` variable
- Port numbers
- CORS settings
- Admin keys

**How to restart:**
```bash
# Stop server (Ctrl+C in terminal)
# Start server again
npm start
```

**For development (auto-restart):**
```bash
# Backend
cd backend
npm run dev  # Uses nodemon for auto-reload

# Frontend (Vite hot-reloads automatically)
npm run dev
```

---

## 🧪 VALIDATING CONFIGURATION

### Check Frontend Config

```bash
# In frontend directory
cat .env

# Verify API URL
echo $VITE_API_URL  # Linux/Mac
echo %VITE_API_URL%  # Windows
```

**Test:**
```javascript
// In browser console on your app
console.log(import.meta.env.VITE_API_URL);
```

### Check Backend Config

```bash
# In backend directory
cat .env

# Test server starts
npm start
```

**Verify logs show:**
```
Port: 3001
Environment: development
```

### Test CORS

```bash
# Should succeed
curl -H "Origin: http://localhost:5173" \
  http://localhost:3001/api/health

# Should fail (different origin)
curl -H "Origin: http://different-domain.com" \
  http://localhost:3001/api/health
```

---

## 🐛 TROUBLESHOOTING

### Problem: "Port already in use"

**Error:** `EADDRINUSE :::3001`

**Solution:**
```env
# Change PORT in backend/.env
PORT=3002

# Update VITE_API_URL in frontend/.env
VITE_API_URL=http://localhost:3002
```

### Problem: CORS errors

**Error:** "blocked by CORS policy"

**Check:**
1. `FRONTEND_URL` matches where frontend runs
2. No typos in URLs
3. Include `http://` or `https://`
4. Backend restarted after change

**Solution:**
```env
# Backend .env - ensure exact match
FRONTEND_URL=http://localhost:5173
```

### Problem: Admin download unauthorized

**Error:** 401 Unauthorized

**Check:**
1. Header name: `x-admin-key`
2. Key matches backend `.env`
3. No extra spaces in key

**Solution:**
```bash
# Verify key
cat backend/.env | grep ADMIN_KEY

# Test with correct key
curl -H "x-admin-key: cybernova2026" \
  http://localhost:3001/api/admin/download
```

### Problem: Environment variables not loading

**Frontend:**
```bash
# Vite requires VITE_ prefix
# ✅ Correct
VITE_API_URL=http://localhost:3001

# ❌ Wrong (won't work)
API_URL=http://localhost:3001
```

**Backend:**
```bash
# Ensure dotenv is loaded
# Should be at top of server.js
require('dotenv').config();
```

---

## 📝 CONFIGURATION CHECKLIST

### Development Setup
- [ ] Created `.env` in project root
- [ ] Created `backend/.env`
- [ ] Set `VITE_API_URL` to `http://localhost:3001`
- [ ] Set `PORT` to `3001`
- [ ] Set `NODE_ENV` to `development`
- [ ] Set `FRONTEND_URL` to `http://localhost:5173`
- [ ] Set temporary `ADMIN_KEY`
- [ ] Tested backend health endpoint
- [ ] Tested frontend can reach backend

### Production Deployment
- [ ] Updated `VITE_API_URL` to production API
- [ ] Set `NODE_ENV` to `production`
- [ ] Updated `FRONTEND_URL` to production domain
- [ ] Generated strong `ADMIN_KEY`
- [ ] Enabled HTTPS
- [ ] Restricted CORS properly
- [ ] Tested all endpoints
- [ ] Secured `.env` files
- [ ] Set up secrets management

---

## 🔐 GENERATING SECURE KEYS

### Linux/Mac
```bash
# 32-character hex string
openssl rand -hex 32

# UUID v4
uuidgen

# Random alphanumeric
cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1
```

### Windows (PowerShell)
```powershell
# Random string
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

### Online Generators
- https://randomkeygen.com/
- https://www.uuidgenerator.net/
- Password managers (1Password, LastPass, etc.)

**Example secure key:**
```env
ADMIN_KEY=7f9d2a1e5b3c8a6f4e2d9c1b8a5f3e7d9a2b4c6e8f1a3d5b7c9e2f4a6c8e1d3
```

---

## 📊 CONFIGURATION SUMMARY

| Variable | Location | Required | Default | Production Change |
|----------|----------|----------|---------|-------------------|
| `VITE_API_URL` | Frontend | No | `http://localhost:3001` | ✅ Yes |
| `PORT` | Backend | No | `3001` | Maybe |
| `NODE_ENV` | Backend | No | `development` | ✅ Yes |
| `FRONTEND_URL` | Backend | Yes | `http://localhost:5173` | ✅ Yes |
| `ADMIN_KEY` | Backend | Yes | `cybernova2026` | ⚠️ MUST CHANGE |

---

## 🎯 QUICK REFERENCE

### View Current Config
```bash
# Frontend
cat .env

# Backend
cat backend/.env
```

### Update Config
```bash
# Edit with nano
nano .env
nano backend/.env

# Or any text editor
code .env
vim .env
```

### Apply Changes
```bash
# Restart both servers
# Stop: Ctrl+C
# Start: npm start (backend) and npm run dev (frontend)
```

### Test Config
```bash
# Backend health
curl http://localhost:3001/api/health

# Frontend (in browser)
http://localhost:5173
```

---

## 💡 TIPS

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Document custom configs** - Comment your `.env` files
3. **Use `.env.example` as template** - Safe to commit
4. **Different keys per environment** - Dev/staging/prod
5. **Backup production keys** - Store in secrets manager
6. **Test after changes** - Restart and verify
7. **Monitor logs** - Check server startup messages

---

## 📞 NEED HELP?

1. **Check `.env.example` files** - Reference templates
2. **Verify spelling** - Case-sensitive, no typos
3. **Check quotes** - Usually not needed in `.env`
4. **Restart servers** - Changes require restart
5. **Check logs** - Startup messages show loaded config

---

**Configuration complete!** Your platform is ready to run with proper settings.

For deployment configuration, see `/README.md` deployment section.
