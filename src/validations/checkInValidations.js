import * as Yup from "yup";

export const checkIn = Yup.object().shape({
  is_wfh: Yup.boolean().required(),
  notes: Yup.string(),
});