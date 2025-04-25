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
  name,
  skills,
  interests,
  location,
  companies,
  interviews,
  image,
  id,
}: AdminDashboardProps) => (
  <Card className="h-100">
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Img variant="top" src={image} width={75} height={75} />
      <Card.Text>
        <strong>Skills:</strong>
        {' '}
        {skills.join(', ')}
      </Card.Text>
      <Card.Text>
        <strong>Interests:</strong>
        {' '}
        {interests.join(', ')}
      </Card.Text>
      <Card.Text>
        <strong>Location:</strong>
        {' '}
        {location}
      </Card.Text>
      <Card.Text>
        <strong>Companies:</strong>
        {' '}
        {companies.join(', ')}
      </Card.Text>
      <Card.Text>
        <strong>Interviews:</strong>
        {' '}
        {interviews.join(', ')}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <a href={`/edit/${id}`} className="btn btn-primary">
        Edit
      </a>
    </Card.Footer>
  </Card>
);

export default AdminDashboard;
