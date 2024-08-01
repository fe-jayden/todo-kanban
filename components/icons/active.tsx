import { SvgIcon, SvgIconProps } from "@mui/material";

export function ActiveIcon({ ...props }: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M0.333252 6.5H20.3333C22.5424 6.5 24.3333 8.29086 24.3333 10.5V15.0714C24.3333 16.965 22.7982 18.5 20.9047 18.5H12.3333C5.70584 18.5 0.333252 13.1274 0.333252 6.5Z"
        fill={props.fill}
      />
    </SvgIcon>
  );
}
