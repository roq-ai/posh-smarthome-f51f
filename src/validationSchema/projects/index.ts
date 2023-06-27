import * as yup from 'yup';

export const projectValidationSchema = yup.object().shape({
  name: yup.string().required(),
  status: yup.string().required(),
  posh_smart_home_id: yup.string().nullable().required(),
});
