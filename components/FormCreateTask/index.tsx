import {
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import * as S from "./styles";
import { EDueDate, EPriority, EPriorityFormatColor } from "@/common/enums";
import LevelEffort from "../LevelEffort";
interface IFormCreateTask {
  onSubmitForm?: (values: FormDataEntryValue) => void;
  cancel?: () => void;
}
const FormCreateTask: React.FC<IFormCreateTask> = ({
  onSubmitForm,
  cancel,
}) => {
  const [valueSwitch, setValueSwitch] = useState<boolean>(false);
  const [valuePriority, setValuePriority] = useState<EPriority>(EPriority.Low);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    formObject.dueDate = valueSwitch as unknown as FormDataEntryValue;
    formObject.date = (valueSwitch
      ? formObject.date
      : null) as unknown as FormDataEntryValue;

    onSubmitForm && onSubmitForm(formObject as unknown as FormDataEntryValue);
  };

  return (
    <S.SBox component="form" onSubmit={handleSubmit}>
      <S.SGrid container spacing={2}>
        <S.SGrid item xs={8}>
          <TextField
            label="Task Name"
            name="taskName"
            size="small"
            fullWidth
            margin="normal"
          />
        </S.SGrid>
        <S.SGrid item xs={4}>
          <TextField
            label="Assignee"
            name="assignee"
            size="small"
            fullWidth
            margin="normal"
          />
        </S.SGrid>
        <S.SGrid item xs={4}>
          <FormControlLabel
            style={{ color: "black" }}
            name="dueDate"
            control={
              <Switch
                onChange={(e) => setValueSwitch(e.target.checked)}
                size="small"
                value={valueSwitch}
                checked={valueSwitch}
              />
            }
            label="Due Date"
          />
        </S.SGrid>
        <S.SGrid item xs={2}>
          <Select
            displayEmpty
            size="small"
            name="date"
            disabled={!valueSwitch}
            defaultValue={EDueDate.Mon}
          >
            {Object.keys(EDueDate).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </S.SGrid>
        <S.SGrid item xs={3}>
          <Select
            displayEmpty
            size="small"
            name="priority"
            style={{ minWidth: "110px" }}
            defaultValue={EPriority.Low}
            onChange={(e) => setValuePriority(e.target.value as EPriority)}
          >
            {Object.keys(EPriority).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </S.SGrid>
        <S.SGrid item xs={3}>
          <FormControlLabel
            control={
              <LevelEffort
                name="sortOrder"
                color={EPriorityFormatColor[valuePriority]}
              />
            }
            label=""
          />
        </S.SGrid>
        <S.SGrid item xs={12}>
          <S.SActionForm>
            <Button type="submit">Submit</Button>
            <Button onClick={cancel}>Cancel</Button>
          </S.SActionForm>
        </S.SGrid>
      </S.SGrid>
    </S.SBox>
  );
};

FormCreateTask.propTypes = {};

export default FormCreateTask;
