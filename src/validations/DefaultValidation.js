import * as Yup from 'yup';

export const textFieldValidation = (label, min = 2) =>
  Yup.string().required().min(min, `${label} Minimal ${min} Characters`);

export const SelectTextFieldValidation = (label) =>
  Yup.string().nullable().required(`${label} must be selected!`);

export const SelectBooleanFieldValidation = (label) =>
  Yup.boolean().nullable().required(`${label} must be selected!`);

export const numberFieldValidation = (label, min = 0) =>
  Yup.number()
    .typeError(`${label} must be filled!`)
    .required(`${label} must be filled!`)
    .min(min, `${label} cant be less than ${min}`);

export const emailFieldValidation = (label) =>
  Yup.string()
    .email('email must be valid!')
    .required(`${label} must be fullfilled!`);

export const nikFieldValidation = (label, min = 1) =>
  Yup.number()
    .typeError(`${label} must be number!`)
    .min(min, `${label} more than ${min}`)
    .isRequired();
