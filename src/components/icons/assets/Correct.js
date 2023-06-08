import { Box, SvgIcon } from "@mui/material";
import React from "react";

const Correct = ({ color = "white", ...props }) => {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 30 21"
      sx={{
        height: "30px",
        width: "21px",
      }}
    >
      <path
        d="M2 7.66667L5.77778 11.4444L15.2222 2"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66669 10.4999L10.5556 12.3888L20 2.94434"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default Correct;
