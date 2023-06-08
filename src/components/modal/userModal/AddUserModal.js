import React, { useState } from "react";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    IconButton,
    MenuItem,
    Grid,
    Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";
// import { register } from "../../../../lib/services/user";
import PropTypes from "prop-types";
import axios from "axios";
import BaseService from "../../../services/base";
const upTransition = Transition("up");

const AddUserModal = ({ open = false, closeModalHandler, type }) => {
    const router = useRouter();
    const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const service = new BaseService("users");

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

    const create = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const { target } = event;
            const { nama_user, email, password } = target;

            const data = {
                fullname: nama_user.value,
                email: email.value,
                password: password.value,
            };
            // await service.post('a');
            await axios.post("/api/users", data);
            setLoading(false);
            openSnackBar("Berhasil menambahkan user");
            closeModalHandler();
            router.replace(router.pathname);
            return;
        } catch (error) {
            console.log(error);
            setLoading(false);
            openSnackBar("Gagal mendaftarkan user");
            return;
        }
    };

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
                open={open && type === "add"}
                TransitionComponent={upTransition}
                onClose={closeModalHandler}
                fullWidth
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <form onSubmit={create}>
                    <DialogTitle id="alert-dialog-slide-title" variant="h4">
                        Tambah User
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-slide-description"
                            component="div"
                        >
                            <CustomFormLabel htmlFor="nama_user">
                                Nama User
                            </CustomFormLabel>
                            <CustomTextField
                                required
                                id="nama_user"
                                name="nama_user"
                                fullWidth
                                size="small"
                                variant="outlined"
                            />
                            <CustomFormLabel htmlFor="email">
                                Email
                            </CustomFormLabel>
                            <CustomTextField
                                required
                                id="email"
                                name="email"
                                type="email"
                                fullWidth
                                size="small"
                                variant="outlined"
                            />
                            <CustomFormLabel htmlFor="password">
                                Password
                            </CustomFormLabel>
                            <CustomTextField
                                required
                                id="password"
                                name="password"
                                type="password"
                                fullWidth
                                size="small"
                                variant="outlined"
                            />
                        </DialogContentText>
                    </DialogContent>
                    
                    <DialogActions>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? "Submitting..." : "Tambah"}
                        </Button>
                        <Button onClick={closeModalHandler} color="secondary">
                            Batal
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

AddUserModal.defaultProps = {
    open: false,
};
AddUserModal.propTypes = {
    open: PropTypes.bool,
};
export default AddUserModal;
