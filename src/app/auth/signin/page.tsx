'use client';

import { signIn, getSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Alert } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

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
      redirect: false,
    });

    if (result?.error) {
      setErrorMessage('Invalid email or password. Please try again.');
    } else {
      // Wait for session to update
      const interval = setInterval(async () => {
        const session = await getSession();
        if (session) {
          clearInterval(interval);
          const userEmail = session.user?.email;
          if (userEmail === 'admin@foo.com') {
            router.push('/admin');
          } else {
            router.push('/student');
          }
        }
      }, 100);
    }
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={5}>
            <h1 className="text-center my-4">Sign In</h1>
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
                Don&apos;t have an account? <a href="/auth/signup">Sign up</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
