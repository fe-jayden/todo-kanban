import { IRequestTask } from "@/components/DragDropContext/interface";
import { DropResult } from "react-beautiful-dnd";


const RequestHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const serverApi = "http://" + process.env.NEXT_PUBLIC_SERVER_API;

export enum SHEET_ENDPOINT {
  GET_LIST = "api/sheet",
  CREATE_TASK = "api/sheet",
  DRAG_DROP_TASK = "api/drag-drop",
}

export const SheetApi = {
  getListData: async () => {
    const res = await fetch(`${serverApi}/${SHEET_ENDPOINT.GET_LIST}`, {
      method: "GET",
      headers: RequestHeader,
    });
    const data = await res.json();
    return data;
  },
  createTask: async (data: IRequestTask) => {
    await fetch(`${serverApi}/${SHEET_ENDPOINT.CREATE_TASK}`, {
      method: "POST",
      headers: RequestHeader,
      body: JSON.stringify(data),
    });
  },
  dragDrop: async (result: DropResult) => {
    const { source, destination } = result;
    await fetch(`${serverApi}/${SHEET_ENDPOINT.DRAG_DROP_TASK}`, {
      method: "POST",
      headers: RequestHeader,
      body: JSON.stringify({ source, destination }),
    });
  },
};
