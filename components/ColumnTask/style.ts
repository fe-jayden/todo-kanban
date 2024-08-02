import { commonAdjustFlex, commonFontStyles } from "@/common/styles/style";
import { styled } from "@mui/material";

export const ColumnContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#D5CCFF",
  width: 500,
  padding: theme.spacing(2),
  height: "70vh",
}));

export const HeaderColumn = styled("div")({
  ...commonAdjustFlex("space-between", "center"),
  width: "100%",
});

export const HeaderName = styled("p")(({ theme }) => ({
  ...commonAdjustFlex(undefined, "center"),
  ...commonFontStyles(700),
  color: "#2B1887",
  gap: theme.spacing(1),
}));
export const BtnCreateTask = styled("button")(() => ({
  fontSize: "16px",
  lineHeight: "16px",
  fontWeight: 600,
  color: "#2B1887",
}));

export const ListTasksColumn = styled("div")(({ theme }) => ({
  ...commonAdjustFlex("center", "center"),
  flexDirection: "column",
  padding: theme.spacing(1.25),
  rowGap: theme.spacing(1),
}));

export const Tasks = styled("div")(({ theme }) => ({
  backgroundColor: "#F4F2FF",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  width: "100%",
}));

export const TaskName = styled("p")({
  ...commonFontStyles(700),
  color: "#000000",
});

export const ClientName = styled("p")({
  ...commonFontStyles(400),
  color: "#2B1887",
});

export const LevelEffort = styled("div")(({ theme }) => ({
  ...commonAdjustFlex("start", "center"),
  gap: theme.spacing(1),
}));

export const TaskDetail = styled("div")(({ theme }) => ({
  ...commonAdjustFlex("space-between", "center"),
  marginTop: theme.spacing(1.75),
  gap: theme.spacing(1),
}));

export const DueDate = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 35px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  background-color: ${(props) => props.color};
`;
