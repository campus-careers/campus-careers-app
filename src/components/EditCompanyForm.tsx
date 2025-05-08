'use client';

import { Button, Card, Col, Form, Row } from 'react-bootstrap';
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
  category: string;  // Including category in form values
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
    category: company.category || '',  // Properly adding category
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
    try {
      await editCompany(data);
      swal('Success', 'Company updated successfully', 'success', { timer: 2000 });
      if (onFinish) onFinish();
    } catch (error) {
      console.error('Error updating company:', error);
      swal('Error', 'Could not update the company', 'error');
    }
  };

  return (
    <Card style={{ width: '100%' }} className="shadow-sm p-4 rounded-4">
      <h3 className="text-center fw-bold mb-4">Edit Company</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('id')} />
        <input type="hidden" {...register('userId')} />

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Name</Form.Label>
            <Form.Control {...register('name')} />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
          </Col>
          <Col md={6}>
            <Form.Label>Category</Form.Label>
            <Form.Control {...register('category')} placeholder="Enter category" />
            {errors.category && <small className="text-danger">{errors.category.message}</small>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Overview</Form.Label>
            <Form.Control as="textarea" rows={3} {...register('overview')} />
            {errors.overview && <small className="text-danger">{errors.overview.message}</small>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Location</Form.Label>
            <Form.Select {...register('location')}>
              {US_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </Form.Select>
            {errors.location && <small className="text-danger">{errors.location.message}</small>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Jobs</Form.Label>
            <Form.Control {...register('jobs')} />
            {errors.jobs && <small className="text-danger">{errors.jobs.message}</small>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Contacts</Form.Label>
            <Form.Control {...register('contacts')} />
            {errors.contacts && <small className="text-danger">{errors.contacts.message}</small>}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Ideal Skills</Form.Label>
            <Form.Control as="select" multiple {...register('idealSkill')}>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
            </Form.Control>
            {errors.idealSkill && <small className="text-danger">{errors.idealSkill.message}</small>}
          </Col>
        </Row>

        <Button type="submit" variant="primary">Save Changes</Button>
      </Form>
    </Card>
  );
};

EditCompanyForm.defaultProps = {
  onFinish: () => {},
};

export default EditCompanyForm;
