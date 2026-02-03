# 🚀 Quick Deployment Script for Vercel + Render

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CyberNova 2026 - Deployment Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git repository not initialized!" -ForegroundColor Red
    Write-Host "Run: git init" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git repository found" -ForegroundColor Green
Write-Host ""

# Build frontend
Write-Host "📦 Building frontend..." -ForegroundColor Yellow
Set-Location frontend
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..
Write-Host ""

# Instructions
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Push to GitHub:" -ForegroundColor Yellow
Write-Host "   git add ." -ForegroundColor White
Write-Host "   git commit -m 'Ready for deployment'" -ForegroundColor White
Write-Host "   git push origin main" -ForegroundColor White
Write-Host ""
Write-Host "2. Deploy Backend (Render):" -ForegroundColor Yellow
Write-Host "   - Go to: https://render.com" -ForegroundColor White
Write-Host "   - New Web Service → Connect GitHub" -ForegroundColor White
Write-Host "   - Root Directory: backend" -ForegroundColor White
Write-Host "   - Start Command: npm start" -ForegroundColor White
Write-Host ""
Write-Host "3. Deploy Frontend (Vercel):" -ForegroundColor Yellow
Write-Host "   - Go to: https://vercel.com" -ForegroundColor White
Write-Host "   - New Project → Import GitHub" -ForegroundColor White
Write-Host "   - Root Directory: frontend" -ForegroundColor White
Write-Host "   - Add env: VITE_API_URL=<your-render-url>" -ForegroundColor White
Write-Host ""
Write-Host "4. Update CORS:" -ForegroundColor Yellow
Write-Host "   - Add your Vercel URL to backend/.env" -ForegroundColor White
Write-Host "   - Redeploy backend" -ForegroundColor White
Write-Host ""
Write-Host "✨ Deployment guide: DEPLOYMENT.md" -ForegroundColor Green
Write-Host ""
