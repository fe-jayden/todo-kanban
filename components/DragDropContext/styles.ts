"use client";

import { commonAdjustFlex } from "@/common/styles/style";
import { styled } from "@mui/material";

export const HeadingContainer = styled("h2")(() => ({
  fontWeight: 600,
  fontSize: "1.6rem",
  color: "#E8E8EA",
}));
export const ColumnTask = styled("div")(() => ({
  ...commonAdjustFlex("center", "center"),
  columnGap: "24px",
}));
