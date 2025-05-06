// Add the "use client" directive to this file to mark it as a Client Component
'use client';

import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import EditableProfile from '@/components/EditStudent';

const StudentHomePage = () => {
  const [student, setStudent] = useState<any>(null);

  const fetchStudentData = async () => {
    const response = await fetch('/api/user/get-user');  // Updated the API path to match the route
    const data = await response.json();
    if (data.success) {
      setStudent(data.user); // Update the student state
    } else {
      console.log('Error fetching student data:', data.error);
    }
  };

  useEffect(() => {
    fetchStudentData(); // Fetch student data when the page loads
  }, []); // Empty dependency array ensures this runs only once when the page loads

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
            <EditableProfile student={student} onSave={fetchStudentData} /> {/* Pass the fetchStudentData function as a prop */}
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
};

export default StudentHomePage;
