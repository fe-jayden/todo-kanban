import * as S from "./style";

import React from "react";
import { EmptyIcon } from "../icons/empty";
type LevelEffortProps={
  color:string
}
const LevelEffort:React.FC<LevelEffortProps> = ({color}) => {
  return (
    <S.StyledRating
      color={color}
      name="customized-color"
      defaultValue={2}
      getLabelText={(value: number) =>
        `${value} Heart${value !== 1 ? "s" : ""}`
      }
      icon={<EmptyIcon />}
      emptyIcon={<EmptyIcon />}
      max={3}
    />
  );
};

LevelEffort.propTypes = {};

export default LevelEffort;
