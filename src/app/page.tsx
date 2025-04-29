'use client';

import Link from 'next/link'; // ✅ Import Link
import { Col, Container, Row, Button } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row className="h-100 align-items-center justify-content-center text-center">
        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1>Welcome to Campus Careers!</h1>
          <h2>Connect with Internships and Jobs tailored to you</h2>
        </Col>
      </Row>

      <div className="d-grid gap-3 col-8 mx-auto my-4">
        <Link href="/company" passHref legacyBehavior>
          <Button variant="outline-primary" size="lg" className="w-100">➜ Explore Companies</Button>
        </Link>
        <Link href="/filter" passHref legacyBehavior>
          <Button variant="outline-primary" size="lg" className="w-100">➜ Browse Student Profiles</Button>
        </Link>
        <Link href="/setup" passHref legacyBehavior>
          <Button variant="outline-primary" size="lg" className="w-100">➜ Learn How It Works</Button>
        </Link>
      </div>

      <h3 className="fw-bold mt-5 text-center">Featured Companies</h3>
      <ul className="list-unstyled text-center">
        <li>Oceanic Tech</li>
        <li>Hawaiian Airlines IT Division</li>
        {' '}
        {/* Fixed typo from Dirision to Division */}
        <li>Inovatech</li>
      </ul>
    </Container>
  </main>
);

export default Home;
