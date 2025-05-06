'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Company, Locations } from '@prisma/client';
import { EditCompanySchema } from '@/lib/validationSchemas';
import { editCompany } from '@/lib/dbActions';

const US_STATES = [
  'Remote', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
  'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
  'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

const PROGRAMMING_SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'Kotlin',
  'Swift', 'HTML', 'CSS', 'SQL', 'R', 'PHP', 'Perl', 'Scala', 'MATLAB', 'Dart', 'Elixir',
  'Shell', 'Assembly', 'Objective-C',
];

type FormValues = {
  id: number;
  name: string;
  salary: number;
  overview: string;
  jobs: string;
  contacts: string;
  location: Locations;
  idealSkill: string[];
  userId: number;
};

const EditCompanyForm = ({
  company,
  onFinish,
}: {
  company: Company;
  onFinish?: () => void;
}) => {
  const defaultValues: FormValues = {
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
  } = useForm<FormValues>({
    resolver: yupResolver(EditCompanySchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    await editCompany(data);
    swal('Success', 'Company updated successfully', 'success', { timer: 2000 });
    if (onFinish) onFinish();
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
                <input type="hidden" {...register('id')} />
                <input type="hidden" {...register('userId')} />

                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    {...register('name')}
                    className={errors.name ? 'is-invalid' : ''}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    {...register('salary')}
                    className={errors.salary ? 'is-invalid' : ''}
                  />
                  <div className="invalid-feedback">{errors.salary?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Select {...register('location')} className={errors.location ? 'is-invalid' : ''}>
                    <option value="">Select a state</option>
                    {US_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Overview</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    {...register('overview')}
                    className={errors.overview ? 'is-invalid' : ''}
                  />
                  <div className="invalid-feedback">{errors.overview?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Jobs</Form.Label>
                  <Form.Control
                    {...register('jobs')}
                    className={errors.jobs ? 'is-invalid' : ''}
                  />
                  <div className="invalid-feedback">{errors.jobs?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Contacts</Form.Label>
                  <Form.Control
                    {...register('contacts')}
                    className={errors.contacts ? 'is-invalid' : ''}
                  />
                  <div className="invalid-feedback">{errors.contacts?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Recommended Skills</Form.Label>
                  <Form.Control
                    {...register('idealSkill')}
                    as="select"
                    multiple
                    className={errors.idealSkill ? 'is-invalid' : ''}
                  >
                    {PROGRAMMING_SKILLS.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </Form.Control>
                  <small className="text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple.</small>
                  <div className="invalid-feedback">{errors.idealSkill?.message}</div>
                </Form.Group>

                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary">Submit</Button>
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
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditCompanyForm;
