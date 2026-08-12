const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

/**
 * Syncs an enquiry row to the configured Google Sheet.
 * Requires credentials.json and GOOGLE_SHEET_ID env var to be set.
 */
async function syncEnquiryToSheets(enquiry) {
  const sheetId = process.env.GOOGLE_SHEET_ID || '';

  if (!sheetId || !fs.existsSync(CREDENTIALS_PATH)) {
    console.log('[Sheets] credentials.json not found or GOOGLE_SHEET_ID not set — skipping sync.');
    return false;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
      ],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Append row: Name, Email, Phone, Subject, Message, Submitted At
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          enquiry.name,
          enquiry.email,
          enquiry.phone || '',
          enquiry.subject || '',
          enquiry.message,
          enquiry.created_at,
        ]],
      },
    });

    // Mark as synced in DB
    db.prepare('UPDATE enquiries SET synced_to_sheets = 1 WHERE id = ?').run(enquiry.id);
    console.log(`[Sheets] Synced enquiry #${enquiry.id} (${enquiry.name})`);
    return true;
  } catch (err) {
    console.error('[Sheets] Sync failed:', err.message);
    return false;
  }
}

module.exports = { syncEnquiryToSheets };
