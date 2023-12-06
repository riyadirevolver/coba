import * as Yup from "yup";

const clientValidation = Yup.object().shape({
  client_name: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nama klien wajib diisi")
    .nullable(),
  client_email: Yup.string().nullable(true),
  contact: Yup.number()
    .typeError("Itu tidak terlihat seperti nomor telepon")
    .positive("Nomor telepon PIC tidak dapat dimulai dengan tanda minus")
    .integer("Nomor telepon PIC tidak boleh menyertakan koma desimal")
    .nullable(true),
  status_called: Yup.string().nullable(true),
  last_called: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Terakhir Dihubungi wajib diisi")
    .nullable(),
  description: Yup.string().nullable(true),
  under_dika: Yup.string().nullable(true),
});

export default clientValidation;
