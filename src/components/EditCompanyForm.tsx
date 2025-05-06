'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Company, Locations } from '@prisma/client';
import { EditCompanySchema } from '@/lib/validationSchemas';
import { editCompany } from '@/lib/dbActions';

const US_STATES = [
  'Remote', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
  'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
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

const EditCompanyForm = ({ company, onFinish }: { company: Company; onFinish?: () => void }) => {
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
      : (company.idealSkill as never as string).split(',').map((s) => s.trim()),
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
    <div className="outer-border-box" style={{ width: '200%', margin: '0 auto' }}>
      <Card style={{ width: '100%' }} className="shadow-sm p-4 rounded-4">
        <h3 className="text-center fw-bold mb-4">Edit Company</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('id')} />
          <input type="hidden" {...register('userId')} />

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control {...register('name')} />
              {errors.name && <small className="text-black">{errors.name.message}</small>}
            </Col>
            <Col md={6}>
              <Form.Label className="fw-bold">Salary</Form.Label>
              <Form.Control type="number" step={10000} min={0} {...register('salary')} />
              {errors.salary && <small className="text-black">{errors.salary.message}</small>}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label className="fw-bold">Location</Form.Label>
              <Form.Select {...register('location')}>
                <option value="">Select a state</option>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </Form.Select>
              {errors.location && <small className="text-black">{errors.location.message}</small>}
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Overview</Form.Label>
            <Form.Control as="textarea" rows={2} {...register('overview')} />
            {errors.overview && <small className="text-black">{errors.overview.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Jobs</Form.Label>
            <Form.Control {...register('jobs')} />
            {errors.jobs && <small className="text-black">{errors.jobs.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Contacts</Form.Label>
            <Form.Control {...register('contacts')} />
            {errors.contacts && <small className="text-black">{errors.contacts.message}</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Recommended Skills</Form.Label>
            <Form.Control as="select" multiple {...register('idealSkill')}>
              {PROGRAMMING_SKILLS.map((skill) => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </Form.Control>
            <small className="text-black">Hold Ctrl (Windows) or Cmd (Mac) to select multiple.</small>
            {errors.idealSkill && <div className="text-black">{errors.idealSkill.message}</div>}
          </Form.Group>

          <div className="d-flex justify-content-between mt-4">
            <Button type="submit" variant="primary">Save</Button>
            <Button
              type="button"
              variant="outline-secondary"
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
    </div>
  );
};

EditCompanyForm.defaultProps = {
  onFinish: () => {},
};

export default EditCompanyForm;
