'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Form, Alert } from 'react-bootstrap';
import { AddCompanySchema } from '@/lib/validationSchemas';

type FormValues = {
  name: string;
  location: string;
  salary: number;
  overview: string;
  jobs: string;
  contacts: string;
  idealSkill: string;
  category: string; // New field for category
};

const defaultValues: FormValues = {
  name: '',
  location: '',
  salary: 0,
  overview: '',
  jobs: '',
  contacts: '',
  idealSkill: '',
  category: '', // Default value for category
};

const AddCompanyForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(AddCompanySchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log('Submitted data:', data);
      // Replace with actual API call
      alert('Company added successfully!');
    } catch (error) {
      alert('Failed to add company');
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          {...register('name')}
          placeholder="Enter company name"
          isInvalid={!!errors.name}
        />
        {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          {...register('location')}
          placeholder="Enter location"
          isInvalid={!!errors.location}
        />
        {errors.location && <Form.Text className="text-danger">{errors.location.message}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Salary</Form.Label>
        <Form.Control
          {...register('salary')}
          type="number"
          placeholder="Enter salary"
          isInvalid={!!errors.salary}
        />
        {errors.salary && <Form.Text className="text-danger">{errors.salary.message}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Overview</Form.Label>
        <Form.Control
          {...register('overview')}
          placeholder="Enter company overview"
          isInvalid={!!errors.overview}
        />
        {errors.overview && <Form.Text className="text-danger">{errors.overview.message}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Jobs</Form.Label>
        <Form.Control
          {...register('jobs')}
          placeholder="Enter job titles"
          isInvalid={!!errors.jobs}
        />
        {errors.jobs && <Form.Text className="text-danger">{errors.jobs.message}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contacts</Form.Label>
        <Form.Control
          {...register('contacts')}
          placeholder="Enter contact information"
          isInvalid={!!errors.contacts}
        />
        {errors.contacts && <Form.Text className="text-danger">{errors.contacts.message}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Ideal Skills</Form.Label>
        <Form.Control
          {...register('idealSkill')}
          placeholder="Enter ideal skills (comma separated)"
          isInvalid={!!errors.idealSkill}
        />
        {errors.idealSkill && <Form.Text className="text-danger">{errors.idealSkill.message}</Form.Text>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          {...register('category')}
          placeholder="Enter category"
          isInvalid={!!errors.category}
        />
        {errors.category && <Form.Text className="text-danger">{errors.category.message}</Form.Text>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Company
      </Button>
    </Form>
  );
};

export default AddCompanyForm;
