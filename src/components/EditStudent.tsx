import { FC } from 'react';
import { Button, Form } from 'react-bootstrap';

// Define the Student type here
type Student = {
  id: number;
  name: string;
  email: string;
  skills: string[];
  image: string;  // Ensure 'image' is part of the 'Student' type
  location: string;
  companies: string[];
  interviews: string[];
  interests: string[];
  major?: string;
  portfolio?: string;
};

type EditableProfileProps = {
  student: Student;  // Use the Student type here
  onSave: () => void;
};

const EditableProfile: FC<EditableProfileProps> = ({ student, onSave }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload logic here
      console.log("Image file selected:", file);
      // You can add logic to upload the image to the server here
    }
  };

  return (
    <div>
      <h4>Profile Information</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={student.name} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={student.email} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" value={student.location} readOnly />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <div>
            <img
              src={student.image || 'default-image.jpg'} // Fallback to default image if no profile image exists
              alt="Profile"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default EditableProfile;
