'use client';

import { useEffect, useState, useCallback } from 'react';
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

type Match = {
  id: string; 
  name: string;
  location: string;
  idealSkill: string[];
  contact: string;
};

const StudentHomePage = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [matches, setMatches] = useState<Match[]>([]);

  const fetchStudentData = async () => {
    const response = await fetch('/api/user/get-user');
    const data = await response.json();
    if (data.success) {
      setStudent(data.user);
    } else {
      console.log('Error fetching student data:', data.error);
    }
  };

  const fetchMatches = useCallback(async () => {
    if (student) {
      const response = await fetch(`/api/user/get-matches?studentId=${student.id}`);
      const data = await response.json();
      if (data.success) {
        setMatches(data.matches);
      } else {
        console.log('Error fetching matches:', data.error);
      }
    }
  }, [student]);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // UseEffect to fetch student data on page load
  useEffect(() => {
    fetchStudentData();
  }, []);

  // UseEffect to fetch matches when student data is loaded/updated
  useEffect(() => {
    if (student) {
      fetchMatches();
    }
  }, [student, fetchMatches]);

  const saveProfileChanges = async (updatedData: any) => {
    const response = await fetch('/api/user/save-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    
    const result = await response.json();
    if (result.success) {
      // Refresh student data after saving
      fetchStudentData();
      setIsEditing(false);  // Toggle back to non-edit mode
    } else {
      console.log('Error saving profile:', result.error);
    }
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
            {!isEditing ? (
              <Card className="shadow-lg rounded-lg">
                <Card.Body>
                  <Card.Title className="text-center text-primary">{student.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted text-center">{student.email}</Card.Subtitle>
                  <div className="text-center">
                    {student.image && (
                      <Card.Img
                        variant="top"
                        src={student.image}
                        alt="Profile Image"
                        className="rounded-circle mb-3"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <Card.Text>
                    <strong>Skills:</strong> {student.skills.join(', ')}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location:</strong> {student.location}
                  </Card.Text>
                  <Card.Text>
                    <strong>Interests:</strong> {student.interests.join(', ')}
                  </Card.Text>
                  <Card.Text>
                    <strong>Major:</strong> {student.major || 'N/A'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Portfolio:</strong> {student.portfolio || 'N/A'}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-center">
                  <Button variant="primary" onClick={toggleEdit}>Edit Profile</Button>
                </Card.Footer>
              </Card>
            ) : (
              <EditableProfile student={student} onSave={saveProfileChanges} />
            )}
          </Col>
        </Row>

        {/* Display Matches Section */}
        {!isEditing && matches.length > 0 && (
          <Row className="mt-5">
            <Col md={8} className="mx-auto">
              <h5 className="fw-bold">Recent Matches</h5>
              <ul className="list-unstyled">
                {matches.map((match) => (
                  <li key={match.id}>
                    <Card>
                      <Card.Body>
                        <Card.Title>{match.name}</Card.Title>
                        <Card.Text>
                          <strong>Location:</strong> {match.location}
                        </Card.Text>
                        <Card.Text>
                          <strong>Ideal Skills:</strong> {match.idealSkill.join(', ')}
                        </Card.Text>
                        <Card.Text>
                          <strong>Contact:</strong> {match.contact}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        )}
      </Container>
    </main>
  );
};

export default StudentHomePage;
