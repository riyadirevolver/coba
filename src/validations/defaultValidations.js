import * as yup from "yup";

export const TextFieldValidation = (label) =>
  yup.string().required(`${label} harus diisi!`);
