import * as Yup from "yup";

const clientValidation = Yup.object().shape({
  client_name: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nama klien wajib diisi")
    .nullable(),
  contact: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("No telp PIC wajib diisi")
    .nullable(),
  last_called: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Terakhir Dihubungi wajib diisi")
    .nullable(),
  description: Yup.string().nullable(),
});

export default clientValidation;
