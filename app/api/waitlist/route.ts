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
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
