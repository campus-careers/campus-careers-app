'use client';

import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap'; 
import EditableProfile from '@/components/EditStudent';

type Student = {
  id: number;
  name: string;
  email: string;
  skills: string[];
  image: string;
  location: string;
  companies: string[];
  interviews: string[];
  interests: string[];
  major?: string;
  portfolio?: string;
};

const StudentHomePage = () => {
  const [student, setStudent] = useState<Student | null>(null);

  // Fetch student data
  const fetchStudentData = async () => {
    const response = await fetch('/api/user/get-user');
    const data = await response.json();
    if (data.success) {
      setStudent(data.user);
    } else {
      console.log('Error fetching student data:', data.error);
    }
  };

  // UseEffect to fetch data on initial load
  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleSave = (updatedData: any) => {
    setStudent(updatedData); // Update student data with the new info after saving
  };

  if (!student) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>No profile found</h1>
          <p>Please complete your profile to view opportunities.</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Container className="mt-4">
        <h2 className="text-center mb-4">Student Home Page</h2>
        <Row className="justify-content-center">
          <Col md={5}>
            {/* Pass student data and handleSave function */}
            <EditableProfile student={student} onSave={handleSave} />
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
};

export default StudentHomePage;
