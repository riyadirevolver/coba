import { Box, SvgIcon } from "@mui/material";
import React from "react";

const Leave = ({ color = "white", ...props }) => {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 17 17"
      sx={{
        height: "17px",
        width: "17px",
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 17C13.1944 17 17 13.1944 17 8.5C17 3.80558 13.1944 0 8.5 0C3.80558 0 0 3.80558 0 8.5C0 13.1944 3.80558 17 8.5 17ZM5.3125 7.4375C4.7257 7.4375 4.25 7.9132 4.25 8.5C4.25 9.0868 4.7257 9.5625 5.3125 9.5625H11.6875C12.2743 9.5625 12.75 9.0868 12.75 8.5C12.75 7.9132 12.2743 7.4375 11.6875 7.4375H5.3125Z"
       fill={color}
      />
    </SvgIcon>
  );
};

export default Leave;
