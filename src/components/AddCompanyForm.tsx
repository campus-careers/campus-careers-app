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

const onSubmit = async (data: {
  name: string;
  location: string;
  overview: string;
  jobs: string;
  contacts: string;
  owner: string;
}) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addCompany(data);
  swal('Success', 'Your company has been added', 'success', {
    timer: 2000,
  });
};

const AddCompanyForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddCompanySchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

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

                <input type="hidden" {...register('owner')} value={currentUser} />

                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        onClick={() => reset()}
                        variant="warning"
                        className="float-right"
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
