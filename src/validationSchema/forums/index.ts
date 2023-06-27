import * as yup from 'yup';

export const forumValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  posh_smart_home_id: yup.string().nullable().required(),
});
