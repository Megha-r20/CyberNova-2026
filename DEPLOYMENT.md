# 🚀 CyberNova 2026 - Deployment Guide

## Overview

This guide will help you deploy your CyberNova 2026 registration system to production. The application consists of:
- **Frontend**: React + Vite (Static Site)
- **Backend**: Node.js + Express API
- **Database**: Excel file storage (ExcelJS)

---

## 📋 Pre-Deployment Checklist

- [ ] Test the application locally
- [ ] Ensure all registrations are working
- [ ] Test admin portal access
- [ ] Backup any existing registration data
- [ ] Choose your hosting platform
- [ ] Prepare environment variables

---


## 🌐 Recommended Deployment Options

### Option 1: **Vercel (Frontend) + Render (Backend)** ⭐ RECOMMENDED

**Best for**: Quick deployment, free tier available, easy setup

#### Frontend (Vercel)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variable:
   - `VITE_API_URL`: (Your backend URL from Render)
7. Deploy!

#### Backend (Render)
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `cybernova-backend`
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=3001
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ADMIN_KEY=cybernova2026
   ```
6. Deploy!

**Cost**: Free tier available for both

---

### Option 2: **Netlify (Frontend) + Railway (Backend)**

**Best for**: Alternative to Vercel/Render with similar features

#### Frontend (Netlify)
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add Environment Variable:
   - `VITE_API_URL`: (Your Railway backend URL)
6. Deploy!

#### Backend (Railway)
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
5. Add Environment Variables (same as Render)
6. Deploy!

**Cost**: Free tier available

---

### Option 3: **Single Server Deployment (VPS)**

**Best for**: Full control, custom domain, production-grade

Platforms: DigitalOcean, AWS EC2, Linode, Vultr

#### Steps:
1. **Provision a server** (Ubuntu 22.04 recommended)
2. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. **Install PM2** (Process Manager):
   ```bash
   sudo npm install -g pm2
   ```
4. **Clone your repository**:
   ```bash
   git clone https://github.com/yourusername/cybernova-2026.git
   cd cybernova-2026
   ```
5. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create .env file with production values
   pm2 start server.js --name cybernova-backend
   ```
6. **Setup Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run build
   ```
7. **Install Nginx**:
   ```bash
   sudo apt install nginx
   ```
8. **Configure Nginx** (see nginx config below)
9. **Setup SSL** with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

**Cost**: $5-10/month

---

## 🔧 Configuration Files

### Frontend Environment Variables

Create `.env.production` in `frontend/`:
```env
VITE_API_URL=https://your-backend-url.com
```

### Backend Environment Variables

Update `backend/.env` for production:
```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-frontend-url.com
ADMIN_KEY=your-secure-admin-key-here
```

### Nginx Configuration (VPS Option)

Create `/etc/nginx/sites-available/cybernova`:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /var/www/cybernova/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/cybernova /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📦 Data Persistence

### Important: Excel File Storage

Your registration data is stored in `backend/data/cybernova_registrations.xlsx`. 

**For cloud deployments (Vercel/Render/Railway):**
- ⚠️ **Warning**: These platforms have ephemeral file systems. Your Excel file will be lost on redeployment!
- **Solution Options**:
  1. **Use a database** (PostgreSQL, MongoDB) - Recommended for production
  2. **Use cloud storage** (AWS S3, Google Cloud Storage)
  3. **Regular backups** via the admin download feature
  4. **Use persistent volumes** (available on Railway/Render paid plans)

**For VPS deployments:**
- Files persist automatically
- Set up regular backups using cron jobs

### Migrating to Database (Recommended for Production)

If you need help migrating from Excel to a proper database (PostgreSQL/MongoDB), I can help you with that!

---

## 🔒 Security Checklist

- [ ] Change `ADMIN_KEY` to a strong, unique password
- [ ] Enable HTTPS/SSL certificates
- [ ] Update CORS settings in backend to only allow your frontend domain
- [ ] Set `NODE_ENV=production` in backend
- [ ] Remove any console.log statements with sensitive data
- [ ] Add rate limiting to prevent abuse
- [ ] Regular backups of registration data

---

## 🧪 Testing Deployment

After deployment, test these:

1. **Frontend loads**: Visit your frontend URL
2. **Registration works**: Submit a test registration
3. **Admin portal**: Access `/admin` with your admin key
4. **Data download**: Download Excel file from admin portal
5. **CORS**: Ensure frontend can communicate with backend

---

## 📊 Monitoring & Maintenance

### Recommended Tools:
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Plausible

### Regular Tasks:
- Download registration data weekly
- Monitor server logs
- Check disk space (VPS)
- Update dependencies monthly

---

## 🆘 Troubleshooting

### Common Issues:

**Frontend can't connect to backend**
- Check CORS settings in `backend/server.js`
- Verify `VITE_API_URL` environment variable
- Ensure backend is running and accessible

**Admin download not working**
- Check if Excel file exists in `backend/data/`
- Verify admin key is correct
- Check backend logs for errors

**Registrations not saving**
- Check backend logs
- Verify write permissions on `backend/data/` directory
- Ensure Excel file is not corrupted

---

## 📞 Need Help?

If you need assistance with:
- Database migration
- Custom domain setup
- SSL certificate configuration
- Performance optimization
- Scaling for high traffic

Just ask! I'm here to help. 🚀

---

## 🎯 Quick Start Commands

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend (no build needed)
cd backend
npm start
```

### Test Production Build Locally
```bash
# Frontend
cd frontend
npm run preview

# Backend
cd backend
NODE_ENV=production npm start
```

---

**Last Updated**: February 2026
**Version**: 1.0.0
