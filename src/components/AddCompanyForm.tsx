'use client';

import { useSession } from 'next-auth/react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addCompany } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddCompanySchema } from '@/lib/validationSchemas';

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

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'unauthenticated') redirect('/auth/signin');
  if (session?.user?.randomKey !== 'ADMIN') redirect('/unauthorized');

  const onSubmit = async (data: FormValues) => {
    try {
      const companyData = {
        ...data,
        idealSkill: data.idealSkill.split(',').map((s) => s.trim()),
        userId: Number(session?.user?.id),
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
        <Col><h3 className="text-center fw-bold">Add New Company</h3></Col>
      </Row>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Company Name</Form.Label>
              <Form.Control {...register('name')} type="text" placeholder="e.g. Tech Corp" />
              {errors.name && <small className="text-black">{errors.name.message}</small>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Location</Form.Label>
              <Form.Select {...register('location')} required>
                <option value="">Select a state</option>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </Form.Select>
              {errors.location && <small className="text-black">{errors.location.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Salary</Form.Label>
              <Form.Control {...register('salary')} type="number" step={10000} min={0} placeholder="e.g. 80000" />
              {errors.salary && <small className="text-black">{errors.salary.message}</small>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Ideal Skills</Form.Label>
              <Form.Control {...register('idealSkill')} as="select" multiple>
                {PROGRAMMING_SKILLS.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </Form.Control>
              <small className="text-black">Hold Ctrl (Windows) or Cmd (Mac) to select multiple.</small>
              {errors.idealSkill && <small className="text-black">{errors.idealSkill.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Overview</Form.Label>
              <Form.Control {...register('overview')} as="textarea" rows={3} />
              {errors.overview && <small className="text-black">{errors.overview.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Jobs</Form.Label>
              <Form.Control {...register('jobs')} type="text" placeholder="e.g. Frontend Developer, Data Analyst" />
              {errors.jobs && <small className="text-black">{errors.jobs.message}</small>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Group className="border p-3 rounded">
              <Form.Label className="fw-bold">Contacts</Form.Label>
              <Form.Control {...register('contacts')} type="text" placeholder="e.g. hr@company.com, (123) 456-7890" />
              {errors.contacts && <small className="text-black">{errors.contacts.message}</small>}
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
