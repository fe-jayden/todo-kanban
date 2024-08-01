import React from "react";
import * as S from "./style";
import { EDueDate, EPriority, EPriorityFormatColor } from "@/common/enums";
import LevelEffort from "../LevelEffort";

interface ITask {
  name: string;
  id: string;
  dueDate?: EDueDate;
  Priority: EPriority;
  clientName: string;
}
type IColumnTaskProps = {
  nameColumn: string;
  iconColumn?: React.JSX.Element;
  task?: ITask[];
};
const ColumnTask: React.FC<IColumnTaskProps> = ({
  nameColumn,
  iconColumn,
  task,
}) => {
  return (
    <S.ColumnContainer>
      <S.HeaderColumn>
        <S.HeaderName>
          {iconColumn}
          {nameColumn}
        </S.HeaderName>
        <button>sdsd</button>
      </S.HeaderColumn>
      <S.ListTasksColumn>
        {task &&
          task.map((task) => {
            return (
              <S.Tasks key={task.id}>
                <S.TaskName>{task.name}</S.TaskName>
                <S.TaskDetail>
                  <S.LevelEffort>
                    {task.dueDate && (
                      <S.DueDate color={EPriorityFormatColor[task.Priority]}>
                        {task.dueDate}
                      </S.DueDate>
                    )}
                    <LevelEffort color={EPriorityFormatColor[task.Priority]} />
                  </S.LevelEffort>

                  <S.ClientName>{task.clientName}</S.ClientName>
                </S.TaskDetail>
              </S.Tasks>
            );
          })}
      </S.ListTasksColumn>
    </S.ColumnContainer>
  );
};

ColumnTask.propTypes = {};

export default ColumnTask;
