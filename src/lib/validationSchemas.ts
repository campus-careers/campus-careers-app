import * as Yup from 'yup';

// Matches AddCompanyForm.tsx — idealSkill is a string input (comma-separated)
export const AddCompanySchema = Yup.object({
  name: Yup.string().required('Name is required'),
  location: Yup.string().required('Location is required'),
  salary: Yup.number()
    .typeError('Salary must be a number')
    .required('Salary is required'),
  overview: Yup.string().required('Overview is required'),
  jobs: Yup.string().required('Jobs list is required'),
  contacts: Yup.string().required('Contact info is required'),
  idealSkill: Yup.string().required('Ideal skills are required'), // input is comma-separated string
});

// Used for editing an existing company (idealSkill is treated as array)
export const EditCompanySchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required('Name is required'),
  salary: Yup.number().required('Salary is required'),
  overview: Yup.string().required('Overview is required'),
  location: Yup.string().required('Location is required'),
  jobs: Yup.string().required('Jobs list is required'),
  contacts: Yup.string().required('Contact info is required'),
  idealSkill: Yup.array()
    .of(Yup.string().required('Each skill must be a string'))
    .required('Ideal skills are required')
    .min(1, 'You must provide at least one skill'),
});

// Used for editing student data
export const EditStudentSchema = Yup.object({
  id: Yup.string().required(),
  email: Yup.string().email().required('Valid email is required'),
  fullName: Yup.string().required('Full name is required'),
  location: Yup.string().nullable(),
  skills: Yup.string().nullable(),
  image: Yup.string().nullable(),
});
