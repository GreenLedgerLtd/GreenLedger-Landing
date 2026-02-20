import { google } from "googleapis";

// Initialize Google Sheets API client
export async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

// Append a row to a Google Sheet
export async function appendToSheet(
  spreadsheetId: string,
  range: string,
  values: (string | number | null)[][]
) {
  try {
    const sheets = await getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error appending to sheet:", error);
    throw error;
  }
}
