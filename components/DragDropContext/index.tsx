"use client";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import * as S from "./styles";
import ColumnTask from "../ColumnTask";
import { TodoIcon } from "../icons/todo";
import { EDueDate, EPriority } from "@/common/enums";

const DragDropContextComponent = () => {
  const onDragEnd = () => {};

  const dummyTask = [
    {
      id: "1sd2s3dsfert3",
      name: "I am a task",
      clientName: "JayDen",
      dueDate: EDueDate.Fri,
      Priority: EPriority.High,
    },
    {
      id: "2sd2s3dsfert2",
      name: "Add T&G a task",
      clientName: "JayDen1",
      dueDate: EDueDate.Thu,
      Priority: EPriority.Low,
    },
    {
      id: "3sd2s3dsfert1",
      name: "Create sidebar navigation menu",
      clientName: "JayDen2",
      dueDate: EDueDate.Mon,
      Priority: EPriority.Medium,
    },
  ];
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.HeadingContainer>To-Do List Kanban</S.HeadingContainer>
      <ColumnTask
        iconColumn={<TodoIcon />}
        task={dummyTask}
        nameColumn="To-Do"
      />
    </DragDropContext>
  );
};

export default DragDropContextComponent;
