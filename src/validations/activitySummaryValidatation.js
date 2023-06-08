import * as Yup from "yup";
import { TextFieldValidation } from "./defaultValidations";

export const editTimeOuteValidation = Yup.object().shape({
  month: TextFieldValidation("month"),
  year: TextFieldValidation(yeaar),
});
