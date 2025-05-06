'use client';

import { useState } from 'react';
import { Button, Col, Container, Row, Form, InputGroup, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

const locations: string[] = [
  'Remote', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

const skills: string[] = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'Kotlin',
  'Swift', 'HTML', 'CSS', 'SQL', 'R', 'PHP', 'Perl', 'Scala', 'MATLAB', 'Dart', 'Elixir',
  'Shell', 'Assembly', 'Objective-C',
];

const EditStudent = ({ student, onSave }: { student: any, onSave: (updatedData: any) => void }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: student?.name,
      email: student?.email,
      skills: student?.skills || [],
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
    }
  };

  const onSubmit = async (data: any) => {
    setUploadError(null);
    setSuccessMessage(null);
    let imageUrl = student?.image || '';

    if (selectedImage) {
      const safeName = selectedImage.name.replace(/\s+/g, '-').toLowerCase();
      const filePath = `student/${Date.now()}_${safeName}`;

      const { data: uploadData, error } = await supabase.storage
        .from('profile-images')
        .upload(filePath, selectedImage, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.error('Upload failed:', error);
        setUploadError('Image upload failed. Please try again.');
        return;
      }

      const { data: publicData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      imageUrl = publicData.publicUrl;
    }

    const updatedData = {
      ...data,
      skills: Array.isArray(data.skills) ? data.skills : [data.skills],
      location: data.location || '',
      interests: data.interests.split(',').map((i: string) => i.trim()),
      image: imageUrl,
    };

    try {
      await onSave(updatedData);
      setSelectedImage(null);
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setUploadError('Failed to save profile. Please try again.');
    }
  };

  return (
    <>
      {uploadError && (
        <Alert variant="danger" dismissible onClose={() => setUploadError(null)}>{uploadError}</Alert>
      )}

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage(null)}>{successMessage}</Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Container className="mt-4">
          <Row className="mb-3">
            <Col><h3 className="text-center fw-bold">Edit Student Profile</h3></Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group className="border p-3 rounded">
                <Form.Label className="fw-bold">Full Name</Form.Label>
                <Form.Control {...register('name')} type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="border p-3 rounded">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control {...register('email')} type="email" disabled />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group className="border p-3 rounded">
                <Form.Label className="fw-bold">Major</Form.Label>
                <Form.Control {...register('major')} type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="border p-3 rounded">
                <Form.Label className="fw-bold">Location</Form.Label>
                <Form.Control {...register('location')} as="select">
                  {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Group className="border p-3 rounded">
                <Form.Label className="fw-bold">Interests</Form.Label>
                <Form.Control {...register('interests')} type="text" placeholder="e.g. Programming, AI, Music" />
                <small className="text-muted">Separate with commas</small>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group className="border p-3 rounded">
                <Form.Label className="fw-bold">Skills</Form.Label>
                <Form.Control {...register('skills')} as="select" multiple>
                  {skills.map((s) => <option key={s} value={s}>{s}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="border p-3 rounded">
                <Form.Label className="fw-bold">Portfolio URL</Form.Label>
                <Form.Control {...register('portfolio')} type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Group className="border p-3 rounded">
                <Form.Label className="fw-bold">Profile Image</Form.Label>
                <InputGroup>
                  <Button onClick={() => document.getElementById('fileInput')?.click()} variant="outline-secondary">
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

          {(selectedImage || student?.image) && (
            <Row className="mb-4">
              <Col>
                <h5 className="fw-semibold">Image Preview</h5>
                <Image
                  src={selectedImage ? URL.createObjectURL(selectedImage) : student?.image ?? ''}
                  alt="Preview"
                  width={150}
                  height={150}
                  style={{ objectFit: 'cover' }}
                />
              </Col>
            </Row>
          )}

          <Row className="mb-4">
            <Col>
              <Button type="submit" variant="primary" className="fw-semibold">Save Changes</Button>
            </Col>
          </Row>
        </Container>
      </form>
    </>
  );
};

export default EditStudent;
