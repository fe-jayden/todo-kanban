import authClientJwt from "@/services/libs/jwt";
import { NextRequest, NextResponse } from "next/server";
import { google, sheets_v4 } from "googleapis";

const spreadsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const range = process.env.NEXT_PUBLIC_SHEET_RANGE;

const sheets: sheets_v4.Sheets = google.sheets({
  version: "v4",
  auth: authClientJwt,
});

export async function POST(req: NextRequest) {
  const { name, email, phone, company, type } = await req.json();
  try {
    const rawData = [
      name,
      email,
      ...(phone ? [phone] : [null]),
      ...(company ? [company] : [null]),
      type,
    ];
    console.log(spreadsheetId, range);
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [rawData],
      },
    });

    return NextResponse.json(
      { message: "Data saved successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error", error: error.message },
      { status: 500 }
    );
  }
}
