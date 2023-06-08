import { Typography } from "@mui/material";

const MenuTitle = ({ title }) => (
  <Typography
    fontWeight="700"
    variant="h1"
    sx={{
      lineHeight: "1.235",
    }}
  >
    {title}
  </Typography>
);

export default MenuTitle;
