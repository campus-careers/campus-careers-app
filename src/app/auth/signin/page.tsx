'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Alert } from 'react-bootstrap';

/** The sign in page. */
const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // ✅ critical to handle manually
      callbackUrl: '/list', // Redirect destination after login success
    });

    if (result?.error) {
      console.error('Sign in failed:', result.error);
      setErrorMessage('Invalid email or password. Please try again.');
    } else if (result?.url) {
      window.location.href = result.url; // ✅ Manual redirect if login succeeds
    }
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Sign In</h1>
            <Card>
              <Card.Body>
                {errorMessage && (
                  <Alert variant="danger" className="text-center">
                    {errorMessage}
                  </Alert>
                )}
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <input name="email" type="email" className="form-control" required />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <input name="password" type="password" className="form-control" required />
                  </Form.Group>
                  <Button type="submit" className="mt-4 w-100">
                    Sign In
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center">
                Don&apos;t have an account?
                {' '}
                <a href="/auth/signup">Sign up</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
