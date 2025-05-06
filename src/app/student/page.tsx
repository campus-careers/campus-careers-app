'use client';

import { useState } from 'react';
import { Button, Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

const AddStudentInfo = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { register, handleSubmit } = useForm();

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    const imageUrl = selectedImage ? `/images/${selectedImage.name}` : data.image;
    // Update the student data (send it to the backend or context)
    const updatedData = {
      ...data,
      image: imageUrl,
    };

    // Perform save action (e.g., API call to save data)
    console.log(updatedData);

    // Reset form state or provide feedback
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Row className="mb-3">
          <Col md={12}>
            <h3>Complete Your Profile</h3>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                {...register('name')}
                type="text"
                placeholder="Enter your full name"
                required
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
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Skills</Form.Label>
              <Form.Control
                {...register('skills')}
                type="text"
                placeholder="Enter your skills"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                {...register('location')}
                type="text"
                placeholder="Enter your location"
                required
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
                src={URL.createObjectURL(selectedImage)} // Display the uploaded image
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
              Save and Continue
            </Button>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default AddStudentInfo;
