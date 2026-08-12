import gspread
from google.oauth2.service_account import Credentials
import os
from django.conf import settings

def sync_enquiry_to_sheets(enquiry):
    """
    Syncs the given enquiry to a Google Sheet.
    Requires GOOGLE_SHEETS_CREDENTIALS_FILE and GOOGLE_SHEET_ID in settings.
    """
    credentials_path = getattr(settings, 'GOOGLE_SHEETS_CREDENTIALS_FILE', None)
    sheet_id = getattr(settings, 'GOOGLE_SHEET_ID', None)
    
    if not credentials_path or not sheet_id or not os.path.exists(credentials_path):
        print("Google Sheets credentials or Sheet ID not configured. Skipping sync.")
        return False
        
    try:
        scopes = [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive'
        ]
        
        creds = Credentials.from_service_account_file(credentials_path, scopes=scopes)
        client = gspread.authorize(creds)
        
        sheet = client.open_by_key(sheet_id).sheet1
        
        row = [
            enquiry.name,
            enquiry.email,
            enquiry.phone,
            enquiry.subject,
            enquiry.message,
            enquiry.created_at.strftime("%Y-%m-%d %H:%M:%S")
        ]
        
        sheet.append_row(row)
        
        enquiry.synced_to_sheets = True
        enquiry.save()
        return True
    except Exception as e:
        print(f"Google Sheets sync failed: {e}")
        return False
