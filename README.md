# CyberNova Series 2026 - Event Registration Platform

A production-grade full-stack event registration platform for the **CyberNova Series 2026** cybersecurity workshop and competitive series. Built with React (Frontend) and Node.js (Backend) with Excel-based persistence.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm

### 1. Backend Setup
```bash
cd backend
npm install
npm run start
```
Server runs on `http://localhost:3001`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:5173`.

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Framer Motion
- **Icons**: Lucide React
- **Design**: Retro-futuristic (Black/Cyan/Neon)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Persistence**: ExcelJS (Stores data in `.xlsx` file)
- **Validation**: Strict server-side validation
- **Security**: CORS, Input Sanitization

## 📂 Project Structure
```
cybernova-2026/
├── frontend/             # React Application
│   ├── src/
│   │   ├── components/   # Page Components (Landing, Registration, etc.)
│   │   └── App.tsx       # Main Router
│   └── vite.config.ts    # Vite Configuration
├── backend/              # Node.js API
│   ├── data/             # Excel Data Storage
│   ├── server.js         # API Implementation
│   └── package.json
└── README.md             # This file
```

## 🔌 API Endpoints

- `POST /api/register`: Submit registration form.
  - Body: `{ fullName, registrationNumber, email, year, section, mobile, whatsappJoined }`
- `GET /api/health`: Check server status.
- `GET /api/admin/download`: Download Excel sheet (Requires `x-admin-key`).

## 🎨 Design System

- **Colors**: Black (`#000000`) background, Cyan (`#00FFFF`) accents.
- **Typography**: High-contrast, bold, system fonts.
- **Animations**: Staggered fade-ins, motion blurring.

## 🛠️ Testing

Refer to [TESTING_GUIDE.md](./TESTING_GUIDE.md) for detailed testing scenarios.

## 📦 Deployment

1. **Backend**: Deploy to any Node.js host (Render, Railway, DigitalOcean). Ensure `data/` folder is persistent if ephemeral storage is not used (or switch to database for scale).
2. **Frontend**: Build with `npm run build` and deploy to Vercel/Netlify.
