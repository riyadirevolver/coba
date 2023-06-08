import React from "react";
import Topbar from "./Topbar";
import { Box } from "@mui/material";
import MyActivity from "./activity/MyActivity";
import { MenuAbsent } from "./menu/MenuAbsent";
import History from "./history/History";
import { useEffect } from "react";
import axios from "axios";

const Homepage = ({ user_id }) => {
  const [dataHistory, setDataHistory] = React.useState([]);

  const fetchHistory = async () => {
    const { data } = await axios.get("/api/activity", {
      params: {
        user_id: user_id,
        $limit: 5,
      },
    });

    setDataHistory(data);
  };

  useEffect(() => {
    if (dataHistory.length <= 0) {
      fetchHistory();
    }
  }, []);

  return (
    <Box pt={3}>
      <Topbar />
      <MyActivity />
      <MenuAbsent />
      <History dataHistory={dataHistory.data} />
    </Box>
  );
};

export default Homepage;
