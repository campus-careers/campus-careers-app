'use client';

import { useState } from 'react';
import { Button, Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

const locations = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Remote',
];

const skills = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'Kotlin',
  'Swift', 'HTML', 'CSS', 'SQL', 'R', 'PHP', 'Perl', 'Scala', 'MATLAB', 'Dart', 'Elixir',
  'Shell', 'Assembly', 'Objective-C',
];

const EditStudent = ({ student, onSave }: { student: any, onSave: (updatedData: any) => void }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: student?.name,
      email: student?.email,
      skills: student?.skills || [],
      image: student?.image || 'public/default-image.jpg',
      location: student?.location,
      interests: student?.interests.join(', '), // Convert interests to string for editing
      portfolio: student?.portfolio || '', // Portfolio URL
      major: student?.major || '', // Add major as part of the form
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setValue('image', file.name);
    }
  };

  const onSubmit = async (data: any) => {
    // Ensure skills and location are captured correctly
    const updatedData = {
      ...data,
      skills: data.skills || [], // Ensure skills are set correctly
      location: data.location || '', // Ensure location is set correctly
      interests: data.interests.split(',').map((interest: string) => interest.trim()), // Convert string back to array
      image: selectedImage ? `/images/${selectedImage.name}` : data.image, // Update image URL if uploaded
    };

    // Call the onSave function from the parent to update the profile
    await onSave(updatedData);

    // Reset the image selection
    setSelectedImage(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Row className="mb-3">
          <Col md={12}>
            <h3>Edit Student Profile</h3>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register('name')}
                type="text"
                placeholder="Enter your name"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                disabled
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Major</Form.Label>
              <Form.Control
                {...register('major')} // Ensure 'major' is correctly registered
                type="text"
                placeholder="Enter your major"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                {...register('location')}
                as="select"
                placeholder="Select your location"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Interests field as a string input */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Interests</Form.Label>
              <Form.Control
                {...register('interests')}
                type="text"
                placeholder="Enter your interests (comma-separated)"
              />
              <small className="text-muted">
                Separate each interest with a comma (e.g., Software Development, AI, Data Science)
              </small>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Skills</Form.Label>
              <Form.Control
                {...register('skills')}
                as="select"
                multiple
                placeholder="Select your skills"
              >
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </Form.Control>
              <small className="text-muted">
                Hold Ctrl (Windows) or Cmd (Mac) to select multiple.
              </small>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Portfolio URL</Form.Label>
              <Form.Control
                {...register('portfolio')}
                type="url"
                placeholder="Enter your portfolio URL"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Profile Image</Form.Label>
              <InputGroup>
                <Form.Control
                  {...register('image')}
                  type="text"
                  placeholder="Image URL"
                  disabled
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => document.getElementById('fileInput')?.click()}
                >
                  Upload
                </Button>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        {selectedImage && (
          <Row className="mb-3">
            <Col md={12}>
              <h5>Selected Image Preview</h5>
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Profile"
                width={150}
                height={150}
                objectFit="cover"
              />
            </Col>
          </Row>
        )}

        <Row className="mb-3">
          <Col md={12}>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default EditStudent;
