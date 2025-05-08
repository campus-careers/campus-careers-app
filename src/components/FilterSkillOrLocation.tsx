'use client';

// import { Filter } from '@prisma/client';
import { useState } from 'react';
import { Button, Container, Row, Col, Form, Table, Image } from 'react-bootstrap';

/* Renders a filter in the List Skills/Location table. See filter/page.tsx. */
const FilterSkillOrLocation = ({
  users,
  skills,
  locations,
}: {
  users: {
    id: string;
    name: string;
    image: string;
    skills: string[];
    location: string;
    companies: string[];
    interviews: string[];
  }[];
  skills: string[];
  locations: string[];
}) => {
  // state for selected skill and location
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // State for filtered users
  const [filteredUsers, setFilteredUsers] = useState(users);
  // handle search button click
  const handleSearch = async () => {
    const query = new URLSearchParams();
    if (selectedSkill) query.append('skill', selectedSkill);
    if (selectedLocation) query.append('location', selectedLocation);
  
    const res = await fetch(`/api/filter-users?${query.toString()}`);
    const data = await res.json();
    setFilteredUsers(data);
  };
  return (

    <Container className="mt-5">
      {/* Search Section */}
      <Row className="mb-4 align-items-center">
        <Col xs={5}>
          <Form.Group controlId="formBasicSkills">
            <Form.Control
              as="select"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="">Select Skill</option>
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={5}>
          <Form.Group controlId="formBasicLocation">
            <Form.Control
              as="select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Button variant="primary" className="w-100" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>

      {/* Filtered Results Section */}
      <Row>
        <Col>
          <h4>Filtered Users</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Skills</th>
                <th>Location</th>
                <th>Companies</th>
                <th>Interviews</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>
                      <Image src={user.image} alt={user.name} rounded width={50} height={50} />
                    </td>
                    <td>{user.skills.join(', ')}</td>
                    <td>{user.location}</td>
                    <td>{user.companies.join(', ')}</td>
                    <td>{user.interviews.join(', ')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No matching users found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterSkillOrLocation;
