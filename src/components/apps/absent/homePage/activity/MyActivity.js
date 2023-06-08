import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ActivityHearder from "./ActivityHearder";
import ActivitySummary from "./ActivitySummary";
import ControlledButtonDatePicker from "../../../../forms/button/ControlledButtonDatePicker";
import moment from "moment";
import { useForm } from "react-hook-form";
import axios from "axios";
import SkeletonActivity from "./SkeletonActivity";

const icon = {
  absent: "wfo",
  sick: "sick",
  leave: "leave",
  isWfh: "wfh",
  overtime: "overtime",
  late: "late",
  earlyLeave: "early_leave",
};
const label = {
  absent: "WFO",
  sick: "Sakit",
  leave: "Cuti",
  isWfh: "WFH",
  overtime: "Lembur",
  late: "Terlambat",
  earlyLeave: "Pulang Cepat",
};
const MyActivity = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const defaulLabelName = React.useMemo(() => moment().format("MMMM"), []);
  const defaulLabelNameY = React.useMemo(() => moment().format("YYYY"), []);

  const [summaryData, setSummaryData] = React.useState([]);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const fetchSummary = async () => {
    const { data } = await axios
      .get("/api/users/summary", {
        params: {
          month: moment().format("MM"),
          Year: moment().format("YYYY"),
        },
      })
      .then((res) => {
        setIsLoading(false);
        return res;
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    const keys = Object.keys(data.data);

    const newData = keys.map((key, idx) => ({
      label: label[key],
      value: data.data[key],
      icon: icon[keys[idx]],
    }));

    setSummaryData(newData);
  };

  useEffect(() => {
    if (summaryData.length <= 1) {
      fetchSummary();
    }
  }, []);

  const activitySummary = async (values) => {
    const queries = { ...values };
    try {
      const { data } = await axios.get("/api/users/summary", {
        params: queries,
        onDownloadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Download progress: ${percentCompleted}%`);
          // update your UI here
        },
      });

      const keys = Object.keys(data.data);

      const newData = keys.map((key, idx) => ({
        label: key,
        value: data.data[key],
        icon: icon[keys[idx]],
      }));

      setSummaryData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeMonth = (val) => {
    const getMonth = moment(val).format("MM");
    setValue("month", getMonth);
    handleSubmit(activitySummary)();
  };
  const handleChangeYear = (val) => {
    const getYear = moment(val).format("YYYY");
    setValue("year", getYear);
    handleSubmit(activitySummary)();
  };
  return (
    <Box mt="35px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "19px",
            color: "#4F4F4F",
          }}
        >
          Kehadiranmu
        </Typography>
        <Box display="flex">
          <Box mr={2}>
            <ControlledButtonDatePicker
              onChange={handleChangeMonth}
              onClick={(e) => setMonth(e)}
              value={watch("month")}
              type="month"
              label={
                watch("month")
                  ? moment(watch("month")).format("MMMM")
                  : defaulLabelName
              }
            />
          </Box>
          <ControlledButtonDatePicker
            onChange={handleChangeYear}
            value={watch("year")}
            type="year"
            label={
              watch("year")
                ? moment(watch("year")).format("YYYY")
                : defaulLabelNameY
            }
          />
        </Box>
      </Box>
      {!isLoading ? (
        <ActivitySummary summaryData={summaryData} />
      ) : (
        <SkeletonActivity />
      )}
    </Box>
  );
};

export default MyActivity;
