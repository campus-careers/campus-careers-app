/* eslint-disable import/extensions */

'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Company } from '@prisma/client';
import { EditCompanySchema } from '@/lib/validationSchemas';
import { editCompany } from '@/lib/dbActions';

const onSubmit = async (data: Company) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editCompany(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const EditCompanyForm = ({ company }: { company: Company }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Company>({
    resolver: yupResolver(EditCompanySchema),
  });

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Company</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={company.id} />
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    defaultValue={company.name}
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
                    defaultValue={company.salary}
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
                    defaultValue={company.location}
                  />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Overview</Form.Label>
                  <input
                    type="field"
                    {...register('overview')}
                    defaultValue={company.overview}
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
                    defaultValue={company.jobs}
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
                    defaultValue={company.contacts}
                    required
                    className={`form-control ${errors.contacts ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.contacts?.message}</div>
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

export default EditCompanyForm;
