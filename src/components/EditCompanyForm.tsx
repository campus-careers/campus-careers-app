'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Locations } from '@prisma/client';
import swal from 'sweetalert';
import { EditCompanySchema } from '@/lib/validationSchemas';
import { editCompany } from '@/lib/dbActions';

const US_STATES: string[] = [
  'Remote', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
  'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
  'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

const PROGRAMMING_SKILLS: string[] = [
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
  company: FormValues;
  onFinish?: () => void;
}) => {
  const defaultValues: FormValues = {
    ...company,
    idealSkill: Array.isArray(company.idealSkill)
      ? company.idealSkill
      : (company.idealSkill as string).split(',').map((s) => s.trim()),
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
        <Col md={8}>
          <h3 className="text-center mb-3">🛠️ Edit Company Profile</h3>
          <Card className="p-4 shadow-sm">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" {...register('id')} />
              <input type="hidden" {...register('userId')} />

              <Row className="mb-3">
                <Col>
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    {...register('name')}
                    className={errors.name ? 'is-invalid' : ''}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Col>
                <Col>
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    {...register('salary')}
                    className={errors.salary ? 'is-invalid' : ''}
                  />
                  <div className="invalid-feedback">{errors.salary?.message}</div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Location</Form.Label>
                  <Form.Select
                    {...register('location')}
                    className={errors.location ? 'is-invalid' : ''}
                  >
                    <option value="">Select a state</option>
                    {US_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Col>
                <Col>
                  <Form.Label>Overview</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    {...register('overview')}
                    className={errors.overview ? 'is-invalid' : ''}
                  />
                  <div className="invalid-feedback">{errors.overview?.message}</div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Jobs</Form.Label>
                  <Form.Control
                    {...register('jobs')}
                    className={errors.jobs ? 'is-invalid' : ''}
                  />
                  <div className="invalid-feedback">{errors.jobs?.message}</div>
                </Col>
                <Col>
                  <Form.Label>Contacts</Form.Label>
                  <Form.Control
                    {...register('contacts')}
                    className={errors.contacts ? 'is-invalid' : ''}
                  />
                  <div className="invalid-feedback">{errors.contacts?.message}</div>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Recommended Skills</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  {...register('idealSkill')}
                  className={errors.idealSkill ? 'is-invalid' : ''}
                >
                  {PROGRAMMING_SKILLS.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </Form.Control>
                <small className="text-muted">
                  Hold Ctrl (Windows) or Cmd (Mac) to select multiple.
                </small>
                <div className="invalid-feedback">{errors.idealSkill?.message}</div>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button
                  type="submit"
                  variant="success"
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    reset(defaultValues);
                    if (onFinish) onFinish();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// ✅ Fix ESLint: define default for optional prop
EditCompanyForm.defaultProps = {
  onFinish: () => {},
};

export default EditCompanyForm;
