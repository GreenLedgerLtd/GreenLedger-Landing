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
      String(data.institution || ""),
      String(data.role || ""),
      String(data.country || ""),
      "Partner Bank",
      String(data.message || ""),
    ];

    await appendToSheet(spreadsheetId, "Leads!A:H", [row]);

    return NextResponse.json({
      ok: true,
      message: "Thank you! We will be in touch soon.",
    });
  } catch (error) {
    console.error("Partner bank submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
