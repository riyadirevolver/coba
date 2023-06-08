import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import WithAuthAbsen from "../../../../lib/session/withAuthAbsen";
import SkeletonDetail from "../../../../src/components/apps/absent/skeleton/SkeletonDetail";
import ApproveAppModal from "../../../../src/components/modal/approval-cuti/ApproveAppModal";
import RejectAppModal from "../../../../src/components/modal/approval-cuti/RejectAppModal";

import useHandleModal from "../../../../src/hooks/useHandleModal";
import { useUserSession } from "../../../../src/hooks/useUserSession";
import { COLOR_APPROVED, IS_APPROVED } from "../../../../utils/approved";

export const getServerSideProps = WithAuthAbsen(async ({ req, params }) => {
  const { id } = params;
  return {
    props: {
      id_leave: id,
    },
  };
});

const DetailLeave = ({ id_leave }) => {
  const router = useRouter();
  const [datax, setDatax] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {
    user,
    leave_date_from,
    leave_date_to,
    is_approved,
    notes,
    reject_notes,
  } = datax;

  const { data: userLogin, error } = useUserSession();

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

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const uplinerApprove = datax[checkUpliner(datax)];

  useEffect(async () => {
    const { data } = await axios.get(`/api/leave/${id_leave}`);
    setDatax(data);
  }, [setDatax]);

  const handleBack = () => {
    router.back();
  };
  return (
    <Container maxWidth="sm">
      <RejectAppModal
        open={openModal}
        type={modalType}
        datax={datax}
        closeModalHandler={handleCloseModal}
      />
      <ApproveAppModal
        open={openModal}
        type={modalType}
        datax={datax}
        closeModalHandler={handleCloseModal}
      />
      <Box pt={2} height="85vh">
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
        <Box
          mt={2}
          pb={2}
          sx={{
            height: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",

            overflowY: "auto",
            background: "#ffff",
            margin: "0 -15px",
            padding: "0 15px",
          }}
        >
          {typeof datax === "object" && userLogin ? (
            <>
              <Box
                p={1}
                pl={3}
                sx={{
                  background: " #FFFFFF",
                  border: "1.03498px solid #F4F6F9",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                {message}
                <Typography fontWeight={700} color="#1BA0E2">
                  {user?.fullname}
                </Typography>
                <Typography fontWeight={700}>
                  {moment(datax.leave_date_from).format("DD MMMM YYYY")}
                </Typography>
                <Typography>{notes ? notes : "-"}</Typography>
                <Typography>
                  {moment(leave_date_from).format("HH:mm")} -
                  {leave_date_to
                    ? moment(leave_date_to).format("HH:mm, DD MMMM YYYY")
                    : "-"}
                </Typography>
                <Typography color={COLOR_APPROVED[uplinerApprove]}>
                  {IS_APPROVED[uplinerApprove]}
                </Typography>
                {uplinerApprove === false && (
                  <Typography>Reject Notes : {reject_notes ?? "-"}</Typography>
                )}
              </Box>
              {uplinerApprove === null && (
                <Box display="flex" justifyContent="space-around" pb="70px">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleOpenModal("reject");
                    }}
                    sx={{
                      fontSize: "25px",
                      width: "150px",
                      background: "black",
                      borderRadius: "20px",
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    disabled={loading}
                    onClick={(e) => {
                      // handleApprove(e);
                      handleOpenModal("approve");
                    }}
                    sx={{
                      fontSize: "25px",
                      width: "150px",
                      background: "#1BA0E2",
                      borderRadius: "20px",
                    }}
                  >
                    Approval
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <SkeletonDetail />
          )}
        </Box>
      </Box>
    </Container>
  );
};
DetailLeave.layout = "Blank";
export default DetailLeave;
