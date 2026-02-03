# Testing Guide

## 1. Prerequisites

- Ensure Backend is running: `cd backend && npm run dev`
- Ensure Frontend is running: `cd frontend && npm run dev`

## 2. Test Scenarios

### A. Successful Registration
1. Navigate to `/registration`.
2. Enter valid data:
   - Name: "Test User"
   - Reg No: "9922001122"
   - Email: "test@college.edu"
   - Year: "3rd Year"
   - Section: "A"
   - Mobile: "9876543210"
   - WhatsApp: "Yes"
3. Click Submit.
4. **Expected**: Redirect to `/success` page with "Your Submission" details populated.
5. **Verify**: Check `backend/data/cybernova_registrations.xlsx`. A new row should appear.

### B. Validation Errors
1. Navigate to `/registration`.
2. Enter invalid data:
   - Mobile: "123" (Too short)
   - Email: "invalid-email" (No @ or domain)
3. Click Submit.
4. **Expected**: Button disabled (if client validation works) or Red error alerts on fields.

### C. Duplicate Registration
1. Refresh `/registration`.
2. Enter the SAME details as Scenario A.
3. Click Submit.
4. **Expected**: Red alert box at the top saying "Duplicate registration found...".

### D. Navigation
1. Click "Home" icon. **Expected**: Navigate to `/`.
2. Click "Explore Event". **Expected**: Navigate to `/event-details`.
3. Click "Register Now". **Expected**: Navigate to `/registration`.

## 3. API Testing (cURL)

**Health Check:**
```bash
curl http://localhost:3001/api/health
```

**Register User:**
```bash
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"API Test","registrationNumber":"API123","email":"test@api.edu","year":"2nd Year","section":"B","mobile":"9998887776","whatsappJoined":"No"}'
```
