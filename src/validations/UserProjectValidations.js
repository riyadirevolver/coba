import * as Yup from 'yup';
export const userProjectSchema = Yup.object().shape({
  user_id: Yup.string().uuid().required('Required'),
  project_id: Yup.string().uuid().required('Required'),
  is_owner: Yup.boolean().required('Required'),
  can_add_column: Yup.boolean().required('Required'),
  can_add_card: Yup.boolean().required('Required'),
});
