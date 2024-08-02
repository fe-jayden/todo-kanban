import { EDueDate, EPriority } from "@/common/enums";
import React from "react";

export interface IDataColumn {
  name: string;
  id: string;
  createTask: boolean;
  icon: React.JSX.Element;
  taskIds: ITask[];
}

export interface ITask {
  id: string;
  name: string;
  clientName: string;
  dueDate?: EDueDate | null;
  Priority: EPriority;
}
