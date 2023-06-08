import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import useFetch from "../../../hooks/useFetch";

import debounce from "lodash.debounce";

const FilterActivityModal = ({ open = false, type, closeModalHandler }) => {
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [inputOn, setInputOn] = useState("");

  const { handleSubmit, control } = useForm();

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      ></IconButton>
    </React.Fragment>
  );

  const create = (data) => {
    router.replace({
      query: {
        ...router.query,
        job_departement_id: data.job_departement.id,
      },
    });
    refetch();
    closeModalHandler();
  };

  const {
    data: dataOvertime,
    fetched,
    refetch,
    loading: loadingOvertime,
    fetchWithParams,
  } = useFetch("/api/departements");

  const handleInputChange = debounce((v) => {
    if (v) {
      fetchWithParams({
        "name[$like]": `%${v}%`,
      });
    } else {
      refetch();
    }
  }, 200);

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
        fullWidth={true}
        maxWidth="md"
        onClose={closeModalHandler}
      >
        <form onSubmit={handleSubmit(create)}>
          <DialogTitle variant="h4">Filter By</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column">
              <Box display="flex" flexDirection="column" mb={3}>
                <FormLabel>Job Departement</FormLabel>
                <Controller
                  control={control}
                  name="job_departement"
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <Autocomplete
                        {...field}
                        id="job_departement"
                        freeSolo
                        getOptionLabel={(option) => option.name || ""}
                        isOptionEqualToValue={(o, v) => o.name === v.name}
                        options={
                          fetched && dataOvertime ? dataOvertime.data.data : []
                        }
                        size="small"
                        onChange={(event, item) => {
                          field?.onChange(item);
                        }}
                        inputValue={inputOn}
                        onInputChange={(props, val) => {
                          handleInputChange(val);
                          setInputOn(val);
                        }}
                        loading={loadingOvertime}
                        renderOption={(options, t) => (
                          <li {...options}> {t.name}</li>
                        )}
                        renderInput={(props) => {
                          return <TextField {...props} />;
                        }}
                      />
                    );
                  }}
                />
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeModalHandler} color="secondary">
              Batal
            </Button>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
            >
              {loading ? "Menerapkan..." : "Terapkan"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default FilterActivityModal;
