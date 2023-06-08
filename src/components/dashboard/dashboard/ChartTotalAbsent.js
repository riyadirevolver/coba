import React from "react";
import DashboardCard from "../../baseCard/DashboardCard";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const ChartTotalAbsent = ({ data }) => {
  const labels = data.data.map((v) => {
    const labelArr = Object.keys(v);
    const newLabel = labelArr.map((l) => l.toUpperCase());
    return newLabel;
  })[0];

  const optionsTotalAbsent = {
    labels,
    chart: {
      height: 280,
      type: "donut",
      foreColor: "#adb0bb",
      fontFamily: "DM sans",
    },
    colors: ["#1BA0E2", "#90BE6D", "#F94144", "#F8961E", "#2250A2"],
    dataLabels: {
      enabled: true,
      formatter: (val, opt) => {
        const data = opt.w.globals;
        return data.series[opt.seriesIndex];
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    stroke: {
      colors: ["transparent"],
    },
    plotOptions: {
      pie: {
        donut: {
          expandOnClick: false,
          size: "78%",
          background: "transparent",
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: "18px",
              //   color: undefined,
              //   offsetY: -10,
            },
            value: {
              show: false,
              color: "#98aab4",
            },
            total: {
              show: false,
              label: "Our Visitors",
              color: "#98aab4",
            },
          },
        },
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };

  const seriesTotalAbsent = data.data.map((v) => {
    const val = Object.values(v);
    const toINTEGER = val.map((n) => Number(n));
    return toINTEGER;
  })[0];

  return (
    <DashboardCard
      title={"Total absen hari ini"}
      cardSx={{ height: "450px", px: 0 }}
      cardContentSx={{
        paddingTop: 0,
      }}
    >
      <Box borderBottom={"2px solid #F0F0F0"}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "52px",
            lineHeight: "63px",
            color: "#1BA0E2",
          }}
        >
          {data.total}
        </Typography>
      </Box>
      <Chart
        options={optionsTotalAbsent}
        series={seriesTotalAbsent}
        type="donut"
        height="280"
        width={"100%"}
      />
    </DashboardCard>
  );
};
