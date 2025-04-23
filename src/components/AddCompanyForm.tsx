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

type CompanyFormValues = {
  name: string;
  address: string;
  owner: string;
};

const onSubmit = async (data: CompanyFormValues) => {
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
  } = useForm<CompanyFormValues>({
    resolver: yupResolver(AddCompanySchema),
    defaultValues: { owner: currentUser },
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
          <div className="text-center mb-3">
            <h2>Add Company</h2>
          </div>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <input
                    type="text"
                    {...register('address')}
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.address?.message}</div>
                </Form.Group>

                {/* hidden owner field */}
                <input type="hidden" {...register('owner')} />

                <Form.Group className="mt-4">
                  <Row>
                    <Col>
                      <Button type="submit" variant="primary" className="w-100">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        variant="warning"
                        className="w-100"
                        onClick={() => reset()}
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
