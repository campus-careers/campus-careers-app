'use client';

import { useState } from 'react';
import { Button, Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

const EditStudent = ({ student, onSave }: { student: any, onSave: (updatedData: any) => void }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: student?.name,
      email: student?.email,
      skills: student?.skills,
      image: student?.image || 'public/default-image.jpg', // Default image path
      location: student?.location,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setValue('image', file.name); // Update image value in form
    }
  };

  const onSubmit = async (data: any) => {
    // Handle the image upload logic here if needed, e.g., uploading to server
    const imageUrl = selectedImage ? `/images/${selectedImage.name}` : data.image;
    const updatedData = {
      ...data,
      image: imageUrl, // Assign the image URL or uploaded image to data
    };
    await onSave(updatedData); // Call the onSave function to save the updated data
    setSelectedImage(null); // Reset the selected image after the form is submitted
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
              <Form.Label>Skills</Form.Label>
              <Form.Control
                {...register('skills')}
                as="textarea"
                rows={3}
                placeholder="Enter your skills"
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
              Save Changes
            </Button>
          </Col>
        </Row>
      </Container>
    </form>
  );
};

export default EditStudent;
