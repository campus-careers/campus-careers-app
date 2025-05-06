'use client';

import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import EditableProfile from '@/components/EditStudent';
import Image from 'next/image'; // Import the Image component

type Student = {
  id: number;
  name: string;
  email: string;
  skills: string[];
  image: string;  // Ensure 'image' is part of the Student type
  location: string;
  companies: string[];
  interviews: string[];
  interests: string[];
  major?: string;
  portfolio?: string;
};

const StudentHomePage = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // State for storing selected image

  const fetchStudentData = async () => {
    const response = await fetch('/api/user/get-user'); // Adjust this to match the actual route
    const data = await response.json();
    if (data.success) {
      setStudent(data.user); // Ensure the user data has an 'image' property
    } else {
      console.log('Error fetching student data:', data.error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append('name', student?.name || '');
    formData.append('email', student?.email || '');
    formData.append('skills', student?.skills.join(',') || '');
    formData.append('location', student?.location || '');
    formData.append('companies', student?.companies.join(',') || '');
    formData.append('interests', student?.interests.join(',') || '');
    formData.append('major', student?.major || '');
    formData.append('portfolio', student?.portfolio || '');
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    // Submit the form data (simulated here for now)
    console.log('Profile Update Form:', formData);
    // You would typically call an API to save the form data here
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
            <EditableProfile student={student} onSave={fetchStudentData} />
            {' '}
            {/* Pass the fetchStudentData function as a prop */}
          </Col>

          <Col md={4} className="d-flex flex-column gap-3">
            <Button variant="light" className="border">Browse Companies</Button>
            <Button variant="light" className="border">Browse by Skill</Button>
            <Button variant="light" className="border">Browse by Location</Button>
          </Col>
        </Row>

        {/* Image Upload Section */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Profile Image (Optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <div className="mt-3">
                  <h5>Selected Image Preview:</h5>
                  <Image
                    src={URL.createObjectURL(selectedImage)} // Using next/image to optimize
                    alt="Profile Preview"
                    width={150}
                    height={150}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Button variant="primary" onClick={handleProfileUpdate}>
              Save and Continue
            </Button>
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
