import * as Yup from "yup";

const clientValidation = Yup.object().shape({
  client_name: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nama klien wajib diisi")
    .nullable(),
  client_email: Yup.string().nullable(true),
  contact: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("No telp PIC wajib diisi")
    .nullable(),
  status_called: Yup.string().nullable(true),
  last_called: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Terakhir Dihubungi wajib diisi")
    .nullable(),
  description: Yup.string().nullable(true),
  under_dika: Yup.string().nullable(true),
});

export default clientValidation;
