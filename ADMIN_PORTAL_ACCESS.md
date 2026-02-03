# 🔐 Admin Portal Access - Deployed Version

## 📍 How to Access Admin Portal After Deployment

### Step 1: Get Your Deployed Frontend URL

Depending on your hosting platform, your URL will be:

- **Vercel**: `https://your-app-name.vercel.app`
- **Netlify**: `https://your-app-name.netlify.app`
- **Custom Domain**: `https://yourdomain.com`
- **VPS**: `https://your-server-ip` or `https://yourdomain.com`

### Step 2: Navigate to Admin Route

Simply add `/admin` to your frontend URL:

```
https://your-app-name.vercel.app/admin
```

**Examples:**
- Vercel: `https://cybernova-2026.vercel.app/admin`
- Netlify: `https://cybernova-2026.netlify.app/admin`
- Custom Domain: `https://cybernova.yourdomain.com/admin`

### Step 3: Enter Admin Password

When the admin login page appears:
1. Enter your admin password: `cybernova2026` (or your custom password)
2. Click "UNLOCK DASHBOARD"
3. You'll see all registrations!

---

## 🔗 Complete URL Examples

### Local Development
```
Frontend: http://localhost:5173/admin
Password: cybernova2026
```

### Production (Vercel Example)
```
Frontend: https://cybernova-2026.vercel.app/admin
Password: cybernova2026
```

### Production (Custom Domain)
```
Frontend: https://events.yourschool.edu/admin
Password: cybernova2026
```

---

## 🔒 Security Best Practices

### ⚠️ IMPORTANT: Change Default Password!

Before deploying to production, **change the admin password** from the default `cybernova2026`:

#### 1. Update Backend Environment Variable

In your hosting platform (Render/Railway/VPS), set:
```env
ADMIN_KEY=your-new-secure-password-here
```

**Examples of strong passwords:**
- `CyberNova2026!SecureAdmin#2024`
- `CN2026_Admin_P@ssw0rd!`
- Use a password generator for maximum security

#### 2. Update Frontend Code

Edit `frontend/src/components/Admin.tsx`:

**Line 25** - Change verification password:
```typescript
if (accessKey === 'your-new-secure-password-here') {
```

**Line 39** - Change API header:
```typescript
'x-admin-key': 'your-new-secure-password-here'
```

#### 3. Redeploy Both Services

After changing the password:
- Redeploy your **backend** (Render/Railway will auto-deploy on env change)
- Redeploy your **frontend** (push changes to GitHub, Vercel/Netlify auto-deploys)

---

## 📱 Accessing Admin Portal on Mobile

The admin portal is fully responsive! Access it from:
- 📱 Mobile phones
- 💻 Tablets
- 🖥️ Desktop computers

Just navigate to: `https://your-app-url.com/admin`

---

## 🧪 Testing Admin Portal After Deployment

### Checklist:
- [ ] Navigate to `/admin` route
- [ ] Enter admin password
- [ ] Verify you can see the dashboard
- [ ] Check registration count is correct
- [ ] Test "Refresh Data" button
- [ ] Test "Download Excel" button
- [ ] Verify data downloads correctly

---

## 🚨 Troubleshooting

### "Unauthorized Access" Error
**Problem**: Wrong admin password
**Solution**: 
- Verify password matches in both backend `.env` and frontend `Admin.tsx`
- Check for typos or extra spaces
- Ensure environment variables are set in hosting platform

### "Failed to fetch data" Error
**Problem**: Backend not responding or CORS issue
**Solution**:
- Verify backend is running (check hosting platform dashboard)
- Check backend logs for errors
- Verify CORS settings allow your frontend URL
- Ensure `FRONTEND_URL` in backend matches your actual frontend URL

### Download Button Not Working
**Problem**: Backend URL incorrect or file doesn't exist
**Solution**:
- Check if `VITE_API_URL` is set correctly in frontend
- Verify backend has write permissions for data folder
- Check if Excel file exists in backend

### Admin Page Shows "No registrations found"
**Problem**: No data or backend connection issue
**Solution**:
- Submit a test registration first
- Check backend logs
- Verify API connection is working
- Test backend health endpoint: `https://your-backend-url.com/api/health`

---

## 🔗 Quick Links Reference

| Environment | Frontend URL | Admin URL | Backend API |
|-------------|-------------|-----------|-------------|
| **Local** | http://localhost:5173 | http://localhost:5173/admin | http://localhost:3001 |
| **Vercel + Render** | https://your-app.vercel.app | https://your-app.vercel.app/admin | https://your-app.onrender.com |
| **Netlify + Railway** | https://your-app.netlify.app | https://your-app.netlify.app/admin | https://your-app.railway.app |
| **Custom Domain** | https://yourdomain.com | https://yourdomain.com/admin | https://api.yourdomain.com |

---

## 📊 Admin Portal Features

Once logged in, you can:

✅ **View All Registrations**
- See complete list of all registered students
- Sorted by newest first
- Real-time count display

✅ **Refresh Data**
- Click refresh icon to get latest registrations
- Updates table without page reload

✅ **Download Excel**
- Export all registration data
- Downloads as `cybernova_registrations.xlsx`
- Contains all student information

✅ **Search & Filter** (Coming Soon)
- Filter by year, section
- Search by name or registration number

---

## 🎯 Pro Tips

1. **Bookmark the Admin URL** for quick access
2. **Share admin URL only with authorized personnel**
3. **Download data regularly** as backup
4. **Change password immediately** after first deployment
5. **Use incognito mode** when testing to avoid cache issues
6. **Check backend logs** if something doesn't work

---

## 📞 Need Help?

If you encounter issues accessing the admin portal after deployment, check:
1. Browser console for errors (F12)
2. Backend logs in your hosting platform
3. Network tab to see API requests
4. CORS configuration in backend

---

**Last Updated**: February 2026
**Admin Password**: `cybernova2026` (⚠️ Change this before production!)
