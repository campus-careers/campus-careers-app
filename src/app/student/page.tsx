'use client';

import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap'; // Removed the unused 'Form' import
import EditableProfile from '@/components/EditStudent';
import { useForm } from 'react-hook-form'; // Keep useForm for form handling

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
  const { handleSubmit } = useForm(); // Only need handleSubmit if not using register directly

  // Fetch student data from API
  const fetchStudentData = async () => {
    const response = await fetch('/api/user/get-user');
    const data = await response.json();
    if (data.success) {
      setStudent(data.user); // Set the fetched student data
    } else {
      console.log('Error fetching student data:', data.error);
    }
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    console.log('Profile data submitted:', data);
    // You would send this data to your backend to save the changes
    // For example: await fetch('/api/user/update', { method: 'POST', body: JSON.stringify(data) });
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <EditableProfile student={student} onSave={fetchStudentData} />
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </form>
          </Col>
        </Row>

        {/* Removed unnecessary buttons for browsing companies, skills, etc. */}
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
