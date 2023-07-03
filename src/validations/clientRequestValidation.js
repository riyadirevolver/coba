import * as Yup from "yup";

const clientRequestValidation = Yup.object().shape({
  position: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Position wajib diisi"),
  request_date: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Request Date wajib diisi")
    .nullable(),
  // salary: Yup.string()
  //   .max(30, "Input melebihi batas maksimal")
  //   .required("Gaji wajib diisi"),
  total_requirement: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Total Requirement wajib diisi"),
});

export default clientRequestValidation;
