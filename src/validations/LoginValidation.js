import Lang from 'lang/lang';
import * as Yup from 'yup';

const loginValidation = Yup.object().shape({
  nik: Yup.string()
    .max(255, 'Input melebihi batas maksimal')
    .required(`NIK ${Lang['notEmpty']}`),
  password: Yup.string()
    .max(255, 'Input melebihi batas maksimal')
    .required(`Password ${Lang['notEmpty']}`),
});

export default loginValidation;
