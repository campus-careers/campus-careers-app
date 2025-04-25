import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table, Form, Button } from 'react-bootstrap';
import StuffItemAdmin from '@/components/StuffItemAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const stuff = await prisma.stuff.findMany({});
  const users = await prisma.user.findMany({});
  const skills = await prisma.skill.findMany();
  const locations = await prisma.location.findMany();

  return (
    <main>
      <Container id="admin" fluid className="py-3">
        <Row>
          <Col>
            <h1>List Stuff Admin</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stuff.map((item) => (
                  <StuffItemAdmin key={item.id} {...item} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h1>List Users Admin</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h1>Manage Tags (Skills & Locations)</h1>

            <h5>Skills</h5>
            <ul>
              {skills.map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>

            <Form action="/api/admin/add-skill" method="POST" className="mb-3">
              <Form.Group controlId="skill">
                <Form.Label>Add Skill</Form.Label>
                <Form.Control name="name" type="text" placeholder="e.g. React" required />
              </Form.Group>
              <Button type="submit" className="mt-2">Add Skill</Button>
            </Form>

            <h5>Locations</h5>
            <ul>
              {locations.map((loc) => (
                <li key={loc.id}>{loc.name}</li>
              ))}
            </ul>

            <Form action="/api/admin/add-location" method="POST">
              <Form.Group controlId="location">
                <Form.Label>Add Location</Form.Label>
                <Form.Control name="name" type="text" placeholder="e.g. Honolulu" required />
              </Form.Group>
              <Button type="submit" className="mt-2">Add Location</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
