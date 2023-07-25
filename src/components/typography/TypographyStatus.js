import { Typography } from "@mui/material";

const STATUS_COLOR = {
  process: "#007FBA",
  test: "#7200BF",
  interview: "#FCB712",
  hold: "#FCB712",
  rejected: "#7F0000",
  rejected_test: "#7F0000",
  rejected_interview: "#7F0000",
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
  rejected_test: "#FFACAC",
  rejected_interview: "#FFACAC",
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
  rejected_test: "140px",
  rejected_interview: "175px",
  closed: "78px",
  active: "75px",
  hired: "70px",
};

const STATUS_NAME = {
  process: "Proses",
  test: "Test",
  interview: "Interview",
  hold: "Hold",
  rejected: "Rejected",
  rejected_test: "Tidak Lolos Test",
  rejected_interview: "Tidak Lolos Interview",
  closed: "Closed",
  active: "Active",
  hired: "Hired",
};

export const TypographyStatus = ({ title }) => {
  return (
    <Typography
      variant="h6"
      fontWeight="600"
      sx={{
        width: STATUS_WIDTH[title] || "135px",
        background: STATUS_BACKGROUND[title] || "#FFF8CD",
        color: STATUS_COLOR[title] || "#FCB712",
        p: "6px 16px",
        borderRadius: "100px",
      }}
    >
      {STATUS_NAME[title] || "Kirim Kandidat"}
    </Typography>
  );
};
