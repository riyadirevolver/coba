import * as Yup from "yup";

const candidateSentValidation = Yup.object().shape({
  status: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Role wajib diisi"),
  notes: Yup.string()
    .max(30, "Input melebihi batas maksimal")
    .required("Catatan wajib diisi"),
  test_date: Yup.string().nullable(),
  interview_date: Yup.string().nullable(),
});

export default candidateSentValidation;
