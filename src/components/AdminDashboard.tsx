'use client';

import { adminList } from '@prisma/client';
import { Card } from 'react-bootstrap';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const AdminDashboard = ({ name, skills, interests, location, companies, interviews, image, id }: adminList) => (
  <Card className="h-100">
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Img variant="top" src={image} width={75} height={75} />
      <Card.Text>
        <strong>Skills:</strong>
        {skills.join(', ')}
      </Card.Text>
      <Card.Text>
        <strong>Interests:</strong>
        {interests.join(', ')}
      </Card.Text>
      <Card.Text>
        <strong>Location:</strong>
        {location}
      </Card.Text>
      <Card.Text>
        <strong>Companies:</strong>
        {companies.join(', ')}
      </Card.Text>
      <Card.Text>
        <strong>Interviews:</strong>
        {interviews.join(', ')}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <a href={`/edit/${id}`} className="btn btn-primary">
        Edit
      </a>
    </Card.Footer>
  </Card>
  /*
  <tr>
    <td>{image}</td>
    <td>{name}</td>
    <td>{skills}</td>
    <td>{interests}</td>
    <td>{location}</td>
    <td>{companies}</td>
    <td>{interviews}</td>
    <td>
      <a href={`/edit/${id}`}>Edit</a>
    </td>
  </tr>
  */
);

export default AdminDashboard;
