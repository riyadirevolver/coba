import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { dayNames } from "../../../../constants/nameDates";
import { useUserSession } from "../../../../hooks/useUserSession";
import HistoryLeave from "../homePage/history/HistoryLeave";
import SkeletonClientHistory from "../skeleton/SkeletonClientHistory";

const Leave = ({ user_id }) => {
  const [historyData, setHistoryData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [skip, setSkip] = React.useState(0);
  const [dataTotal, setDataTotal] = React.useState(0);

  const router = useRouter();

  const scrollRef = useRef(null);
  const handleBack = () => {
    router.back();
  };

  const { data: userLogin, error } = useUserSession();
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("/api/leave", {
          params: {
            // user_id,
            "$or[0][upliner_id]": user_id,
            "$or[1][upliner2_id]": user_id,
            "$or[2][upliner3_id]": user_id,
          },
        })
        .then(({ data }) => {
          setHistoryData([...historyData, ...data.data]);
          setDataTotal(data.total);
          setLoading(false);
        });
    };
    if (historyData.length <= 1) {
      fetch();
    }
  });

  useEffect(() => {
    const nextFetch = async () => {
      await axios
        .get("/api/leave", {
          params: {
            "$or[0][upliner_id]": user_id,
            "$or[1][upliner2_id]": user_id,
            "$or[2][upliner3_id]": user_id,
            $skip: skip,
          },
        })
        .then(({ data }) => {
          setHistoryData((prev) => [...prev, ...data.data]);
        });
    };
    if (dataTotal === 0) return;
    const getData = setTimeout(() => {
      nextFetch();
    }, 1000);

    return () => {
      clearTimeout(getData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight === scrollHeight) {
      setSkip(skip + 10);
    }
  };

  const checkUpliner = (data) => {
    const dataUser = userLogin?.data;
    if (dataUser?.id === data.upliner3_id) {
      return "is_approved_client3";
    } else if (dataUser?.id === data.upliner2_id) {
      return "is_approved_client";
    } else {
      return "is_approved";
    }
  };
  return (
    <div>
      <Box pt={2} height="100vh">
        <Box
          position="sticky"
          sx={{
            marginTop: "-16px !important",
            backgroundColor: "#1BA0E2",
            zIndex: 1,
            position: "relative",
            margin: "0px -15px",
            height: "100px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box mb="20px" ml="20px" display="flex" alignItems="center">
            {/* <IconButton color="#ffff" onClick={handleBack}>
              <FeathersIcon icon="chevron-left" stroke="#ffff" />
            </IconButton> */}
            <Typography fontWeight={700} color="#ffff">
              History Cuti
            </Typography>
          </Box>
        </Box>

        <Box
          height="20px"
          sx={{
            background: "#ffff",
            margin: "-18px -15px 0",
            position: "relative",
            zIndex: 2,
            borderRadius: "20px 20px 0px 0px",
          }}
        ></Box>

        <Box height="100%">
          {!loading ? (
            <Box
              ref={scrollRef}
              onScroll={handleScroll}
              sx={{
                height: "100%",
                overflowY: "auto",
                background: "#ffff",
                margin: "0 -15px",
                padding: "0 15px",
              }}
            >
              {historyData?.map((history, idx) => {
                const date = new Date(history.leave_date_from);
                const getDayName = dayNames[date.getDay()];

                return (
                  <HistoryLeave
                    key={100}
                    idx={idx}
                    id={history.id}
                    fullname={history.user.fullname}
                    is_approved={history[checkUpliner(history)]}
                    // photo={history.check_in_photo}}
                    leave_date_from={history.leave_date_from}
                    leave_date_to={history.leave_date_to}
                    leave_type={history.leave_type.name}
                    reject_notes={history.reject_notes}
                    dayName={getDayName}
                  />
                );
              })}
              {historyData.length === dataTotal ? (
                <Typography fontWeight={700} textAlign="center">
                  Tidak ada lagi data
                </Typography>
              ) : (
                <Typography textAlign="center">Loading...</Typography>
              )}
            </Box>
          ) : (
            <SkeletonClientHistory />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Leave;
