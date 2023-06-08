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

const AddCompanySetting = ({
    open = false,
    closeModalHandler,
    type,
    dataCompany,
}) => {
    const router = useRouter();
    const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [companyId, setCompanyId] = useState(null);
    const [maxRadius, setMaxRadius] = useState(0);

    const service = new BaseService("company");

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
                company_id: companyId.id,
                max_radius: maxRadius,
            };
            // await service.post('a');
            await axios.post("/api/company-setting", payload);
            setLoading(false);
            openSnackBar("Berhasil menambahkan data company setting");
            setCompanyId(null);
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
                open={open && type === "add"}
                TransitionComponent={upTransition}
                onClose={closeModalHandler}
                fullWidth
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <form onSubmit={create}>
                    <DialogTitle id="alert-dialog-slide-title" variant="h4">
                        Add Company Setting
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-slide-description"
                            component="div"
                        >
                            <CustomFormLabel htmlFor="nama_user">
                                Company
                            </CustomFormLabel>
                            <Autocomplete
                                options={dataCompany}
                                name="company"
                                size="small"
                                value={companyId}
                                fullWidth
                                onChange={(e, value) => setCompanyId(value)}
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        {option.name}
                                    </Box>
                                )}
                                renderInput={(field) => (
                                    <TextField {...field} label="company" />
                                )}
                            />
                            <CustomFormLabel htmlFor="email">
                                Max Radius
                            </CustomFormLabel>
                            <CustomTextField
                                required
                                id="max-radius"
                                name="max-radius"
                                type="number"
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

AddCompanySetting.defaultProps = {
    open: false,
};
AddCompanySetting.propTypes = {
    open: PropTypes.bool,
};
export default AddCompanySetting;
