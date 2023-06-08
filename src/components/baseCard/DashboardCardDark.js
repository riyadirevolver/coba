import React from "react";
import PropTypes from "prop-types";
import { Typography, Card, CardHeader, CardContent } from "@mui/material";

const DashboardCardDark = ({
  custompadding,
  customheaderpadding,
  customdisplay,
  custommargin,
  title,
  subtitle,
  action,
  children,
  cardSx,
  cardHeaderSx,
}) => (
  <Card sx={{ ...cardSx }}>
    <CardHeader
      sx={{
        p: customheaderpadding,
        display: {
          xs: customdisplay,
          lg: "flex",
          sm: "flex",
        },
        ...cardHeaderSx,
      }}
      title={
        <Typography
          variant="h3"
          sx={{
            mb: {
              xs: custommargin,
            },
          }}
        >
          {title}
        </Typography>
      }
      subtitle={subtitle}
      action={action || ""}
    />
    {/* content area */}
    <CardContent
      sx={{
        p: custompadding,
      }}
    >
      {children}
    </CardContent>
  </Card>
);

DashboardCardDark.propTypes = {
  custompadding: PropTypes.string,
  customheaderpadding: PropTypes.string,
  customdisplay: PropTypes.string,
  custommargin: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  action: PropTypes.any,
  children: PropTypes.node,
};

export default DashboardCardDark;
