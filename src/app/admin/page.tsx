import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { Student, User } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import AdminDashboard from '@/components/AdminDashboard';
import { adminProtectedPage } from '@/lib/page-protection';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  // ✅ Safely extract only necessary fields
  const safeSession = session
    ? {
      user: {
        email: session.user?.email ?? '',
        id: session.user?.id ?? '',
        randomKey: session.user?.randomKey ?? '',
      },
    }
    : null;

  adminProtectedPage(safeSession);

  const adminEmails = (await prisma.adminList.findMany({
    select: { email: true },
  })).map((admin) => admin.email);

  const adminListItem: Student[] = await prisma.student.findMany({
    where: {
      email: { in: adminEmails },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      skills: true,
      location: true,
      companies: true,
      interests: true,
      interviews: true,
    },
  });

  const users: User[] = await prisma.user.findMany();

  return (
    <main>
      <Container id="admin" fluid className="py-4">
        <Row>
          <Col>
            <h1>Admin Portal</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {adminListItem.map((item) => (
                <Col key={item.id}>
                  <AdminDashboard {...{
                    ...item,
                    id: item.id.toString(),
                  }}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row className="mt-4">
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
      </Container>
    </main>
  );
};

export default AdminPage;
