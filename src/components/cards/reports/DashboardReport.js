import { Box, Card, CardContent, Fab, Grid, Typography } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import React from "react";

const DashboardReport = ({ data }) => {
  const { dashboard } = data;
  const sales = [
    {
      btnbg: "warning.light",
      btntext: "warning.main",
      icon: "info",
      subtext: "Total Client",
    },
    {
      btnbg: "success.light",
      btntext: "error.main",
      icon: "check-square",
      subtext: "Total Client Request",
    },
    {
      btnbg: "success.light",
      btntext: "success.main",
      icon: "bar-chart-2",
      subtext: "Total Submit Candidate",
    },
    {
      btnbg: "error.light",
      btntext: "error.main",
      icon: "bar-chart-2",
      subtext: "Total Candidate Process",
    },
    {
      btnbg: "error.light",
      btntext: "error.main",
      icon: "bar-chart-2",
      subtext: "Total Candidate Test",
    },
    {
      btnbg: "error.light",
      btntext: "error.main",
      icon: "bar-chart-2",
      subtext: "Total Candidate Interview",
    },
    {
      btnbg: "error.light",
      btntext: "error.main",
      icon: "bar-chart-2",
      subtext: "Total Candidate Hired",
    },
    {
      btnbg: "error.light",
      btntext: "error.main",
      icon: "bar-chart-2",
      subtext: "Total Candidate Rejected",
    },
  ];

  sales.forEach((item) => {
    dashboard.forEach((data) => {
      if (item.subtext === "Total Client") {
        item.total = data.total_client;
      } else if (item.subtext === "Total Client Request") {
        item.total = data.total_client_request;
      } else if (item.subtext === "Total Submit Candidate") {
        item.total = data.total_submit_candidate;
      } else if (item.subtext === "Total Candidate Process") {
        item.total = data.total_candidate_process;
      } else if (item.subtext === "Total Candidate Test") {
        item.total = data.total_candidate_test;
      } else if (item.subtext === "Total Candidate Interview") {
        item.total = data.total_candidate_interview;
      } else if (item.subtext === "Total Candidate Hired") {
        item.total = data.total_candidate_hired;
      } else if (item.subtext === "Total Candidate Rejected") {
        item.total = data.total_candidate_rejected;
      }
    });
  });
  return (
    <>
      <Card
        sx={{
          p: 0,
          mb: 3,
        }}
      >
        <Grid container spacing={0}>
          {sales.map((topcard, index) => (
            <Grid item xs={6} lg={12 / sales.length} sm={2} key={index}>
              <CardContent
                sx={{
                  borderRight: {
                    xs: "0",
                    sm: "1px solid rgba(0,0,0,0.1)",
                  },
                  padding: "30px",
                  "& :last-child": {
                    borderRight: "0",
                  },
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <Fab
                    size="large"
                    aria-label="top-cards"
                    sx={{
                      pointerEvents: "none",
                      backgroundColor: topcard.btnbg,
                      color: topcard.btntext,
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: topcard.btnbg,
                      },
                    }}
                  >
                    <FeatherIcon icon={topcard.icon} />
                  </Fab>
                  <Box
                    sx={{
                      alignItems: "center",
                      mt: 3,
                    }}
                  >
                    <Typography variant="h3" style={{ mt: 100 }}>
                      {topcard.total}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                    >
                      {topcard.subtext}
                    </Typography>
                  </Box>
                </div>
              </CardContent>
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};

export default DashboardReport;
