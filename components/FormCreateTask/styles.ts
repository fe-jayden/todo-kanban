import { commonAdjustFlex } from "@/common/styles/style";
import { Box, Grid, styled } from "@mui/material";

export const SBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  backgroundColor: "#F4F2FF",
  width: "600px",
  height: "170px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "16px",

  borderRadius: theme.shape.borderRadius,
}));

export const SGrid = styled(Grid)(({ theme }) => ({
  "&>.MuiGrid-item": {
      ...commonAdjustFlex("center", "center"),
    paddingTop: "0px",
  },
}));
export const SActionForm = styled('div')(({ theme }) => ({
    ...commonAdjustFlex("center", "center"),
    columnGap: "16px",
    paddingTop: "24px",
  }));