import * as Yup from "yup";

const personJCValidation = Yup.object().shape({
  fullname: Yup.string().required("Nama wajib diisi").nullable(),
  email: Yup.string().required("Email wajib diisi").nullable(),
  date_of_birth: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Tanggal lahir wajib diisi")
    .nullable(),
  number_id: Yup.string()
    .max(20, "Input melebihi batas maksimal")
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
    .required("Pendidikan terakhir wajib diisi")
    .nullable(),
  school_name: Yup.string().required("Nama Sekolah wajib diisi").nullable(),
  ipk_value: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Nilai IPK wajib diisi")
    .nullable(),
  majoring: Yup.string().required("Jurusan wajib diisi").nullable(),
  job_experience: Yup.string()
    .required("Pengalaman kerja wajib diisi")
    .nullable(),
  company_name: Yup.string().nullable(true),
  last_position: Yup.string().nullable(true),
  join_date: Yup.string().required("Join Date wajib diisi").nullable(),
  nipp_code: Yup.string().nullable(true),
  facebook: Yup.string().nullable(true),
  instagram: Yup.string().nullable(true),
  linkedin: Yup.string().nullable(true),
  nilai_accurate: Yup.string()
    .required("Nilai Accurate wajib diisi")
    .nullable(),
  nilai_cognitive: Yup.string()
    .required("Nilai Cognitive wajib diisi")
    .nullable(),
  nilai_proactive: Yup.string()
    .required("Nilai Proactive wajib diisi")
    .nullable(),
  class_id: Yup.string().nullable(true),
  channel_payment: Yup.string().nullable(true),
  bootcamp_status: Yup.string().nullable(true),
});

export default personJCValidation;
