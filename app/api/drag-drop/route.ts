import { EHeaderGGSheet } from "@/common/enums";
import { formatDataSheet } from "@/common/until/sheet";
import authClientJwt from "@/services/libs/jwt";
import { google, sheets_v4 } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const sheets: sheets_v4.Sheets = google.sheets({
  version: "v4",
  auth: authClientJwt,
});
const spreadsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID;

export async function POST(req: NextRequest) {
  const { source, destination } = await req.json();
  const newSource = { ...source, index: source.index + 1 };
  const newDestination = { ...destination, index: destination.index + 1 };

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "sheet_todo",
  });

  try {
    const rows = res.data.values || [];
    const headerRow = rows?.[0];
    const taskIndexCol = headerRow?.indexOf(EHeaderGGSheet.taskIndex);
    const ColumnCol = headerRow?.indexOf(EHeaderGGSheet.column);

    if (taskIndexCol === -1) {
      return NextResponse.json(
        { message: "ask Index column not found" },
        { status: 400 }
      );
    }
    let row1 = -1;
    let row2 = -1;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][taskIndexCol] == newSource.index) {
        row1 = i + 1;
      }
      if (rows[i][taskIndexCol] == newDestination.index) {
        row2 = i + 1;
      }
      if (row1 !== -1 && row2 !== -1) break;
    }

    if (row1 === -1 || row2 === -1) {
      return NextResponse.json(
        { message: "One or both Task Index not found" },
        { status: 400 }
      );
    }

    const alphabetTaskIndex = String.fromCharCode(65 + taskIndexCol);

    const row1ValuesTaskIndex = rows[row1 - 1].slice(taskIndexCol);
    const row2ValuesTaskIndex = rows[row2 - 1].slice(taskIndexCol);

    if (source.droppableId === destination.droppableId) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: `sheet_todo!${alphabetTaskIndex}${row1}`,
        valueInputOption: "RAW",
        requestBody: {
          values: [row2ValuesTaskIndex],
        },
      });

      await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: `sheet_todo!${alphabetTaskIndex}${row2}`,
        valueInputOption: "RAW",
        requestBody: {
          values: [row1ValuesTaskIndex],
        },
      });
    } else {
      const alphabetColumn = String.fromCharCode(65 + ColumnCol);
      const row1ValuesColumn = rows[row1 - 1].slice(ColumnCol);
      const row2ValuesColumn = rows[row2 - 1].slice(ColumnCol);
      console.log(`sheet_todo!${alphabetColumn}${row1}`);
      console.log(row1ValuesColumn);
    }

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
