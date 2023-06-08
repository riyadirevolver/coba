import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { Box } from "@mui/system";
import axios from "axios";
import Dropdown from "../../forms/Dropdown/Dropdown";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";

const FilterModal = ({ open = false, type, closeModalHandler }) => {
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { handleSubmit, control } = useForm();

  const [departements, setDepartements] = useState([]);
  const [jobLevel, setJobLevel] = useState([]);
  const [employeeType, setEmployeeType] = useState([]);
  const [jobPosition, setJobPosition] = useState([]);
  const [locationPoint, setLocationPoint] = useState([]);

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

  const fetchDepartements = async () => {
    const res = await axios.get("/api/filter-user/departements");
    setDepartements(res.data);
  };
  const fetchJobLevel = async () => {
    const res = await axios.get("/api/filter-user/joblevels");
    setJobLevel(res.data);
  };
  const fetchEmployeeType = async () => {
    const res = await axios.get("/api/filter-user/employee-type");
    setEmployeeType(res.data);
  };
  const fetchJobPosition = async () => {
    const res = await axios.get("/api/filter-user/job-position");
    setJobPosition(res.data);
  };
  const fetchLocationPoint = async () => {
    const res = await axios.get("/api/filter-user/locations");
    setLocationPoint(res.data);
  };

  useEffect(() => {
    fetchDepartements();
    fetchJobLevel();
    fetchEmployeeType();
    fetchJobPosition();
    fetchLocationPoint();
  }, []);

  const create = (data) => {
    const keys = Object.keys(data);
    const newParams = {};

    keys.forEach((element, idx) => {
      switch (element) {
        case keys[idx]:
          if (data[element].length > 1) {
            newParams[element] = data[element];
          }
          break;
        default:
          break;
      }
    });
    router.replace(
      {
        query: {
          ...newParams,
          page : 1
        },
      },
      null,
      { shallow: true }
    );
    setTimeout(() => {
      router.reload(window.location.pathname);
    }, 2000);
    closeModalHandler();
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
        fullWidth={true}
        maxWidth="md"
        onClose={closeModalHandler}
      >
        <form onSubmit={handleSubmit(create)}>
          <DialogTitle variant="h4">Filter User</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column">
              <Box>
                <Typography variant="body1" mb={3}>
                  Filter by
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" mb={3}>
                <Dropdown
                  control={control}
                  name="job_departement_id"
                  label="Departement"
                  options={departements}
                />
              </Box>
              <Box display="flex" flexDirection="column" mb={3}>
                <Dropdown
                  control={control}
                  name="job_level_id"
                  label="Job Level"
                  options={jobLevel}
                />
              </Box>
              <Box display="flex" flexDirection="column" mb={3}>
                <Dropdown
                  control={control}
                  name="employee_type_id"
                  label="Tipe Karyawan"
                  options={employeeType}
                />
              </Box>
              <Box display="flex" flexDirection="column" mb={3}>
                <Dropdown
                  control={control}
                  name="job_position_id"
                  label="Posisi Kerja"
                  options={jobPosition}
                />
              </Box>
              <Box display="flex" flexDirection="column" mb={3}>
                <Dropdown
                  control={control}
                  name="location_point_id"
                  label="Lokasi Kerja"
                  options={locationPoint}
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

export default FilterModal;
