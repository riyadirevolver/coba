import * as Yup from "yup";

const personJCValidation = Yup.object().shape({
  fullname: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nama wajib diisi")
    .nullable(),
  email: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Email wajib diisi")
    .nullable(),
  date_of_birth: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Tanggal lahir wajib diisi")
    .nullable(),
  number_id: Yup.string()
    .max(16, "Input melebihi batas maksimal")
    .required("No. KTP wajib diisi"),
  batch: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Batch wajib diisi")
    .nullable(),
  mobile_phone_number: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("No. Telepon wajib diisi")
    .nullable(),
  education: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Pendidikan terakhir wajib diisi")
    .nullable(),
  school_name: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nama Sekolah wajib diisi")
    .nullable(),
  ipk_value: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nilai IPK wajib diisi")
    .nullable(),
  majoring: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Jurusan wajib diisi")
    .nullable(),
  job_experience: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Pengalaman kerja wajib diisi")
    .nullable(),
  company_name: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nama perusahaan wajib diisi")
    .nullable(),
  last_position: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Posisi terakhir wajib diisi")
    .nullable(),
  join_date: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Join Date wajib diisi")
    .nullable(),
  nipp_code: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Kode NIP wajib diisi")
    .nullable(),
  facebook: Yup.string().nullable(true),
  instagram: Yup.string().nullable(true),
  linkedin: Yup.string().nullable(true),
  nilai_accurate: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nilai Accurate wajib diisi")
    .nullable(),
  nilai_cognitive: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nilai Cognitive wajib diisi")
    .nullable(),
  nilai_proactive: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nilai Proactive wajib diisi")
    .nullable(),
  class_id: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Kelas wajib diisi")
    .nullable(),
  channel_payment: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Pembayaran wajib diisi")
    .nullable(),
  // role: Yup.string()
  //   .max(30, "Input melebihi batas maksimal")
  //   .required("Role wajib diisi"),
});

export default personJCValidation;
