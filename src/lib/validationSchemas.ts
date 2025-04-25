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
