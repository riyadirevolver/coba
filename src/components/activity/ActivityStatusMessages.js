import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { blue, red, yellow } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const StatusAproved = ({ note }) => {
  return (
    <>
      <Box
        sx={{
          background: "#CDFFCD",
          color: "#007F00",
          display: "flex",
          width: "100px",
          p: "2px 2px 2px 8px",
          borderRadius: "100px",
        }}
      >
        <li></li>
        <Typography variant="h6" fontWeight="600" sx={{ ml: -1 }}>
          APPROVED
        </Typography>
      </Box>
      <Typography variant="body2">Notes : {note ?? "-"}</Typography>
    </>
  );
};

export const StatusRejected = ({ note }) => {
  return (
    <>
      <Box
        sx={{
          background: "#FFACAC",
          color: "#7F0000",
          display: "flex",
          width: "80px",
          p: "2px 2px 2px 8px",
          borderRadius: "100px",
        }}
      >
        <li></li>
        <Typography variant="h6" fontWeight="600" sx={{ ml: -1 }}>
          REJECT
        </Typography>
      </Box>
      <Typography variant="body2">Notes : {note ?? "-"}</Typography>
    </>
  );
};

export const StatusPending = () => {
  return (
    <Box
      sx={{
        background: "#FFF8CD",
        color: "#FCB712",
        display: "flex",
        width: "90px",
        p: "2px 2px 2px 8px",
        borderRadius: "100px",
      }}
    >
      <li></li>
      <Typography variant="h6" fontWeight="600" sx={{ ml: -1 }}>
        PENDING
      </Typography>
    </Box>
  );
};
