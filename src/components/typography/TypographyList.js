import { Box, Typography } from "@mui/material";

export const TypographyList = ({ data, background, color }) => {
  const objectData = data?.split(",").map((item) => ({ title: item }));

  console.log(
    "dataaa",
    data?.split(",").map((item) => ({ title: item }))
  );
  return (
    <>
      <Box display="flex" justifyContent="start" flexWrap="wrap" width="300px">
        {data
          ? objectData?.map((item, index) => (
              <Typography
                key={index}
                variant="h6"
                fontWeight="600"
                sx={{
                  background: background,
                  color: color,
                  p: "6px 16px",
                  mr: 1,
                  mb: 1,
                  borderRadius: "100px",
                }}
              >
                {item.title}
              </Typography>
            ))
          : "-"}
      </Box>
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
