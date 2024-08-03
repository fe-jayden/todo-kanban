"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import * as S from "./styles";
import { TodoIcon } from "../icons/todo";
import { EDueDate, EPriority } from "@/common/enums";
import { DoneIcon } from "../icons/done";
import dynamic from "next/dynamic";
import FormCreateTask from "../FormCreateTask";

const ColumnTask = dynamic(() => import("../ColumnTask"), { ssr: false });

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
const initData = [
  {
    name: "To-Do",
    id: "column-todo",
    createTask: true,
    icon: <TodoIcon />,
    taskIds: [...dummyTask],
  },
  {
    name: "Done",
    id: "column-done",
    createTask: false,
    icon: <DoneIcon />,
    taskIds: [],
  },
];

const DragDropContextComponent = () => {
  const [dataColumn, setDataColumn] = useState(initData);
  const [isCreateTask, setIsCreateTask] = useState<boolean>(false);

  const reorderColumnList = (result: DropResult) => {
    const { source, destination } = result;

    const column = dataColumn.find(({ id }) => id === source.droppableId);
    if (!column) return null;

    const taskIds = [...column.taskIds];
    const [moved] = taskIds.splice(source.index, 1);
    taskIds.splice(destination?.index ?? 0, 0, moved);

    return { ...column, taskIds };
  };
  const moveColumnList = (result: DropResult) => {
    const { source, destination } = result;
    const columnSource = dataColumn.find(({ id }) => id === source.droppableId);
    const [moved] = columnSource
      ? columnSource.taskIds.splice(source.index, 1)
      : [];

    const columnDestination = dataColumn.find(
      ({ id }) => id === destination?.droppableId
    );

    const taskColumnDestination = [...(columnDestination?.taskIds || [])];
    taskColumnDestination.splice(destination?.index ?? 0, 0, moved);
    return { ...columnDestination, taskIds: taskColumnDestination };
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return null;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const newColumn = reorderColumnList(result);
      if (newColumn) {
        setDataColumn(
          dataColumn.map((item) =>
            item.id === newColumn.id ? newColumn : item
          )
        );
      }
      return null;
    }
    const newColumn: any = moveColumnList(result);
    if (newColumn && dataColumn) {
      setDataColumn(
        dataColumn.map((item) => (item.id === newColumn.id ? newColumn : item))
      );
    }
    return null;
  };
  const testCallApi = async () => {
    const rawDate = {};
    try {
      const res = await fetch("http://localhost:3000/api/sheet", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "sd",
          email: "qưe",
          phone: "234234",
          company: "234234",
          type: "2434234",
        }),
      });
      console.log(res);
    } catch (error) {}
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.HeadingContainer>To-Do List KanBan</S.HeadingContainer>
      <S.ColumnTask>
        {dataColumn.map((column) => {
          return (
            <ColumnTask
              column={column}
              key={column.id}
              createNewTask={() => setIsCreateTask(true)}
            />
          );
        })}
      </S.ColumnTask>
      <S.CusTomModal
        open={isCreateTask}
        closeAfterTransition
        onClose={() => setIsCreateTask(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormCreateTask
          cancel={() => setIsCreateTask(false)}
          onSubmitForm={(values) => testCallApi()}
        />
      </S.CusTomModal>
    </DragDropContext>
  );
};

export default DragDropContextComponent;
