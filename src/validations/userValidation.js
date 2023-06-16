import * as Yup from "yup";

const userValidation = Yup.object().shape({
  nik: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("NIK wajib diisi"),
  fullname: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Last Called wajib diisi")
    .nullable(),
  email: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Email wajib diisi")
    .nullable(),
  phone: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Telepon wajib diisi"),
  role: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Role wajib diisi"),
});

export default userValidation;
