import * as S from "./style";

import React from "react";
import { EmptyIcon } from "../icons/empty";
type LevelEffortProps = {
  color: string;
  readOnly?: boolean;
  name?: string;
  value?: number | null;
  handleChangeValue?: (newValue: number) => void;
};
const LevelEffort: React.FC<LevelEffortProps> = ({
  color,
  readOnly,
  value,
  name,
  handleChangeValue,
}) => {
  return (
    <S.StyledRating
      readOnly={readOnly}
      color={color}
      name={name}
      value={value}
      defaultValue={1}
      onChange={(event, newValue) => {
        handleChangeValue && handleChangeValue(Number(newValue || 0));
      }}
      icon={<EmptyIcon />}
      emptyIcon={<EmptyIcon />}
      max={3}
    />
  );
};

LevelEffort.propTypes = {};

export default LevelEffort;
