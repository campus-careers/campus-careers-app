'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
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
  idealSkill: string; // comma-separated
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
      reset(); // ✅ Clear the form after successful submission
    } catch (error) {
      console.error('❌ Failed to add company:', error);
      swal('Error', 'Failed to add company. Please try again.', 'error');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Company</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Fields */}
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <input
                    type="text"
                    {...register('location')}
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Salary</Form.Label>
                  <input
                    type="number"
                    {...register('salary')}
                    className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.salary?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Overview</Form.Label>
                  <textarea
                    {...register('overview')}
                    className={`form-control ${errors.overview ? 'is-invalid' : ''}`}
                    rows={3}
                  />
                  <div className="invalid-feedback">{errors.overview?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Jobs (comma-separated)</Form.Label>
                  <input
                    type="text"
                    {...register('jobs')}
                    className={`form-control ${errors.jobs ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.jobs?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Contacts (email, phone)</Form.Label>
                  <input
                    type="text"
                    {...register('contacts')}
                    className={`form-control ${errors.contacts ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.contacts?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Ideal Skills (comma-separated)</Form.Label>
                  <input
                    type="text"
                    {...register('idealSkill')}
                    className={`form-control ${errors.idealSkill ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.idealSkill?.message}</div>
                </Form.Group>

                <Form.Group className="form-group pt-3">
                  <Row>
                    <Col>
                      <Button type="submit" variant="primary" className="w-100">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        variant="warning"
                        className="w-100"
                        onClick={() => reset()}
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCompanyForm;
