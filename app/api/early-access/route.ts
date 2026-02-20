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
      "", // Role
      "", // Country
      "Early Access Partner",
      "", // Message
    ];

    await appendToSheet(spreadsheetId, "Leads!A:H", [row]);

    return NextResponse.json({
      ok: true,
      message: "Thank you! We'll reach out with early access details.",
    });
  } catch (error) {
    console.error("Early access submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
