import * as yup from 'yup';

export const energyUsageValidationSchema = yup.object().shape({
  energy_consumption: yup.number().integer().required(),
  timestamp: yup.date().required(),
  user_id: yup.string().nullable().required(),
});
