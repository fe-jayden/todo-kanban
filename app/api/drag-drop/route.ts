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
const reorderTaskId = async (
  rows: any[],
  result: {
    source: { index: number; droppableId: string };
    destination: { index: number; droppableId: string };
  }
) => {
  const newRows = [...rows];
  const rowToMove = newRows.splice(result.source.index, 1)[0];
  newRows.splice(result.destination.index, 0, rowToMove);

  const updateData = {
    range: `sheet_todo`,
    majorDimension: "ROWS",
    values: newRows,
  };

  sheets.spreadsheets.values.update({
    spreadsheetId: spreadsheetId,
    range: updateData.range,
    valueInputOption: "RAW",
    resource: updateData,
  });
};
const moveTaskId = async (result: {
  source: { index: number; droppableId: string };
  destination: { index: number; droppableId: string };
}) => {
  const range: Record<string, string> = {
    "column-todo": "sheet_todo",
    "column-done": "sheet_done",
  };

  const rowsSource = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: range[result.source.droppableId],
  });

  const rows = rowsSource.data.values || [];
  const newRows = [...rows];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${range[result.destination.droppableId]}!C2`,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        newRows
          .splice(result.source.index, 1)[0]
          ?.filter((item: string) => item !== ""),
      ],
    },
  });

  // const updateData = {
  //   range: range[result.source.droppableId],
  //   majorDimension: "ROWS",
  //   values: newRows?.splice(result.source.index, 1)[0],
  // };

  // await sheets.spreadsheets.values.update({
  //   spreadsheetId: spreadsheetId,
  //   range: updateData.range,
  //   valueInputOption: "RAW",
  //   resource: updateData,
  // });
};
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

    if (source.droppableId === destination.droppableId) {
      reorderTaskId(rows, {
        source: newSource,
        destination: newDestination,
      });
    } else {
      moveTaskId({
        source: newSource,
        destination: newDestination,
      });
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
