import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Card, CardContent, Box, Typography, Grid } from "@mui/material";

const DoughnutChart = () => {
  // 1
  const optionsdoughnutchart = {
    chart: {
      id: "donut-chart",
      fontFamily: "'DM Sans', sans-serif",
      foreColor: "#adb0bb",
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70px",
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
      width: "50px",
    },
    colors: ["#6ac3fd", "#0b70fb", "#f64e60", "#26c6da", "#ffa800"],
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };
  const seriesdoughnutchart = [45, 15, 27, 18, 35];

  // 2
  const optionspiechart = {
    chart: {
      id: "pie-chart",
      fontFamily: "'DM Sans', sans-serif",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70px",
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
      width: "50px",
    },
    colors: ["#6ac3fd", "#0b70fb", "#f64e60", "#26c6da", "#ffa800"],
    tooltip: {
      fillSeriesColor: false,
    },
  };
  const seriespiechart = [45, 15, 27, 18, 35];

  return (
    <Grid container>
      <Grid item lg={6} md={12} xs={12}>
        <Card>
          <Box p={2} display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography variant="h4">Doughnut Charts</Typography>
            </Box>
          </Box>
          <CardContent>
            <Chart
              options={optionsdoughnutchart}
              series={seriesdoughnutchart}
              type="donut"
              height="300px"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={6} md={12} xs={12}>
        <Card>
          <Box p={2} display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography variant="h4">Pie Charts</Typography>
            </Box>
          </Box>
          <CardContent>
            <Chart
              options={optionspiechart}
              series={seriespiechart}
              type="pie"
              height="300px"
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DoughnutChart;
