'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import AdminDashboard from '@/components/AdminDashboard';

type Student = {
  id: string;
  name: string;
  image: string;
  skills: string[];
  interests: string[];
  location: string;
  companies: string[];
  interviews: string[];
};

const AdminPortalPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/admin/students');
        const data = await res.json();
        if (!res.ok || !data.success)
          throw new Error(data.error || 'Unknown error');
        setStudents(data.students);
      } catch (err: any) {
        setError(err.message || 'Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4 fw-bold">Admin Portal</h1>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      <Row xs={1} sm={2} md={3} lg={3} xl={4} className="g-4">
        {students.map((student) => (
          <Col key={student.id}>
            <AdminDashboard {...student} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminPortalPage;
