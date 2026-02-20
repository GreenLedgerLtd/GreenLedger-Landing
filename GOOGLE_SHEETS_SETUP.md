# Google Sheets Integration Setup Guide

This guide will walk you through setting up Google Sheets API to capture all form submissions from your GreenLedger landing page.

## Overview

All form submissions (Waitlist, Partner Bank, Book a Call, Playbook, Early Access) will be automatically saved to a Google Sheet. Each submission creates a new row with:
- Timestamp
- Name
- Email
- Company/Institution
- Role
- Country
- Form Type (Waitlist, Partner Bank, etc.)
- Message (if applicable)

---

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown at the top
3. Click **"New Project"**
4. Enter project name: `GreenLedger Forms` (or any name you prefer)
5. Click **"Create"**
6. Wait for the project to be created, then select it from the dropdown

---

## Step 2: Enable Google Sheets API

1. In your Google Cloud project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Sheets API"**
3. Click on **"Google Sheets API"**
4. Click **"Enable"**
5. Wait for it to enable (usually takes a few seconds)

---

## Step 3: Create a Service Account

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"Service account"**
4. Fill in:
   - **Service account name**: `greenledger-forms` (or any name)
   - **Service account ID**: Will auto-fill (you can change it)
   - **Description**: `Service account for GreenLedger form submissions`
5. Click **"Create and Continue"**
6. Skip the optional steps (Grant access, Grant users access) and click **"Done"**

---

## Step 4: Create and Download Service Account Key

1. In the **"Credentials"** page, find your newly created service account
2. Click on the service account email (it will look like `greenledger-forms@your-project-id.iam.gserviceaccount.com`)
3. Go to the **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Select **"JSON"** format
6. Click **"Create"**
7. A JSON file will automatically download — **save this file securely!** You'll need it in the next step.

**Important:** Keep this JSON file private. It contains credentials that allow access to your Google Sheets.

---

## Step 5: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet (or use an existing one)
3. Name it something like **"GreenLedger Leads"** or **"GreenLedger Form Submissions"**
4. In the first row (Row 1), add these column headers:
   ```
   A: Timestamp
   B: Name
   C: Email
   D: Company/Institution
   E: Role
   F: Country
   G: Form Type
   H: Message
   ```
5. Optionally format Row 1 as a header (bold, background color, etc.)

---

## Step 6: Share Sheet with Service Account

1. In your Google Sheet, click the **"Share"** button (top right)
2. Copy the **service account email** from Step 3 (it looks like `greenledger-forms@your-project-id.iam.gserviceaccount.com`)
3. Paste it into the "Add people and groups" field
4. Make sure the permission is set to **"Editor"**
5. **Uncheck** "Notify people" (service accounts don't need notifications)
6. Click **"Share"**

---

## Step 7: Get Your Sheet ID

1. Open your Google Sheet
2. Look at the URL in your browser. It will look like:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```
3. Copy the **YOUR_SHEET_ID_HERE** part (the long string between `/d/` and `/edit`)
4. Save this ID — you'll need it in the next step

Example: If your URL is:
```
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p/edit
```
Then your Sheet ID is: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p`

---

## Step 8: Add Credentials to Your Project

1. Open the JSON file you downloaded in Step 4
2. Find these values in the JSON:
   - `client_email` (looks like `greenledger-forms@your-project-id.iam.gserviceaccount.com`)
   - `private_key` (a long string starting with `-----BEGIN PRIVATE KEY-----`)

3. Open your project's `.env` file (create it if it doesn't exist in the root directory)

4. Add these environment variables:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email_here
GOOGLE_PRIVATE_KEY="your_private_key_here"
```

**Important Notes:**
- Replace `your_sheet_id_here` with the Sheet ID from Step 7
- Replace `your_service_account_email_here` with the `client_email` from the JSON
- Replace `your_private_key_here` with the `private_key` from the JSON
- The `GOOGLE_PRIVATE_KEY` must be wrapped in quotes and include the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- If your private key has `\n` characters, keep them as-is (they'll be converted automatically)

**Example `.env` file:**
```env
GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
GOOGLE_SERVICE_ACCOUNT_EMAIL=greenledger-forms@your-project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

---

## Step 9: Update .gitignore (Important!)

Make sure your `.env` file is not committed to git:

1. Check if `.gitignore` exists in your project root
2. If it doesn't exist, create it
3. Make sure `.env` is listed in `.gitignore`:

```
.env
.env.local
.env*.local
```

---

## Step 10: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to your website and submit a test form (e.g., "Join Waitlist")

3. Check your Google Sheet — you should see a new row appear with the submission data!

4. If it works, you're all set! 🎉

---

## Troubleshooting

### Error: "Google Sheet ID not configured"
- Make sure your `.env` file exists and has `GOOGLE_SHEET_ID` set
- Restart your dev server after adding environment variables

### Error: "The caller does not have permission"
- Make sure you shared the Google Sheet with the service account email (Step 6)
- Double-check that the service account email in `.env` matches the one you shared with

### Error: "Invalid credentials"
- Verify your `GOOGLE_SERVICE_ACCOUNT_EMAIL` matches the `client_email` in the JSON file
- Make sure `GOOGLE_PRIVATE_KEY` includes the full key with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Ensure the private key is wrapped in quotes in your `.env` file

### Forms submit but nothing appears in the sheet
- Check your browser's developer console (F12) for errors
- Check your terminal/server logs for API errors
- Verify the sheet name is exactly "Leads" (case-sensitive) or update the range in the API routes
- Make sure the sheet has the correct column headers in Row 1

### Private key formatting issues
If you're having trouble with the private key, try:
- Keep the `\n` characters as literal `\n` (not actual newlines)
- Wrap the entire key in double quotes
- The code automatically converts `\n` to actual newlines

---

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add the same environment variables to your hosting platform's settings:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`

2. In Vercel:
   - Go to your project → Settings → Environment Variables
   - Add each variable
   - Redeploy your site

3. In Netlify:
   - Go to Site settings → Environment variables
   - Add each variable
   - Redeploy

---

## Security Best Practices

1. **Never commit your `.env` file** to git
2. **Never share your service account JSON file** publicly
3. **Limit the service account's access** — only share the specific sheet it needs, not your entire Google Drive
4. **Rotate credentials** if they're ever exposed
5. **Use environment variables** in production, never hardcode credentials

---

## What Gets Saved?

Each form submission creates a row with:

| Column | Description | Example |
|--------|-------------|---------|
| A: Timestamp | ISO timestamp of submission | `2026-02-19T16:30:00.000Z` |
| B: Name | User's name | `John Doe` |
| C: Email | User's email | `john@example.com` |
| D: Company/Institution | Company or bank name | `ABC Bank` |
| E: Role | User's role | `ESG Lead` |
| F: Country | User's country | `Kenya` |
| G: Form Type | Which form was submitted | `Waitlist`, `Partner Bank`, `Book a Call`, etc. |
| H: Message | Additional message (if provided) | `Interested in green projects` |

---

## Need Help?

If you run into issues:
1. Check the troubleshooting section above
2. Verify all steps were completed correctly
3. Check server logs for detailed error messages
4. Make sure your Google Cloud project has billing enabled (free tier is usually sufficient)

---

## Next Steps

Once everything is working:
- Set up email notifications (optional) using Google Apps Script
- Create filters/views in Google Sheets to organize leads by type
- Set up automated follow-up workflows
- Consider adding more columns for tracking (status, notes, follow-up dates, etc.)
