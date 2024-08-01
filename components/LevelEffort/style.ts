import styled from "@emotion/styled";
import { Rating } from "@mui/material";

export const StyledRating = styled(Rating)(({ color = "#ff6d75" }) => ({
  "&.MuiRating-root": {
    columnGap: "8px",
  },
  "& .MuiRating-iconFilled": {
    color: color,
  },
  "& .MuiRating-iconHover": {
    color: color,
  },
}));
