'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Col, Container, Row } from 'react-bootstrap';

/** Render a Not Authorized page and redirect to setup if profile is incomplete. */
const NotAuthorized = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/setup');
    }, 2500); // redirect after 2.5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={6} className="text-center">
            <h2>Not Authorized</h2>
            <p className="mt-3 text-muted">
              Redirecting you to complete your student profile...
            </p>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default NotAuthorized;
