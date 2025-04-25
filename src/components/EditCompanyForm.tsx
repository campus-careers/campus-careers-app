'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Company, Locations } from '@prisma/client';
import { EditCompanySchema } from '@/lib/validationSchemas';
import { editCompany } from '@/lib/dbActions';

const EditCompanyForm = ({ company }: { company: Company }) => {
  // Prepare clean default values matching Prisma Company model
  const defaultValues: Company = {
    id: company.id,
    name: company.name,
    salary: company.salary,
    overview: company.overview,
    jobs: company.jobs,
    contacts: company.contacts,
    location: company.location as Locations,
    idealSkill: Array.isArray(company.idealSkill)
      ? company.idealSkill
      : (company.idealSkill as never as string).split(',').map((skill) => skill.trim()),
    userId: company.userId,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Company>({
    resolver: yupResolver(EditCompanySchema),
    defaultValues,
  });

  const onSubmit = async (data: Company) => {
    await editCompany(data);
    swal('Success', 'Company updated successfully', 'success', { timer: 2000 });
  };

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
                {/* Hidden fields */}
                <input type="hidden" {...register('id')} />
                <input type="hidden" {...register('userId')} />

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
                    type="text"
                    {...register('overview')}
                    className={`form-control ${errors.overview ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.overview?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Jobs</Form.Label>
                  <input
                    type="text"
                    {...register('jobs')}
                    className={`form-control ${errors.jobs ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.jobs?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Contacts</Form.Label>
                  <input
                    type="text"
                    {...register('contacts')}
                    className={`form-control ${errors.contacts ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.contacts?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Recommended Skills</Form.Label>
                  <input
                    type="text"
                    {...register('idealSkill')}
                    className={`form-control ${errors.idealSkill ? 'is-invalid' : ''}`}
                  />
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
                      <Button
                        type="button"
                        onClick={() => reset(defaultValues)}
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

export default EditCompanyForm;
