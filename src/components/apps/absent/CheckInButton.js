import { Box, Button, IconButton, Snackbar } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "../../../hooks/useSnackbar";
import CheckInCameraModal from "../../modal/checkInCamera/CheckInCameraModal";
import useHandleModal from "../../../hooks/useHandleModal";
import { useRouter } from "next/router";
import LoadingSpinner from "../../Loadings/LoadingSpinner";
import moment from "moment";
import CheckInModal from "../../modal/checkIn/CheckIn";
import { get, useForm } from "react-hook-form";
import { useUserSession } from "../../../hooks/useUserSession";
// import { useGetMedia } from "../../../hooks/useGetMedia";
import { webPermissions } from "../../../constants/webPermissions";
import BaseModal from "../../modal/baseModal/BaseModal";
import UAParser from "ua-parser-js";
import { parse } from "date-fns";

const CheckInButton = ({ onSuccess }) => {
  const [lastActivity, setLastActivity] = React.useState(null);
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const {
    openModal: openFormModal,
    modalType: modalTypeFormModal,
    handleCloseModal: handleCloseFormModal,
    handleOpenModal: handleOpenModalFormModal,
  } = useHandleModal(false);
  const {
    openModal: alertModal,
    modalType: alertModalType,
    handleCloseModal: alertHandleClose,
    handleOpenModal: alertHandleOpen,
  } = useHandleModal(false);
  const {
    openModal: openCameraModal,
    modalType: cameraModalType,
    handleCloseModal: handleCloseCameraModal,
    handleOpenModal: handleOpenCameraModal,
  } = useHandleModal(false);

  const [showLoading, setShowLoading] = React.useState(false);
  const [isCheckinToday, setIsCheckinToday] = useState();
  const [{ lat, lang }, setPosition] = useState({
    lat: "",
    lang: "",
  });
  const [captureImage, setCaptureImage] = useState(null);

  const { data: user } = useUserSession("simple");

  const { control, handleSubmit } = useForm();

  const fetchLastActivity = async () => {
    const { data } = await axios.get("/api/activity/user-last-activity");

    setLastActivity(data);

    if (data.is_no_activity) {
      setIsCheckinToday(false);
      return;
    }

    const now = moment().format("DD-MM-YYYY");
    const clockInTime = moment(data.time_in).format("DD-MM-YYYY");
    const compareTime = now === clockInTime;

    setIsCheckinToday(compareTime);
  };

  useEffect(() => {
    if (!lastActivity) {
      fetchLastActivity();
    }
  }, [lastActivity]);

  const router = useRouter();

  const handleCheckIn = async (form) => {
    setShowLoading(true);
    try {
      const tz = moment().format("Z");
      const payload = {
        request_type: "IN",
        latitude: lat?.toString(),
        longitude: lang?.toString(),
        check_in_photo: captureImage,
        time_zone: tz,
        ...form,
      };

      const response = await axios.post(
        "/api/activity/request-activity",
        payload
      );
      openSnackBar(response.data.message ?? "Berhasil Absen Masuk");
      setShowLoading(false);
      handleCloseFormModal();
      setTimeout(() => {
        router.reload(window.location.pathname);
      }, 1000);
    } catch (error) {
      console.log(error);
      const errors = error.response.data;
      const ua = window.navigator.userAgent;
      const parser = new UAParser(ua);
      const payload = {
        message: errors.message ?? "Terjadi Kesalahan Server",
        trace: `${errors.code ?? "500"} - IN - ${
          errors.message ?? "General Error"
        }`,
        version: parser.getOS().version,
        device_model: parser.getDevice().model,
        device_os: parser.getOS().name,
        user_agent: parser.getUA(),
        platform: parser.getDevice().type,
      };
      await axios.post("/api/error-log", payload);

      setShowLoading(false);
      const err = error?.response?.data;
      openSnackBar(err ? err.message : "Terjadi Kesalahan Server");
    }
  };

  const checkLocationPermission = async () => {
    const permission = await window.navigator.permissions.query({
      name: "geolocation",
    });

    if (permission.state == "denied") {
      return false;
    }

    return true;
  };

  // const checkCameraPermission = () => {
  //   window.navigator;
  // };

  const openDrawer = async () => {
    const locationPermission = await checkLocationPermission();

    if (!locationPermission) {
      alertHandleOpen("geo-loc");
      return;
    }

    const location = window.navigator.geolocation;

    const requiredSelfie = await user?.requiredSelfie;

    if (requiredSelfie === false) {
      if ("geolocation" in window.navigator) {
        location.getCurrentPosition((position) => {
          setPosition({
            lang: position.coords.longitude,
            lat: position.coords.latitude,
          });
          handleOpenModalFormModal("check-in");
        });
      } else {
        setPosition({
          lang: "",
          lat: "",
        });
        handleOpenModalFormModal("check-in");
      }
    } else {
      try {
        await window.navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if ("geolocation" in window.navigator) {
          location.getCurrentPosition((position) => {
            setPosition({
              lang: position.coords.longitude,
              lat: position.coords.latitude,
            });
            handleOpenModal("check-in");
          });
        } else {
          setPosition({
            lang: "",
            lat: "",
          });
          handleOpenModal("check-in");
        }
      } catch (error) {
        handleOpenCameraModal("camera");
        return;
      }
    }
  };

  const handleCheckOut = async () => {
    setShowLoading(true);
    try {
      const payload = {
        request_type: "OUT",
      };
      const response = await axios.post(
        "/api/activity/request-activity",
        payload
      );

      setShowLoading(false);
      openSnackBar(response.data.message ?? "Berhasil Absen Keluar");
      router.replace(
        {
          pathname: "/apps/absent",
        },
        null,
        { shallow: true }
      );
      setTimeout(() => {
        router.reload(window.location.pathname);
      }, 2000);
    } catch (error) {
      console.log(error);
      const errors = error.response.data;
      const ua = window.navigator.userAgent;
      const parser = new UAParser(ua);
      const payload = {
        message: errors.message ?? "Terjadi Kesalahan Server",
        trace: `${errors.code ?? "500"} - OUT - ${
          errors.message ?? "General Error"
        }`,
        version: parser.getOS().version,
        device_model: parser.getDevice().model,
        device_os: parser.getOS().name,
        user_agent: parser.getUA(),
        platform: parser.getDevice().type,
      };
      const res = await axios.post("/api/error-log", payload);
      console.log(res);
      setShowLoading(false);
      openSnackBar(errors.message ?? "Terjadi Kesalahan Server");
    }
  };

  const handleOnLoadImage = (capture) => {
    setCaptureImage(capture.id);
    handleOpenModalFormModal("check-in-form");
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      >
        <FeatherIcon icon="x" />
      </IconButton>
    </>
  );

  return (
    <Box position="fixed" bottom={0} left={0} width="100%">
      {openFormModal ? (
        <CheckInModal
          open={openFormModal}
          modalType={modalTypeFormModal}
          onClose={handleCloseFormModal}
          onCheckIn={handleCheckIn}
        />
      ) : null}
      {openModal ? (
        <CheckInCameraModal
          open={openModal}
          modalType={modalType}
          onClose={handleCloseModal}
          onLoadImage={handleOnLoadImage}
        />
      ) : null}
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <LoadingSpinner show={showLoading} />
      <Box
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background:
            "linear-gradient(0deg, #FFFFFF 28.77%, rgba(255, 255, 255, 0) 100%)",
        }}
      >
        {!isCheckinToday ? (
          <Button
            onClick={openDrawer}
            variant="contained"
            sx={{
              height: "50px",
              background: "#1BA0E2",
              borderRadius: "100px",
              fontSize: "20px",
              fontWeight: 600,
              alignItems: "center",
            }}
          >
            <FeatherIcon
              icon="log-in"
              style={{
                marginRight: "8px",
              }}
            />
            Absen Masuk
          </Button>
        ) : !lastActivity?.time_out ? (
          <Button
            onClick={handleCheckOut}
            variant="contained"
            sx={{
              height: "50px",
              background: "#ff5252",
              borderRadius: "100px",
              fontSize: "20px",
              fontWeight: 600,
              alignItems: "center",
            }}
          >
            <FeatherIcon
              icon="log-out"
              style={{
                marginRight: "8px",
              }}
            />
            Absen Keluar
          </Button>
        ) : null}
      </Box>
      {alertModal ? (
        <BaseModal
          open={alertModal}
          closeModalHandler={alertHandleClose}
          message="Lokasi harus diizinkan"
          sxMessage={{
            fontWeight: 700,
          }}
        />
      ) : null}
      {openCameraModal ? (
        <BaseModal
          open={openCameraModal}
          closeModalHandler={handleCloseCameraModal}
          message="Akses kamera harus diizinkan"
          sxMessage={{
            fontWeight: 700,
          }}
        />
      ) : null}
    </Box>
  );
};

export default CheckInButton;
