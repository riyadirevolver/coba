import * as Yup from "yup";

export const editTimeOuteValidation = Yup.object().shape({
  id: Yup.string().uuid().required(),
  time_out: Yup.date().required("Date must be fullfilled"),
});
