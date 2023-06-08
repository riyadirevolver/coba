import * as yup from "yup";

export const searchUser = yup
  .object({
    search: yup.string(),
  })
  .required();
