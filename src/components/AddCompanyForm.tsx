'use client';

import { useSession } from 'next-auth/react';
import { Button, Col, Container, Form, Row, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addCompany } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddCompanySchema } from '@/lib/validationSchemas';

type FormValues = {
  name: string;
  location: string;
  salary: number;
  overview: string;
  jobs: string;
  contacts: string;
  idealSkill: string;
};

const AddCompanyForm: React.FC = () => {
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(AddCompanySchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  if (session?.user?.randomKey !== 'ADMIN') {
    redirect('/unauthorized');
  }

  const onSubmit = async (data: FormValues) => {
    if (!session?.user?.id) {
      console.error('❌ User ID not found');
      swal('Error', 'User not authenticated. Please sign in again.', 'error');
      return;
    }

    try {
      const companyData = {
        name: data.name,
        salary: Number(data.salary),
        overview: data.overview,
        location: data.location,
        jobs: data.jobs,
        contacts: data.contacts,
        idealSkill: data.idealSkill.split(',').map((s) => s.trim()),
        userId: Number(session.user.id),
      };

      await addCompany(companyData);

      swal('Success', 'Company added successfully!', 'success');
      reset();
    } catch (error) {
      console.error('❌ Failed to add company:', error);
      swal('Error', 'Failed to add company. Please try again.', 'error');
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h3 className="text-center fw-bold">Add New Company</h3>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Company Name</Form.Label>
              <Form.Control {...register('name')} type="text" placeholder="e.g. Tech Corp" />
              {errors.name && <small className="text-danger">{errors.name.message}</small>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Location</Form.Label>
              <Form.Control {...register('location')} type="text" placeholder="e.g. California" />
              {errors.location && <small className="text-danger">{errors.location.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Salary</Form.Label>
              <Form.Control {...register('salary')} type="number" placeholder="e.g. 80000" />
              {errors.salary && <small className="text-danger">{errors.salary.message}</small>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Ideal Skills</Form.Label>
              <Form.Control {...register('idealSkill')} type="text" placeholder="e.g. Python, React" />
              <small className="text-muted">Separate with commas</small>
              {errors.idealSkill && <small className="text-danger">{errors.idealSkill.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Overview</Form.Label>
              <Form.Control {...register('overview')} as="textarea" rows={3} />
              {errors.overview && <small className="text-danger">{errors.overview.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Jobs</Form.Label>
              <Form.Control {...register('jobs')} type="text" placeholder="e.g. Frontend Developer, Data Analyst" />
              {errors.jobs && <small className="text-danger">{errors.jobs.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Contacts</Form.Label>
              <Form.Control {...register('contacts')} type="text" placeholder="e.g. hr@company.com, (123) 456-7890" />
              {errors.contacts && <small className="text-danger">{errors.contacts.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Button type="submit" variant="primary" className="fw-semibold w-100">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddCompanyForm;
