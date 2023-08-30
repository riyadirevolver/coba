import * as Yup from "yup";

const candidateSentValidation = Yup.object().shape({
  status: Yup.string().nullable(),
  notes: Yup.string().nullable(),
  test_date: Yup.string().nullable(),
  interview_date: Yup.string().nullable(),
});

export default candidateSentValidation;
