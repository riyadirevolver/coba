import { useFormik } from "formik";
import React from "react";

import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import * as Yup from "yup";

import FeatherIcon from "feather-icons-react";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import useFetchFilterSkills from "../../../hooks/fetch/useFetchFilterSkills";
import useFetchFilterInterestPosition from "../../../hooks/fetch/useFetchFilterInterestPosition";

const upTransition = Transition("up");

const FilterPersonJCModal = ({ open = false, closeModalHandler, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [skill, setSkill] = React.useState([]);
  const [interestPosition, setInterestPosition] = React.useState([]);

  const queryParameters = {};

  const concatFilters = skill.concat(interestPosition);
  concatFilters.map((x, i) => {
    const query = `$or[${i}][${x.field}][$like]`;
    const queryValue = `%${x.value}%`;
    queryParameters[query] = queryValue;
  });

  const {
    setOpenFilterSkills,
    filterSkillsList,
    openFilterSkills,
    loadingFilterSkills,
  } = useFetchFilterSkills();
  const {
    setOpenFilterInterestPosition,
    filterInterestPositionList,
    openFilterInterestPosition,
    loadingFilterInterestPosition,
  } = useFetchFilterInterestPosition();

  const autoCompleteOnChangeSkill = (event, newValue) => {
    if (typeof newValue === "string") {
      setSkill({
        field: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      setSkill({
        field: newValue.inputValue,
      });
    } else {
      const mapInputValue = newValue.map((value) => {
        if (value.inputValue) {
          value.field = value.inputValue;
        }
        return value;
      });
      setSkill(mapInputValue);
    }
  };
  const autoCompleteOnChangeInterestPositions = (event, newValue) => {
    if (typeof newValue === "string") {
      setInterestPosition({
        field: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      setInterestPosition({
        field: newValue.inputValue,
      });
    } else {
      const mapInputValue = newValue.map((value) => {
        if (value.inputValue) {
          value.field = value.inputValue;
        }
        return value;
      });
      setInterestPosition(mapInputValue);
    }
  };

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

  const formik = useFormik({
    initialValues: {
      batch: "",
    },
    validationSchema: Yup.object().shape({
      batch: Yup.string().nullable(true),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { batch } = values;
        router.replace({
          query: {
            ...router.query,
            ...queryParameters,
            ...(batch && {
              batch: batch,
            }),
            // "$or[0][skills][$like]": "%makan%",
            // "$or[1][skills][$like]": "%Javascript%",
          },
        });
        handleReset();
        openSnackBar("Berhasil filter user Juara Coding");
        closeModalHandler();
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setSkill([]);
    setInterestPosition([]);
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
        open={open && type === "filter"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Filter User Juara Coding
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="batch">Batch</CustomFormLabel>
              <CustomTextField
                id="batch"
                name="batch"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("batch")}
                error={formik.touched.batch && !!formik.errors.batch}
                helperText={formik.touched.batch && formik.errors.batch}
              />
              <CustomFormLabel htmlFor="input-placement">
                Bahasa Pemograman
              </CustomFormLabel>
              <Autocomplete
                multiple
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={filterSkillsList}
                getOptionLabel={(option) => option.value}
                loading={loadingFilterSkills}
                open={openFilterSkills}
                onOpen={() => {
                  setOpenFilterSkills(true);
                }}
                onClose={() => {
                  setOpenFilterSkills(false);
                }}
                onChange={autoCompleteOnChangeSkill}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    size="small"
                    placeholder="Pilih Bahasa Pemograman"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingFilterSkills ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <CustomFormLabel htmlFor="input-placement">
                Posisi yang diminati
              </CustomFormLabel>
              <Autocomplete
                multiple
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={filterInterestPositionList}
                getOptionLabel={(option) => option.value}
                loading={loadingFilterInterestPosition}
                open={openFilterInterestPosition}
                onOpen={() => {
                  setOpenFilterInterestPosition(true);
                }}
                onClose={() => {
                  setOpenFilterInterestPosition(false);
                }}
                onChange={autoCompleteOnChangeInterestPositions}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    size="small"
                    placeholder="Pilih Posisi yang diminati"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingFilterInterestPosition ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" type="submit">
              {"Filter"}
            </Button>
            <Button
              onClick={() => {
                closeModalHandler();
                handleReset();
              }}
              color="secondary"
            >
              Batal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FilterPersonJCModal.defaultProps = {
  open: false,
};
FilterPersonJCModal.propTypes = {
  open: PropTypes.bool,
};
export default FilterPersonJCModal;
