import { Box, Typography } from "@mui/material";

const STATUS_COLOR = {
  process: "#007FBA",
  test: "#7200BF",
  interview: "#FCB712",
  hold: "#FCB712",
  rejected: "#7F0000",
  closed: "#7F0000",
  hired: "#007F00",
  active: "#007F00",
};

const STATUS_BACKGROUND = {
  process: "#89CFF0",
  test: "#EBD8F8",
  interview: "#FFF8CD",
  hold: "#FFF8CD",
  rejected: "#FFACAC",
  closed: "#FFACAC",
  hired: "#CDFFCD",
  active: "#CDFFCD",
};

const STATUS_WIDTH = {
  process: "90px",
  test: "60px",
  interview: "95px",
  hold: "60px",
  rejected: "95px",
  closed: "78px",
  active: "75px",
  hired: "70px",
};

export const TypographyStatus = ({ title }) => {
  return (
    <Typography
      variant="h6"
      fontWeight="600"
      sx={{
        width: STATUS_WIDTH[title] || "100px",
        background: STATUS_BACKGROUND[title] || "#FFF8CD",
        color: STATUS_COLOR[title] || "#FCB712",
        p: "6px 16px",
        borderRadius: "100px",
      }}
    >
      {title}
    </Typography>
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
