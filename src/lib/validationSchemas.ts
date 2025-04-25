import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStudentSchema = Yup.object({
  id: Yup.string().required(),
  email: Yup.string().email().required(),
  fullName: Yup.string().required(),
  location: Yup.string().nullable(),
  skills: Yup.string().nullable(),
  image: Yup.string().nullable(),
});
