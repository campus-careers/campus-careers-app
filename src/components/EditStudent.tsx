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
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
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
      interests: student?.interests.join(', '),
      portfolio: student?.portfolio || '',
      major: student?.major || '',
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
    const updatedData = {
      ...data,
      skills: data.skills || [],
      location: data.location || '',
      interests: data.interests.split(',').map((interest: string) => interest.trim()),
      image: selectedImage ? `/images/${selectedImage.name}` : data.image,
    };

    await onSave(updatedData);
    setSelectedImage(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col md={12}>
            <h3 className="text-center" style={{ fontWeight: '700' }}>Edit Student Profile</h3>
          </Col>
        </Row>

        {/* Full Name Section */}
        <Row className="mb-4" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Full Name</Form.Label>
              <Form.Control
                {...register('name')}
                type="text"
                placeholder="Enter your name"
                style={{ fontSize: '1rem' }}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Email Section */}
        <Row className="mb-4" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <Col md={12}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
              <Form.Control
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                disabled
                style={{ fontSize: '1rem' }}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Major and Location Section */}
        <Row className="mb-4" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Major</Form.Label>
              <Form.Control
                {...register('major')}
                type="text"
                placeholder="Enter your major"
                style={{ fontSize: '1rem' }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Location</Form.Label>
              <Form.Control
                {...register('location')}
                as="select"
                style={{ fontSize: '1rem' }}
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

        {/* Interests Section */}
        <Row className="mb-4" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <Col md={12}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Interests</Form.Label>
              <Form.Control
                {...register('interests')}
                type="text"
                placeholder="Enter your interests (comma-separated)"
                style={{ fontSize: '1rem' }}
              />
              <small style={{ color: 'black' }}>
                Separate each interest with a comma (e.g., &apos;Programming, AI, Music&apos;)
              </small>
            </Form.Group>
          </Col>
        </Row>

        {/* Skills Section */}
        <Row className="mb-4" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <Col md={12}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Skills</Form.Label>
              <Form.Control
                {...register('skills')}
                as="select"
                multiple
                style={{ fontSize: '1rem' }}
              >
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </Form.Control>
              <small style={{ color: 'black' }}>
                Hold Ctrl (Windows) or Cmd (Mac) to select multiple.
              </small>
            </Form.Group>
          </Col>
        </Row>

        {/* Portfolio URL Section */}
        <Row className="mb-4" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <Col md={12}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Portfolio URL</Form.Label>
              <Form.Control
                {...register('portfolio')}
                type="text"
                placeholder="Enter your portfolio URL"
                style={{ fontSize: '1rem' }}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Profile Image Section */}
        <Row className="mb-4" style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
          <Col md={12}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 'bold' }}>Profile Image</Form.Label>
              <InputGroup>
                <Form.Control
                  {...register('image')}
                  type="text"
                  placeholder="Image URL"
                  disabled
                  style={{ fontSize: '1rem' }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => document.getElementById('fileInput')?.click()}
                  style={{ fontSize: '1rem', fontWeight: '600' }}
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
          <Row className="mb-4">
            <Col md={12}>
              <h5 style={{ fontWeight: '600' }}>Selected Image Preview</h5>
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

        <Row className="mb-4">
          <Col md={12}>
            <Button variant="primary" type="submit" style={{ fontSize: '1rem', fontWeight: '600' }}>
              Save Changes
            </Button>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default EditStudent;
