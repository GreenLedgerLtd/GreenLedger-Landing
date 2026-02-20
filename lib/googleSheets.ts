import { google } from "googleapis";

// Initialize Google Sheets API client
export async function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL environment variable is not set");
  }
  if (!privateKey) {
    throw new Error("GOOGLE_PRIVATE_KEY environment variable is not set");
  }

  // Handle private key formatting
  let formattedKey = privateKey;
  // Remove surrounding quotes if present
  if (
    (formattedKey.startsWith('"') && formattedKey.endsWith('"')) ||
    (formattedKey.startsWith("'") && formattedKey.endsWith("'"))
  ) {
    formattedKey = formattedKey.slice(1, -1);
  }
  // Replace \n with actual newlines
  formattedKey = formattedKey.replace(/\\n/g, "\n");

  // Validate key format
  if (!formattedKey.includes("BEGIN PRIVATE KEY")) {
    throw new Error("GOOGLE_PRIVATE_KEY appears to be invalid (missing BEGIN PRIVATE KEY)");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: formattedKey,
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
