'use client';

import { useSession } from 'next-auth/react';
import { Col, Container, Row, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditStudentSchema } from '@/lib/validationSchemas'; // ✅ Correct
import { editStudent } from '@/lib/dbActions'; // ✅ Correct
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

type FormValues = {
  id: string;
  email: string;
  fullName: string;
  location: string;
  skills: string;
  image: string;
};

const SetupPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(EditStudentSchema),
    defaultValues: {
      id: '',
      email: '',
      fullName: '',
      location: '',
      skills: '',
      image: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const id = Number(data.id); // because Prisma expects number id
      await editStudent({
        id,
        email: data.email,
        fullName: data.fullName,
        location: data.location,
        skills: data.skills,
        image: data.image,
      });

      swal('Success!', 'Student profile saved successfully!', 'success');
      router.push('/student');
    } catch (error) {
      console.error('❌ Error saving student profile:', error);
      swal('Error', 'Failed to save student profile.', 'error');
    }
  };

  if (status === 'loading') {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!session) {
    return (
      <Container className="text-center mt-5">
        <h2>Please sign in to add your student info.</h2>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-4">Add Student Info</h1>
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    {...register('fullName')}
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register('email')}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Skills (comma separated)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Example: JavaScript, Python"
                    {...register('skills')}
                    isInvalid={!!errors.skills}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.skills?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    {...register('location')}
                    isInvalid={!!errors.location}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.location?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Profile Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Optional profile picture URL"
                    {...register('image')}
                    isInvalid={!!errors.image}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.image?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Submit'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => reset()}>
                    Reset
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SetupPage;
