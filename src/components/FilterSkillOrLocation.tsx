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
    companies: String[];
    interviews: String[];
  }[];
  skills: string[];
  locations: string[];
}) => {
  // state for selected skill and location
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // State for filtered users
  const [filteredUsers, setFilteredUsers] = useState(users);

  // state for filter list
  // const [filteredSkills, setFilteredSkills] = useState<string[]>(skills);
  // const [filteredLocations, setFilteredLocations] = useState<string[]>(locations);

  // handle search button click
  const handleSearch = async () => {
    const results = users.filter(
      (user) => (!selectedSkill || user.skills.includes(selectedSkill))
&& (!selectedLocation || user.location === selectedLocation),
    );

    setFilteredUsers(results);
  };
  // const matchedSkill = skills.filter((skill) => skill.toLowerCase().includes(selectedSkill.toLowerCase()));
  // const matchedLocation = locations.filter((location) => location.toLowerCase().includes(selectedLocation));

  // setFilteredSkills(matchedSkill);
  // setFilteredLocations(matchedLocation);

  return (
  /*
      <Container className="mt-5">
        <Row className="mb-4 align-items-center">
          <Col xs={5}>
            <Form.Group controlId="formBasicSkills">
              <Form.Control
                type="text"
                placeholder="Skill"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={5}>
            <Form.Group controlId="formBasicLocation">
              <Form.Control
                type="text"
                placeholder="Location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button variant="primary" className="w-100" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>
    */

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
      {/*
      Skills Section
      <Row className="mb-4">
        <Col>
          <h4>Skills</h4>
          <Row className="g-2">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <Col key={skill} xs={6} md={4} lg={3}>
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => setSelectedSkill(skill)}
          >
            {skill}
          </Button>
            </Col>
          ))
        ) : (
          <p>No matching skills found</p>
        )}
          </Row>
        </Col>
      </Row>

      Locations Section
      <Row>
        <Col>
          <h4>Locations</h4>
          <Row className="g-2">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <Col key={location} xs={6} md={4} lg={3}>
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => setSelectedLocation(location)}
          >
            {location}
          </Button>
            </Col>
          ))
        ) : (
          <p>No matching location found</p>
        )}
          </Row>
        </Col>
      </Row>
      */}
    </Container>
  );
};

export default FilterSkillOrLocation;
