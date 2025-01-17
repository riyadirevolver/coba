import { Box, SvgIcon } from "@mui/material";
import React from "react";

const Export = ({ color = "white", ...props }) => {
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
        d="M3.1875 2.125V5.3125H2.125C0.951395 5.3125 0 6.2639 0 7.4375V10.625C0 11.7986 0.951395 12.75 2.125 12.75H3.1875V14.875C3.1875 16.0486 4.1389 17 5.3125 17H11.6875C12.8611 17 13.8125 16.0486 13.8125 14.875V12.75H14.875C16.0486 12.75 17 11.7986 17 10.625V7.4375C17 6.2639 16.0486 5.3125 14.875 5.3125H13.8125V2.125C13.8125 0.951395 12.8611 0 11.6875 0H5.3125C4.1389 0 3.1875 0.951395 3.1875 2.125ZM11.6875 2.125H5.3125V5.3125H11.6875V2.125ZM11.6875 10.625H5.3125V14.875H11.6875V10.625Z"
       fill={color}
      />
    </SvgIcon>
  );
};

export default Export;
