import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import moment from "moment";
import { absenTypes } from "../../../constants/absentTypes";
import NoteIcon from "@mui/icons-material/Note";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkIn } from "../../../validations/checkInValidations";
import { webPermissions } from "../../../constants/webPermissions";
import BaseModal from "../baseModal/BaseModal";
import useHandleModal from "../../../hooks/useHandleModal";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  transition: "all 1s",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function CheckInModal({ open, onClose, onCheckIn, ...props }) {
  const { window } = props;

  const {
    openModal: alertModal,
    modalType: alertModalType,
    handleCloseModal: alertHandleClose,
    handleOpenModal: alertHandleOpen,
  } = useHandleModal(false);

  const toggleDrawer = (newOpen) => () => {
    onClose(newOpen);
  };
  const [absenForm, setAbsentForm] = React.useState({
    is_wfh: false,
    notes: "",
  });

  const { handleSubmit, register } = useForm({
    resolver: yupResolver(checkIn),
  });

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const onHandleCheckIN = (values) => {
    onCheckIn(values);
  };

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
            display: "flex",
            justifyContent: "center",
          },
        }}
      />
      <Box sx={{ textAlign: "center", pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            visibility: open ? "visible" : "hidden",
            right: 0,
            left: 0,
            backgroundColor: "white",
            height: "100%",
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <form onSubmit={handleSubmit(onHandleCheckIN)}>
            <FormControl
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                mb: 3,
              }}
            >
              <Box
                px={1}
                sx={{
                  borderBottom: "1px solid #949494",
                }}
              >
                <AccessTimeIcon color="primary" />
              </Box>

              <TextField
                label="Jam Absen"
                variant="standard"
                value={moment().format("HH:mm")}
                fullWidth
              />
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                mb: 3,
              }}
            >
              <Box
                px={1}
                sx={{
                  borderBottom: "1px solid #949494",
                }}
              >
                <DynamicFeedIcon color="primary" />
              </Box>
              <Box width="100%" position="relative">
                <InputLabel
                  id="is_wfh"
                  sx={{
                    left: 0,
                  }}
                >
                  Tipe Absen
                </InputLabel>
                <Select
                  variant="standard"
                  {...register("is_wfh")}
                  labelId="is_wfh"
                  value={absenForm.is_wfh}
                  onChange={(e) =>
                    setAbsentForm({ ...absenForm, is_wfh: e.target.value })
                  }
                  fullWidth
                >
                  {absenTypes.map((v, idx) => (
                    <MenuItem key={idx} value={v.tValue}>
                      {v.tLabel}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                mb: 3,
              }}
            >
              <Box
                px={1}
                sx={{
                  borderBottom: "1px solid #949494",
                }}
              >
                <NoteIcon color="primary" />
              </Box>
              <Box width="100%" position="relative">
                <InputLabel
                  id="wfh"
                  sx={{
                    left: 0,
                  }}
                >
                  Note
                </InputLabel>
                <Input
                  {...register("notes")}
                  name="notes"
                  value={absenForm.notes}
                  onChange={(e) =>
                    setAbsentForm({ ...absenForm, notes: e.target.value })
                  }
                  fullWidth
                />
              </Box>
            </FormControl>
            <Button
              // onClick={() =>
              //   onCheckIn({
              //     absenForm,
              //   })
              // }
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                height: 50,
              }}
            >
              Absen Masuk
            </Button>
          </form>
        </StyledBox>
      </SwipeableDrawer>
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
    </Root>
  );
}
