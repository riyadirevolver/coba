import React, { useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    IconButton,
    TextField,
    Divider,
    Typography,
    Box,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editCompanyForm } from "../../../validations/company";

const upTransition = Transition("up");

const EditCompany = ({
    open = false,
    closeModalHandler,
    type,
    dataCompany,
}) => {
    
    const router = useRouter();
    const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editCompanyForm),
    });
    
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

    const onSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        try {
            const {target} = event;
            const {name, industry} = target;
            const payload = {
                name: name.value,
                industry: industry.value,
            };
            await axios.patch(`/api/company/${dataCompany.id}`, payload);
            setLoading(false);
            openSnackBar("Berhasil menambahkan data company setting");
            closeModalHandler();
            router.replace(router.pathname);
            router.reload();
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
                <form onSubmit={onSubmit}>
                    <DialogTitle id="alert-dialog-slide-title" variant="h4">
                        Edit Company Setting
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-slide-description"
                            component="div"
                        >
                            <Box mb={3}>
                                <CustomFormLabel htmlFor="companyName">
                                    Company Name
                                </CustomFormLabel>
                                <TextField
                                    required
                                    name="name"
                                    id="name"
                                    defaultValue={dataCompany.name}
                                    type="text"
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                   
                                />

                                <CustomFormLabel htmlFor="industry">
                                    Industry
                                </CustomFormLabel>
                                <TextField
                                    required
                                    id="industry"
                                    name="industry"
                                    defaultValue={dataCompany.industry}
                                    type="text"
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                 
                                />
                                <CustomFormLabel htmlFor="companyCode">
                                    Company Code
                                </CustomFormLabel>
                                <TextField
                                    required
                                    name="companyCode"
                                    defaultValue={dataCompany.company_code}
                                    type="text"
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    disabled
                                />
                            </Box>
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

EditCompany.defaultProps = {
    open: false,
};
EditCompany.propTypes = {
    open: PropTypes.bool,
};
export default EditCompany;
