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
      "", // Name
      String(data.email || ""),
      "", // Company
      "", // Role
      "", // Country
      "Playbook Download",
      "", // Message
    ];

    await appendToSheet(spreadsheetId, "Leads!A:H", [row]);

    return NextResponse.json({
      ok: true,
      message: "You're on the list! We'll email you when the playbook launches.",
    });
  } catch (error) {
    console.error("Playbook submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
