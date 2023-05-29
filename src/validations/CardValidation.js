import * as Yup from 'yup';

export const AddCardValidation = Yup.object().shape({
  title: Yup.string().min(5, 'Title Harus lebih dari 5').required(),
  subtitle: Yup.string().min(5, 'Deskripsi Harus lebih dari 5'),
});
