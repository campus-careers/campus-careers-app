import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import EditableProfile from '@/components/EditStudent';

const StudentHomePage = () => (
  <main>
    <Container className="mt-4">
      <h2 className="text-center mb-4">Student Home Page</h2>
      <Row className="justify-content-center">
        <Col md={5}>
          <EditableProfile />
        </Col>

        <Col md={4} className="d-flex flex-column gap-3">
          <Button variant="light" className="border">Browse Companies</Button>
          <Button variant="light" className="border">Browse by Skill</Button>
          <Button variant="light" className="border">Browse by Location</Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={8} className="mx-auto">
          <h5 className="fw-bold">Recent Matches</h5>
          <ul className="list-unstyled">
            <li>Company A</li>
            <li>Company B</li>
          </ul>
        </Col>
      </Row>
    </Container>
  </main>
);

export default StudentHomePage;
