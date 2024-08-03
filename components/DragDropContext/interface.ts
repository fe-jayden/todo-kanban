import { EDueDate, EPriority } from "@/common/enums";
import React from "react";

export interface IDataColumn {
  name: string;
  id: string;
  createTask: boolean;
  icon: React.JSX.Element;
  taskIds: IRequestTask[];
}
export interface IRequestTask {
  idtask?: string;
  name_task: string;
  assignee: string;
  has_due: boolean;
  date_due?: EDueDate | null;
  priority: EPriority;
  sortorder: string;
  column?: string;
}

export interface ITask {
  id: string;
  name: string;
  clientName: string;
  dueDate?: EDueDate | null;
  Priority: EPriority;
}
