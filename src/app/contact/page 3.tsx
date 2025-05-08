// src/app/contact/page.tsx

'use client';

import { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can send this to Supabase or your API later
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container className="py-5">
      <h1>Contact Us</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            name="message"
            as="textarea"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">Send</Button>
      </Form>
    </Container>
  );
};

export default ContactPage;
