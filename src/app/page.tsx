'use client';

import Link from 'next/link';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container
      id="landing-page"
      fluid
      className="py-5"
      style={{ backgroundColor: '#f9fafb' }}
    >
      <Row className="align-items-center justify-content-center text-center mb-5">
        <Col xs={10} md={8}>
          <h1 className="display-4 fw-bold mb-3">Welcome to Campus Careers!</h1>
          <p className="lead text-muted">
            Discover internships and career opportunities tailored just for you.
            Start building your future today!
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col xs={10} md={6}>
          <div className="d-grid gap-3">
            <Link href="/company" passHref legacyBehavior>
              <Button variant="success" size="lg" className="w-100">
                🌟 Explore Company Profiles
              </Button>
            </Link>
            <Link href="/filter" passHref legacyBehavior>
              <Button variant="primary" size="lg" className="w-100">
                🔎 Browse By Skill/Location
              </Button>
            </Link>
            <Link href="/setup" passHref legacyBehavior>
              <Button variant="warning" size="lg" className="w-100 text-white">
                🛠️ Start Your Profile
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={10} md={8}>
          <h2 className="text-center fw-bold mb-4">Featured Companies</h2>
          <Row xs={1} md={3} className="g-4">
            {[
              {
                name: 'Oceanic Tech',
                description: "Innovating Hawaii's marine technologies.",
              },
              {
                name: 'Hawaiian Airlines IT Division',
                description: 'Flying high with cutting-edge IT solutions.',
              },
              {
                name: 'Inovatech',
                description: 'Building the next generation of tech leaders.',
              },
            ].map((company) => (
              <Col key={company.name}>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{company.name}</Card.Title>
                    <Card.Text className="text-muted">
                      {company.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
