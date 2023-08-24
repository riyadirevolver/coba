import * as Yup from "yup";

const userValidation = Yup.object().shape({
  nik: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("NIK wajib diisi"),
  fullname: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nama wajib diisi")
    .nullable(),
  email: Yup.string().nullable(true),
  phone: Yup.number()
    .typeError("Itu tidak terlihat seperti nomor telepon")
    .positive("Nomor telepon tidak dapat dimulai dengan tanda minus")
    .integer("Nomor telepon tidak boleh menyertakan koma desimal")
    .required("Telepon wajib diisi"),
  role: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Role wajib diisi"),
});

export default userValidation;
