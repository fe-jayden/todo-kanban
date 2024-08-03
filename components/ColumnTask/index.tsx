import React from "react";
import * as S from "./style";
import { EPriorityFormatColor } from "@/common/enums";
import LevelEffort from "../LevelEffort";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IDataColumn } from "../DragDropContext/interface";

type IColumnTaskProps = {
  column: IDataColumn;
  createNewTask?: () => void;
};
const ColumnTask: React.FC<IColumnTaskProps> = ({ column, createNewTask }) => {
  return (
    <S.ColumnContainer>
      <S.HeaderColumn>
        <S.HeaderName>
          {column.icon}
          {column.name} {column.taskIds.length}
        </S.HeaderName>
        {column.createTask && (
          <S.BtnCreateTask
            onClick={() =>
              column.createTask && createNewTask && createNewTask()
            }
          >
            New Task
          </S.BtnCreateTask>
        )}
      </S.HeaderColumn>

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <S.ListTasksColumn
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {column.taskIds &&
              column.taskIds.map((task, index) => {
                return (
                  <Draggable
                    key={task.idtask}
                    draggableId={`${task.idtask}`}
                    index={index}
                  >
                    {(draggableProvided, draggableSnapshot) => {
                      return (
                        <S.Tasks
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                        >
                          <S.TaskName>{task.name_task}</S.TaskName>
                          <S.TaskDetail>
                            <S.LevelEffort>
                              {task.date_due && (
                                <S.DueDate
                                  color={EPriorityFormatColor[task.priority]}
                                >
                                  {task.date_due}
                                </S.DueDate>
                              )}
                              <LevelEffort
                                readOnly
                                color={EPriorityFormatColor[task.priority]}
                              />
                            </S.LevelEffort>

                            <S.ClientName>{task.assignee}</S.ClientName>
                          </S.TaskDetail>
                        </S.Tasks>
                      );
                    }}
                  </Draggable>
                );
              })}
          </S.ListTasksColumn>
        )}
      </Droppable>
    </S.ColumnContainer>
  );
};

ColumnTask.propTypes = {};

export default ColumnTask;
