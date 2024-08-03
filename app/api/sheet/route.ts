import authClientJwt from "@/services/libs/jwt";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { google, sheets_v4 } from "googleapis";

const spreadsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const range = process.env.NEXT_PUBLIC_SHEET_RANGE;

const sheets: sheets_v4.Sheets = google.sheets({
  version: "v4",
  auth: authClientJwt,
});
function formatData(data: Record<string, any>[]) {
  const headers = data[0];

  const formattedData = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const formattedRow: any = {};
    for (let j = 2; j < headers.length; j++) {
      const field = headers[j].toLowerCase().replace(" ", "_");
      formattedRow[field] = row[j];
    }

    formattedData.push(formattedRow);
  }

  return formattedData;
}

export async function POST(req: NextRequest) {
  const { name_task, assignee, has_due, date_due, priority, sortorder } =
    await req.json();

  const taskId = uuidv4();
  try {
    const rawData = [
      taskId,
      name_task,
      assignee,
      has_due,
      ...(date_due ? [date_due] : [null]),
      priority,
      sortorder,
      "column-todo",
    ];
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
export async function GET() {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "sheet_todo",
    });
    if (res.data.values && res.data.values.length) {
      const rawData = [
        {
          name: "To-Do",
          id: "column-todo",
          taskIds: formatData(res.data.values).filter(
            (item) => item.column === "column-todo"
          ),
        },
        {
          name: "Done",
          id: "column-done",
          taskIds: formatData(res.data.values).filter(
            (item) => item.column === "column-done"
          ),
        },
      ];
      return Response.json({ data: rawData }, { status: 200 });
    } else {
      return Response.json({ data: [] }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error: "Error fetching data from Google Sheets" },
      { status: 500 }
    );
  }
}
