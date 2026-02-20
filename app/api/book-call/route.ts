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
      "", // Company
      "", // Role
      "", // Country
      "Book a Call",
      String(data.message || ""),
    ];

    await appendToSheet(spreadsheetId, "Leads!A:H", [row]);

    return NextResponse.json({
      ok: true,
      message: "Request received! We'll be in touch shortly.",
    });
  } catch (error) {
    console.error("Book call submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
