import { NextRequest, NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googleSheets";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      return NextResponse.json(
        { error: "Google Sheet ID not configured" },
        { status: 500 }
      );
    }

    const timestamp = new Date().toISOString();
    const row = [
      String(timestamp),
      String(data.name || ""),
      String(data.email || ""),
      String(data.company || ""),
      String(data.role || ""),
      String(data.country || ""),
      "Waitlist",
      "", // Message column
    ];

    await appendToSheet(spreadsheetId, "Leads!A:H", [row]);

    return NextResponse.json({
      ok: true,
      message: "Thank you for joining the waitlist!",
    });
  } catch (error) {
    console.error("Waitlist submission error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = error instanceof Error ? error.stack : undefined;
    
    // Log full error for debugging
    console.error("Full error details:", {
      message: errorMessage,
      details: errorDetails,
      env: {
        hasSheetId: !!process.env.GOOGLE_SHEET_ID,
        hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        hasKey: !!process.env.GOOGLE_PRIVATE_KEY,
      },
    });

    return NextResponse.json(
      {
        ok: false,
        error: "Failed to submit form",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
