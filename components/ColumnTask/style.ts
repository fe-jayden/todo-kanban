import { commonAdjustFlex, commonFontStyles } from "@/common/styles/style";
import { styled } from "@mui/material/styles";

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

export const TaskDetail = styled("div")(({ theme }) => ({
  ...commonAdjustFlex("space-between", "center"),
  marginTop: theme.spacing(1.75),
  gap: theme.spacing(1),
}));
