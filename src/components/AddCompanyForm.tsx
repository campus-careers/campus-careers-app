'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { AddCompanySchema } from '@/lib/validationSchemas';

type FormValues = {
  name: string;
  location: string;
  salary: number;
  overview: string;
  jobs: string;
  contacts: string;
  idealSkill: string;
  category: string;
};

const defaultValues: FormValues = {
  name: '',
  location: '',
  salary: 0,
  overview: '',
  jobs: '',
  contacts: '',
  idealSkill: '',
  category: '',
};

const AddCompanyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(AddCompanySchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log('Submitted data:', data);
      alert('Company added successfully!');
    } catch (error) {
      alert('Failed to add company');
      console.error(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Form onSubmit={handleSubmit(onSubmit)} className="p-4 shadow-sm border rounded-4 bg-white">
            <h2 className="text-center mb-4">Add Company</h2>

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
              <Form.Select
                {...register('location')}
                isInvalid={!!errors.location}
              >
                <option value="">Select a location</option>
                <option value="California">California</option>
                <option value="New York">New York</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Texas">Texas</option>
                <option value="Remote">Remote</option>
              </Form.Select>
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

            <div className="text-center">
              <Button variant="primary" type="submit">
                Add Company
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCompanyForm;
