/* eslint-disable import/extensions */

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

// eslint-disable-next-line max-len
const onSubmit = async (data: { name: string; salary: number; overview: string; location: string; jobs: string; contacts: string; idealSkill: string[] }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addCompany(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const AddCompanyForm: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddCompanyForm', status, session);
  // const currentUser = session?.user?.email || '';
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
                    required
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
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
                  <input
                    type="field"
                    {...register('overview')}
                    required
                    className={`form-control ${errors.overview ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.overview?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Jobs</Form.Label>
                  <input
                    type="text"
                    {...register('jobs')}
                    required
                    className={`form-control ${errors.jobs ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.jobs?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Contact</Form.Label>
                  <input
                    type="text"
                    {...register('contacts')}
                    required
                    className={`form-control ${errors.contacts ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.contacts?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Suggested Skills</Form.Label>
                  <input
                    type="checkbox"
                    id="engLicense"
                    value="engLicense"
                    {...register('idealSkill')}
                    required
                    className={`form-control ${errors.idealSkill ? 'is-invalid' : ''}`}
                  />
                  Engineering License
                  <input
                    type="checkbox"
                    id="compTIACert"
                    value="compTIACert"
                    {...register('idealSkill')}
                    required
                    className={`form-control ${errors.idealSkill ? 'is-invalid' : ''}`}
                  />
                  CompTIA Certificate
                  <input
                    type="checkbox"
                    id="c"
                    value="c"
                    {...register('idealSkill')}
                    required
                    className={`form-control ${errors.idealSkill ? 'is-invalid' : ''}`}
                  />
                  C
                  <input
                    type="checkbox"
                    id="python"
                    value="python"
                    {...register('idealSkill')}
                    required
                    className={`form-control ${errors.idealSkill ? 'is-invalid' : ''}`}
                  />
                  Python
                  <input
                    type="checkbox"
                    id="java"
                    value="java"
                    {...register('idealSkill')}
                    required
                    className={`form-control ${errors.idealSkill ? 'is-invalid' : ''}`}
                  />
                  Java
                  <input
                    type="checkbox"
                    id="aiExperience"
                    value="aiExperience"
                    {...register('idealSkill')}
                    required
                    className={`form-control ${errors.idealSkill ? 'is-invalid' : ''}`}
                  />
                  AI Experience
                  <div className="invalid-feedback">{errors.idealSkill?.message}</div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
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
