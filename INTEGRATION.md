# Integration Guide

This document details how the Frontend and Backend components communicate.

## Overview

The frontend (React) communicates with the backend (Express) via REST API calls. The primary interaction is the registration form submission.

## Configuration

1. **Frontend**:
   - `VITE_API_URL` environment variable controls the backend endpoint.
   - Defaults to `http://localhost:3001` if not set.

2. **Backend**:
   - `PORT`: Server port (default 3001).
   - `FRONTEND_URL`: CORS origin whitelist (default `http://localhost:5173`).

## Data Flow: Registration

1. **User Input**: User fills the form on `/registration`.
2. **Client Validation**: React validates inputs (regex, length).
3. **API Request**:
   - `POST /api/register`
   - Content-Type: `application/json`
   - Body: JSON object of form data.
4. **Server Processing**:
   - Server receives request.
   - Validates data against strict rules.
   - Checks for duplicates (Excel lookup).
   - Appends to `data/cybernova_registrations.xlsx`.
5. **Response**:
   - **Success (201)**: Registration saved. Frontend redirects to `/success`.
   - **Validation Error (400)**: Invalid data. Frontend handles error.
   - **Duplicate (409)**: Already registered. Frontend shows alert.
   - **Server Error (500)**: Internal issue. Frontend shows exact error if available or generic message.

## Troubleshooting Connection

- **CORS Error**: Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL.
- **Network Error**: Ensure backend is running (`npm start` in `backend/`).
- **Validation Error**: Check if your inputs meet the criteria in `TESTING_GUIDE.md`.
