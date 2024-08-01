"use client";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import * as S from "./styles";
import ColumnTask from "../ColumnTask";
import { TodoIcon } from "../icons/todo";
import { EDueDate, EPriority } from "@/common/enums";
import { DoneIcon } from "../icons/done";

const DragDropContextComponent = () => {
  const onDragEnd = () => {};

  const dummyTask = [
    {
      id: "1",
      name: "I am a task",
      clientName: "JayDen",
      dueDate: EDueDate.Fri,
      Priority: EPriority.High,
    },
    {
      id: "2",
      name: "Add T&G a task",
      clientName: "JayDen1",
      dueDate: EDueDate.Thu,
      Priority: EPriority.Low,
    },
    {
      id: "3",
      name: "Create sidebar navigation menu",
      clientName: "JayDen2",
      dueDate: EDueDate.Mon,
      Priority: EPriority.Medium,
    },

    {
      id: "4",
      name: "Create  menu",
      clientName: "JayDen2",
      dueDate: null,
      Priority: EPriority.Medium,
    },
  ];
  const columns = [
    {
      name: "To-Do",
      id: "column-todo",
      icon: <TodoIcon />,
      taskIds: [1, 2, 3, 4],
    },
    { name: "Done", id: "column-done", icon: <DoneIcon />, taskIds: [] },
  ];
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.HeadingContainer>To-Do List Kanban</S.HeadingContainer>
      <S.ColumnTask>
        {columns.map((column) => {
          const tasks = column.taskIds.map((taskId) => dummyTask[taskId]);
          console.log(tasks);
          return (
            <ColumnTask
              key={column.id}
              iconColumn={column.icon}
              task={dummyTask}
              nameColumn={column.name}
            />
          );
        })}
      </S.ColumnTask>
    </DragDropContext>
  );
};

export default DragDropContextComponent;
