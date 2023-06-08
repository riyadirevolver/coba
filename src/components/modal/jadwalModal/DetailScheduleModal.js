import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React from "react";
import useHandleModal from "../../../hooks/useHandleModal";
import { useSnackbar } from "../../../hooks/useSnackbar";

import FeatherIcon from "feather-icons-react";
import Transition from "../../transition";
const upTransition = Transition("up");

const DetailScheduleModal = ({
  open = false,
  closeModalHandler,
  type,
  data,
 
}) => {
  const router = useRouter();
  // modal ke panggil
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      >
        <FeatherIcon icon="x" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <Dialog
        open={open && type === "detail"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" variant="h4">
          Detail Hari Kerja
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            component="div"
          >
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h5" textAlign="center">
                        Hari
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h5" textAlign="center">
                        Jadwal Shift
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                {/* data */}
                <TableBody>
                  {data?.workday?.sort((a, b) => (a.day - b.day)).map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="h6"
                          fontWeight="600"
                          textAlign="center"
                        >
                          {detail?.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="h6"
                          fontWeight="600"
                          textAlign="center"
                        >
                          {detail?.shifting?.name ?? "Libur"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModalHandler} color="secondary">
            Kembali
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailScheduleModal;
