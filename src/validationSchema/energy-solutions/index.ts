import * as yup from 'yup';

export const energySolutionValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  provider_id: yup.string().nullable().required(),
});
