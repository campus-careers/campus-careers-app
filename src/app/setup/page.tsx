'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';

const SetupPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const response = await fetch('/api/user/save-profile', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        swal('Success', 'Student info saved successfully!', 'success');
        reset();
      } else {
        swal('Error', result.error || 'Failed to save student info.', 'error');
      }
    } catch (error) {
      console.error('❌ Unexpected error:', error);
      swal('Error', 'Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Add Student Info</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control {...register('name')} placeholder="Enter your full name" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Major</Form.Label>
                  <Form.Control {...register('major')} placeholder="Enter your major" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Skills (comma-separated)</Form.Label>
                  <Form.Control {...register('skills')} placeholder="e.g., JavaScript, Python" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Interests (comma-separated)</Form.Label>
                  <Form.Control {...register('interests')} placeholder="e.g., AI, Web Development" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control {...register('location')} placeholder="Enter your location" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Portfolio Link</Form.Label>
                  <Form.Control {...register('portfolio')} placeholder="e.g., https://yourportfolio.com" />
                </Form.Group>

                <Button type="submit" variant="primary" disabled={loading} className="w-100">
                  {loading ? 'Saving...' : 'Save Info'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SetupPage;
