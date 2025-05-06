'use client';

import { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface EditStudentProps {
  student: any; // Use the correct type for 'student'
  onSave: () => void;
}

const EditStudent = ({ student, onSave }: EditStudentProps) => {
  const [name, setName] = useState(student.name);
  const [location, setLocation] = useState(student.location);
  const [skills, setSkills] = useState(student.skills.join(', '));
  const [imageUrl, setImageUrl] = useState(student.image || ''); // Removed `setImage` state
  const [file, setFile] = useState<File | null>(null); // Keep the file state for the image
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Changed 'file' to 'selectedFile'
    if (selectedFile) {
      setFile(selectedFile); // Only set the file state
      setImageUrl(URL.createObjectURL(selectedFile)); // Set image URL for preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('skills', skills);
    if (file) {
      formData.append('image', file); // Append image file if selected
    }

    // Call your save API
    const response = await fetch('/api/user/save-profile', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      onSave(); // Update parent component with the new data
      router.push('/student'); // Redirect to the student page
    } else {
      console.log('Error saving profile:', data.error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formSkills">
          <Form.Label>Skills</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formImage">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </Form.Group>
      </Row>

      {imageUrl && (
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Image Preview</Form.Label>
            <div style={{ width: '200px', height: '200px', position: 'relative' }}>
              <Image
                src={imageUrl}
                alt="Image preview"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Form.Group>
        </Row>
      )}

      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default EditStudent;
