import { CSSProperties } from "react";

export const commonFontStyles = (weight: number | string) => ({
  fontSize: "24px",
  lineHeight: "24px",
  fontWeight: weight,
});
export const commonAdjustFlex = (
  justifyContent?: CSSProperties["justifyContent"],
  alignItems?: CSSProperties["alignItems"]
) => ({
  display: "flex",
  alignItems: alignItems ?? "normal",
  justifyContent: justifyContent ?? "normal",
});
