'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Company, Locations } from '@prisma/client';
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

interface EditCompanyFormProps {
  company: Company;
  onFinish?: () => void;
}

const EditCompanyForm = ({ company, onFinish = () => {} }: EditCompanyFormProps) => {
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
      : (company.idealSkill as unknown as string).split(',').map((s) => s.trim()),
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
    onFinish();
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h3 className="text-center fw-bold mb-4">Edit Company Profile</h3>
              <Form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-4">
                <input type="hidden" {...register('id')} />
                <input type="hidden" {...register('userId')} />

                <Form.Group>
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control {...register('name')} className={errors.name ? 'is-invalid' : ''} />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Salary</Form.Label>
                      <Form.Control
                        type="number"
                        {...register('salary')}
                        className={errors.salary ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">{errors.salary?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Location</Form.Label>
                      <Form.Select {...register('location')} className={errors.location ? 'is-invalid' : ''}>
                        <option value="">Select a state</option>
                        {US_STATES.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </Form.Select>
                      <div className="invalid-feedback">{errors.location?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

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
                  <Form.Control {...register('jobs')} className={errors.jobs ? 'is-invalid' : ''} />
                  <div className="invalid-feedback">{errors.jobs?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Contacts</Form.Label>
                  <Form.Control {...register('contacts')} className={errors.contacts ? 'is-invalid' : ''} />
                  <div className="invalid-feedback">{errors.contacts?.message}</div>
                </Form.Group>

                <Form.Group>
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
                  <small className="text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple.</small>
                  <div className="invalid-feedback">{errors.idealSkill?.message}</div>
                </Form.Group>

                <Row className="pt-2">
                  <Col>
                    <Button type="submit" variant="success" className="w-100">
                      Save Changes
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      onClick={() => reset(defaultValues)}
                      variant="warning"
                      className="w-100"
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

EditCompanyForm.defaultProps = {
  onFinish: undefined,
};
