'use client';

import { useEffect, useState } from 'react';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
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
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Function to fetch student data
  const fetchStudentData = async () => {
    const response = await fetch('/api/user/get-user');
    const data = await response.json();
    if (data.success) {
      setStudent(data.user);
    } else {
      console.log('Error fetching student data:', data.error);
    }
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

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
        
        {/* Display Profile Info or Edit Profile Section */}
        <Row className="justify-content-center">
          <Col md={5}>
            {!isEditing ? (
              <Card>
                <Card.Body>
                  <Card.Title>{student.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{student.email}</Card.Subtitle>
                  <Card.Text>
                    <strong>Skills:</strong> {student.skills?.join(', ') || 'No skills added'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location:</strong> {student.location || 'No location specified'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Interests:</strong> {student.interests?.join(', ') || 'No interests added'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Major:</strong> {student.major || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Portfolio:</strong> {student.portfolio || 'N/A'}
                  </Card.Text>
                  {student.image && (
                    <Card.Img variant="top" src={student.image} alt="Profile Image" />
                  )}
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary" onClick={toggleEdit}>Edit Profile</Button>
                </Card.Footer>
              </Card>
            ) : (
              <EditableProfile student={student} onSave={fetchStudentData} />
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default StudentHomePage;
