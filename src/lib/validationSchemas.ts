import * as Yup from 'yup';

export const AddCompanySchema = Yup.object({
  name: Yup.string().required(),
  salary: Yup.number().required(),
  overview: Yup.string().required(),
  location: Yup.string().required(),
  jobs: Yup.string().required(),
  contacts: Yup.string().required(),
  idealSkill: Yup.array().required(),
});

export const EditCompanySchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  salary: Yup.number().required(),
  overview: Yup.string().required(),
  location: Yup.string().required(),
  jobs: Yup.string().required(),
  contacts: Yup.string().required(),
  idealSkill: Yup.array().required(),
});

export const EditStudentSchema = Yup.object({
  id: Yup.string().required(),
  email: Yup.string().email().required(),
  fullName: Yup.string().required(),
  location: Yup.string().nullable(),
  skills: Yup.string().nullable(),
  image: Yup.string().nullable(),
});

export const AddCompanySchema = Yup.object({
  name: Yup.string().required('Name is required'),
  location: Yup.string().required('Location is required'),
  overview: Yup.string().required('Overview is required'),
  jobs: Yup.string().required('Jobs list is required'),
  contacts: Yup.string().required('Contact info is required'),
  owner: Yup.string().required(),
});
