"use client";

import { commonAdjustFlex } from "@/common/styles/style";
import { Modal, styled } from "@mui/material";

export const HeadingContainer = styled("h2")(() => ({
  fontWeight: 600,
  fontSize: "1.6rem",
  color: "#E8E8EA",
}));
export const ColumnTask = styled("div")(() => ({
  ...commonAdjustFlex("center", "center"),
  columnGap: "24px",
}));

export const CusTomModal = styled(Modal)(() => ({
  // position: "absolute",
  // backgroundColor: "red",
  // width: "600px",
  // height: "600px",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // columnGap: "24px",
}));
