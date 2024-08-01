"use client";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import * as S from "./styles";
import ColumnTask from "../ColumnTask";
import { TodoIcon } from "../icons/todo";

const DragDropContextComponent = () => {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.HeadingContainer>To-Do List Kanban</S.HeadingContainer>
      <ColumnTask iconColumn={<TodoIcon />} nameColumn="To-Do" />
    </DragDropContext>
  );
};

export default DragDropContextComponent;
