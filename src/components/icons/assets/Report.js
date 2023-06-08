import { SvgIcon } from "@mui/material";
import React from "react";

const Report = ({ color = "white", ...props }) => {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 27 27"
      sx={{
        height: "27px",
        width: "27px",
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.37499 0C1.51104 0 0 1.51104 0 3.37499V21.9375C0 24.7334 2.26655 27 5.06249 27C7.85843 27 10.125 24.7334 10.125 21.9375V3.37499C10.125 1.51104 8.61395 0 6.74999 0H3.37499ZM5.06249 23.625C5.99447 23.625 6.74999 22.8694 6.74999 21.9375C6.74999 21.0055 5.99447 20.25 5.06249 20.25C4.13051 20.25 3.37499 21.0055 3.37499 21.9375C3.37499 22.8694 4.13051 23.625 5.06249 23.625Z"
        fill={color}
      />
      <path
        d="M13.5 20.6593L21.7678 12.3914C23.0859 11.0734 23.0859 8.93647 21.7678 7.61846L19.3814 5.23198C18.0633 3.91396 15.9264 3.91396 14.6084 5.23198L13.5 6.34039V20.6593Z"
        fill={color}
      />
      <path
        d="M23.625 27H11.9324L22.0574 16.875H23.625C25.489 16.875 27 18.386 27 20.25V23.625C27 25.4889 25.489 27 23.625 27Z"
        fill={color}
      />
    </SvgIcon>
  );
};

export default Report;
