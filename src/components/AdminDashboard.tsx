'use client';

import { Card } from 'react-bootstrap';

type AdminDashboardProps = {
  id: string;
  name: string;
  image: string;
  skills: string[];
  interests: string[];
  location: string;
  companies: string[];
  interviews: string[];
};

const AdminDashboard = ({
  id,
  name,
  image,
  skills,
  interests,
  location,
  companies,
  interviews,
}: AdminDashboardProps) => (
  <Card
    className="shadow-sm rounded-4 mb-4"
    style={{ maxWidth: '500px', margin: '0 auto' }}
  >
    <Card.Img
      variant="top"
      src={image}
      alt={`${name}'s profile`}
      style={{
        height: '180px',
        objectFit: 'cover',
        borderTopLeftRadius: '0.75rem',
        borderTopRightRadius: '0.75rem',
      }}
    />
    <Card.Body>
      <Card.Title className="fw-bold">{name}</Card.Title>
      <Card.Text>
        <strong>Skills:</strong> {skills.join(', ')}
      </Card.Text>
      <Card.Text>
        <strong>Interests:</strong> {interests.join(', ')}
      </Card.Text>
      <Card.Text>
        <strong>Location:</strong> {location}
      </Card.Text>
      <Card.Text>
        <strong>Companies:</strong> {companies.join(', ')}
      </Card.Text>
      <Card.Text>
        <strong>Interviews:</strong> {interviews.join(', ')}
      </Card.Text>
    </Card.Body>
    <Card.Footer className="text-center">
      <a href={`/edit/${id}`} className="btn btn-primary btn-sm w-100">
        Edit
      </a>
    </Card.Footer>
  </Card>
);

export default AdminDashboard;
