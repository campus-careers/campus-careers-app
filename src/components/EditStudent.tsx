'use client';

import { useState } from 'react';
import { Card, Col, Form, Row, Image, Button } from 'react-bootstrap';

const EditStudent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('Full Name');
  const [location, setLocation] = useState('Preferred Location');
  const [skills, setSkills] = useState('Skill 1, Skill 2, Skill 3');
  const [imageURL, setImageURL] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageURL(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Card className="p-3">
      <Row>
        <Col xs={4} className="d-flex flex-column align-items-center">
          {imageURL ? (
            <Image
              src={imageURL}
              alt="Profile"
              style={{
                width: '100%',
                borderRadius: '4px',
                objectFit: 'cover',
                aspectRatio: '1 / 1',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                paddingBottom: '100%',
                backgroundColor: '#eee',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          )}
          {isEditing && (
            <Form.Group className="mt-2 w-100">
              <Form.Label className="w-100">
                <div className="btn btn-outline-secondary w-100 text-center">
                  Upload Picture
                </div>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </Form.Label>
            </Form.Group>
          )}
        </Col>
        <Col xs={8}>
          <Form.Group>
            <Form.Label className="fw-bold">Full Name</Form.Label>
            {isEditing ? (
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            ) : (
              <p>{fullName}</p>
            )}
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Location</Form.Label>
            {isEditing ? (
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            ) : (
              <p>{location}</p>
            )}
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Skills</Form.Label>
            {isEditing ? (
              <Form.Control
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            ) : (
              <p>{skills}</p>
            )}
          </Form.Group>

          <Button className="mt-3" onClick={toggleEdit}>
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default EditStudent;
