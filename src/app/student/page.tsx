import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import EditableProfile from '@/components/EditStudent';

const StudentHomePage = () => {
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    async function fetchStudentData() {
      const response = await fetch('/api/get-user');  // Ensure correct API call
      const data = await response.json();
      
      if (data.success) {
        setStudent(data.user); // Sets the student data
      } else {
        console.log('Error fetching student data:', data.error);
      }
    }

    fetchStudentData();
  }, []); // This ensures the data is fetched when the page loads

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
            <EditableProfile student={student} />  {/* Pass the student data as prop */}
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
