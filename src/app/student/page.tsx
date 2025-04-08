import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const StudentHomePage = () => (
  <main>
    {/* Page Title */}
    <Container className="mt-4">
      <h2 className="text-center mb-4">Student Home Page</h2>
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="p-3">
            <Row>
              <Col xs={4}>
                <div style={{
                  width: '100%',
                  paddingBottom: '100%',
                  backgroundColor: '#eee',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
                />
              </Col>
              <Col xs={8}>
                <h5 className="fw-bold">Full Name</h5>
                <p className="mb-1">Preferred Location</p>
                <p className="mb-0">Skills: Skill 1, Skill 2, Skill 3</p>
              </Col>
            </Row>
          </Card>
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
