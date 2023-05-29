import * as Yup from 'yup';
import {
  SelectTextFieldValidation,
  textFieldValidation,
} from './DefaultValidation';

export const FieldValidationSchema = Yup.object().shape({
  name: textFieldValidation('name'),
  value: textFieldValidation('value'),
  type: SelectTextFieldValidation('type'),
});
