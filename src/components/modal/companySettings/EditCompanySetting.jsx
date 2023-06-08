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
    Autocomplete,
    TextField,
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

const EditCompanySetting = ({
    open = false,
    closeModalHandler,
    type,
    dataCompany,
}) => {
    const router = useRouter();
    const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [maxRadius, setMaxRadius] = useState(0);

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
            const payload = {
                max_radius: maxRadius,
            };

            await axios.patch(
                `/api/company-setting/${dataCompany.company_id}`,
                payload
            );
            setLoading(false);
            openSnackBar("Berhasil menambahkan data company setting");
            closeModalHandler();
            router.replace(router.pathname);
        } catch (error) {
            console.log(error);
            setLoading(false);
            openSnackBar("Gagal menambahkan data company setting");
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
                open={open && type === "edit"}
                TransitionComponent={upTransition}
                onClose={closeModalHandler}
                fullWidth
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <form onSubmit={create}>
                    <DialogTitle id="alert-dialog-slide-title" variant="h4">
                        Edit Company Setting
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-slide-description"
                            component="div"
                        >
                            <CustomFormLabel htmlFor="nama_user">
                                Company
                            </CustomFormLabel>
                            <TextField
                                options={[dataCompany]}
                                name="company"
                                size="small"
                                value={dataCompany?.company?.name}
                                fullWidth
                                disabled
                            />
                            <CustomFormLabel htmlFor="email">
                                Max Radius
                            </CustomFormLabel>
                            <CustomTextField
                                required
                                id="max-radius"
                                name="max-radius"
                                type="number"
                                defaultValue={dataCompany?.max_radius}
                                fullWidth
                                onChange={(e) => setMaxRadius(e.target.value)}
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
                            {loading ? "Submitting..." : "Simpan"}
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

EditCompanySetting.defaultProps = {
    open: false,
};
EditCompanySetting.propTypes = {
    open: PropTypes.bool,
};
export default EditCompanySetting;
