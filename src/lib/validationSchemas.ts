import * as Yup from 'yup';
import { Locations } from '@prisma/client'; // Prisma enum for location

// Schema for adding a company (form uses idealSkill as comma-separated string)
export const AddCompanySchema = Yup.object({
  name: Yup.string().required('Name is required'),
  location: Yup.string().required('Location is required'),
  salary: Yup.number()
    .typeError('Salary must be a number')
    .required('Salary is required'),
  overview: Yup.string().required('Overview is required'),
  jobs: Yup.string().required('Jobs list is required'),
  contacts: Yup.string().required('Contact info is required'),
  idealSkill: Yup.string().required('Ideal skills are required'), // stored as comma-separated string
  category: Yup.string().required('Category is required'), // New field
});

// Schema for editing a company (idealSkill is array of strings)
export const EditCompanySchema = Yup.object({
  id: Yup.number().required('ID is required'),
  name: Yup.string().required('Name is required'),
  salary: Yup.number().required('Salary is required'),
  overview: Yup.string().required('Overview is required'),
  location: Yup.mixed<Locations>()
    .oneOf(Object.values(Locations))
    .required('Location is required'),
  jobs: Yup.string().required('Jobs list is required'),
  contacts: Yup.string().required('Contact info is required'),
  idealSkill: Yup.array()
    .of(Yup.string().required('Each skill must be a string'))
    .required('Ideal skills are required')
    .min(1, 'You must provide at least one skill'),
  userId: Yup.number().required('User ID is required'),
  category: Yup.string().required('Category is required'), // New field
});

// Schema for editing student profile
export const EditStudentSchema = Yup.object({
  id: Yup.string().required('ID is required'),
  email: Yup.string().email('Valid email is required').required('Email is required'),
  fullName: Yup.string().required('Full name is required'),
  location: Yup.string().required('Location is required'),
  skills: Yup.array()
    .of(Yup.string().required('Each skill must be a string'))
    .required('Skills are required')
    .min(1, 'Please select at least one skill'),
  interests: Yup.string(),
  major: Yup.string().required('Major is required'),
  portfolio: Yup.string().url('Must be a valid URL'),
  image: Yup.string().url('Image must be a valid URL'),
});
