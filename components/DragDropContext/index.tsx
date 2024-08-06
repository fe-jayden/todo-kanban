"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import * as S from "./styles";
import { TodoIcon } from "../icons/todo";
import { DoneIcon } from "../icons/done";
import dynamic from "next/dynamic";
import FormCreateTask from "../FormCreateTask";
import { IRequestTask } from "./interface";
import { SheetApi } from "@/services/sheet";

const ColumnTask = dynamic(() => import("../ColumnTask"), { ssr: false });

const initData = [
  {
    name: "To-Do",
    id: "column-todo",
    createTask: true,
    icon: <TodoIcon />,
    taskIds: [],
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
  const handleCreateTask = async (data: IRequestTask) => {
    try {
      await SheetApi.createTask(data);
      callGetListTask();
      setIsCreateTask(false);
    } catch (error) {}
  };
  const handleDragDropTask = async (result: DropResult) => {
    try {
      await SheetApi.dragDrop(result);
    } catch (error) {}
  };
  const callGetListTask = async () => {
    try {
      const res = await SheetApi.getListData();
      const newData = res.data
        ? res.data.map((item: any) => ({
            ...item,
            createTask: item.id === "column-todo",
            icon: item.id === "column-todo" ? <TodoIcon /> : <DoneIcon />,
          }))
        : initData;
      setDataColumn(newData);
    } catch (error) {}
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
      handleDragDropTask(result);
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
    handleDragDropTask(result);
    const newColumn: any = moveColumnList(result);
    if (newColumn && dataColumn) {
      setDataColumn(
        dataColumn.map((item) => (item.id === newColumn.id ? newColumn : item))
      );
    }
    return null;
  };

  useEffect(() => {
    callGetListTask();
  }, []);
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
          onSubmitForm={(values) => {
            const rawData = {
              name_task: values.name_task,
              assignee: values.assignee,
              has_due: values.has_due,
              date_due: values.date_due,
              priority: values.priority,
              sortorder: values.sortorder,
            };
            handleCreateTask(rawData as unknown as IRequestTask);
          }}
        />
      </S.CusTomModal>
    </DragDropContext>
  );
};

export default DragDropContextComponent;
