import React from "react";
import * as S from "./style";

type IColumnTaskProps = {
  nameColumn: string;
  iconColumn?: React.JSX.Element;
};
const ColumnTask: React.FC<IColumnTaskProps> = ({ nameColumn, iconColumn }) => {
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
        <S.Tasks>
          <S.TaskName>I am a task</S.TaskName>
          <S.TaskDetail>I am a task

            <S.ClientName>Client name</S.ClientName>
          </S.TaskDetail>
        </S.Tasks>
        <S.Tasks>2</S.Tasks>
      </S.ListTasksColumn>
    </S.ColumnContainer>
  );
};

ColumnTask.propTypes = {};

export default ColumnTask;
