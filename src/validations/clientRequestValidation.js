import * as Yup from "yup";

const clientRequestValidation = Yup.object().shape({
  position: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Position wajib diisi"),
  last_called: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Last Called wajib diisi")
    .nullable(),
  request_date: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Request Date wajib diisi")
    .nullable(),
  // salary: Yup.string()
  //   .max(30, "Input melebihi batas maksimal")
  //   .required("Salary wajib diisi"),
  total_requirement: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Total Requirement wajib diisi"),
});

export default clientRequestValidation;
