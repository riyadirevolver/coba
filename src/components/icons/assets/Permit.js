import { Box, SvgIcon } from "@mui/material";
import React from "react";

const Permit = ({ color = "white", ...props }) => {
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
        d="M8.5 17C13.1944 17 17 13.1944 17 8.5C17 3.80558 13.1944 0 8.5 0C3.80558 0 0 3.80558 0 8.5C0 13.1944 3.80558 17 8.5 17ZM9.5 4.25C9.5 3.69772 9.05229 3.25 8.5 3.25C7.94772 3.25 7.5 3.69772 7.5 4.25V8.5C7.5 8.76522 7.60536 9.01957 7.79289 9.20711L10.7981 12.2123C11.1886 12.6028 11.8218 12.6028 12.2123 12.2123C12.6028 11.8218 12.6028 11.1886 12.2123 10.7981L9.5 8.08579V4.25Z"
       fill={color}
      />
    </SvgIcon>
  );
};

export default Permit;
