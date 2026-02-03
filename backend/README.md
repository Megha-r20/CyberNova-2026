# CyberNova 2026 Backend

Enterprise-grade backend API for CyberNova Series 2026 registration system with Excel persistence.

## Features
- **Concurrent Requests**: Handles multiple registrations safely using retry logic.
- **Excel Persistence**: Data stored in `data/cybernova_registrations.xlsx`.
- **Validation**: Strict validation for all fields.
- **Duplicate Prevention**: Checks Email, Registration Number, and Mobile.
- **Security**: Admin key protection for downloads, CORS whitelist.

## Project Structure
- `server.js`: Main entry point.
- `data/`: Directory for Excel files.

## Quick Start
```bash
npm install
npm run dev
```

## API Endpoints

### POST /api/register
Register a team.
**Body:**
```json
{
  "fullName": "Name",
  "registrationNumber": "123",
  "email": "test@edu.in",
  "year": "2nd Year",
  "section": "A",
  "mobile": "9876543210",
  "whatsappJoined": "Yes"
}
```

### GET /api/admin/download
Download the Excel file.
**Key**: `x-admin-key: cybernova2026`

## Validation Rules
| Field | Rule |
|-------|------|
| Full Name | Min 3 chars |
| Reg No | Alphanumeric |
| Email | .edu or 'college' in domain |
| Mobile | 10 digits |

## Excel Structure
Columns:
1. Full Name
2. Registration Number
3. College Email
4. Year of Study
5. Section
6. Mobile Number
7. WhatsApp Joined
8. Timestamp
