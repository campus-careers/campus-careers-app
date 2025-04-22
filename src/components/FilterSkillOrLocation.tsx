'use client';

import { Filter } from '@prisma/client';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';

/* Renders a filter in the List Skills/Location table. See filter/page.tsx. */
const FilterSkillOrLocation = ({ skills, location }: Filter) => (
  <Container className="mt-5">
    <Row className="mb-3">
      <Col xs={12} md={6}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Filter by Skills</Form.Label>
          <Form.Control type="text" placeholder="Enter skills" />
        </Form.Group>
      </Col>
      <Col xs={12} md={6}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Filter by Location</Form.Label>
          <Form.Control type="text" placeholder="Enter location" />
        </Form.Group>
      </Col>
    </Row>
    <Button variant="primary" type="submit">
      Search
    </Button>
    <Row className="mt-3">
      <Col xs={12} md={6}>
        <Card className="h-100">
          <Card.Body>
            <Card.Title>Skills</Card.Title>
            <Card.Text>{skills.join(', ')}</Card.Text>
            <Card.Title>Location</Card.Title>
            <Card.Text>{location}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default FilterSkillOrLocation;
