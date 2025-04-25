import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { revalidatePath } from 'next/cache';

// === Server Actions ===

async function addSkill(formData: FormData) {
  'use server';

  const name = formData.get('skill') as string;
  if (name) {
    await prisma.skill.create({ data: { name } });
    revalidatePath('/admin');
  }
}

async function deleteSkill(id: number) {
  'use server';

  await prisma.skill.delete({ where: { id } });
  revalidatePath('/admin');
}

function deleteSkillAction(id: number) {
  'use server';

  return deleteSkill(id);
}

async function addLocation(formData: FormData) {
  'use server';

  const name = formData.get('location') as string;
  if (name) {
    await prisma.location.create({ data: { name } });
    revalidatePath('/admin');
  }
}

async function deleteLocation(id: number) {
  'use server';

  await prisma.location.delete({ where: { id } });
  revalidatePath('/admin');
}

function deleteLocationAction(id: number) {
  'use server';

  return deleteLocation(id);
}

// === Page Component ===

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(session as { user: { email: string; id: string; randomKey: string } } | null);

  const stuff = await prisma.stuff.findMany({});
  const users = await prisma.user.findMany({});
  const skills = await prisma.skill.findMany();
  const locations = await prisma.location.findMany();

  return (
    <main>
      <Container id="admin" fluid className="py-4">
        <Row>
          <Col>
            <h1>Stuff (Admin View)</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Condition</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {stuff.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.condition}</td>
                    <td>{item.owner}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h1>User List</h1>
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
          <Col md={6}>
            <h2>Manage Skills</h2>
            <form action={addSkill} className="mb-3 d-flex gap-2">
              <input type="text" name="skill" placeholder="New skill" className="form-control" required />
              <button type="submit" className="btn btn-primary">Add</button>
            </form>
            <ul className="list-group">
              {skills.map((skill) => (
                <li key={skill.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {skill.name}
                  <form action={deleteSkillAction.bind(null, skill.id)}>
                    <button type="submit" className="btn btn-sm btn-danger">Delete</button>
                  </form>
                </li>
              ))}
            </ul>
          </Col>

          <Col md={6}>
            <h2>Manage Locations</h2>
            <form action={addLocation} className="mb-3 d-flex gap-2">
              <input type="text" name="location" placeholder="New location" className="form-control" required />
              <button type="submit" className="btn btn-primary">Add</button>
            </form>
            <ul className="list-group">
              {locations.map((loc) => (
                <li key={loc.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {loc.name}
                  <form action={deleteLocationAction.bind(null, loc.id)}>
                    <button type="submit" className="btn btn-sm btn-danger">Delete</button>
                  </form>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
