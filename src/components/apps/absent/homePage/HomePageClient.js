import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { MenuAbsentClient } from "./menu/MenuAbsentClient";
import Topbar from "./Topbar";

const HomepageClient = ({ user_id }) => {
  const [dataHistory, setDataHistory] = React.useState([]);

  const fetchHistory = async () => {
    const { data } = await axios.get("/api/activity", {
      params: {
        user_id: user_id,
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
      <MenuAbsentClient />
      {/* <History dataHistory={dataHistory.data} /> */}
    </Box>
  );
};

export default HomepageClient;
