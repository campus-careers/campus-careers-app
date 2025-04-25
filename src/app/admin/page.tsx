import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import AdminDashboard from '@/components/AdminDashboard';
import { Student, User } from '@prisma/client'; // ✅ import correct types

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const adminListItem: Student[] = await prisma.student.findMany({}); // ✅ fix model
  const users: User[] = await prisma.user.findMany();

  return (
    <main>
      <Container id="admin" fluid className="py-4">
        <Row>
          <Col>
            <h1>Admin Portal</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {adminListItem.map((item: Student) => (
                <Col key={item.id}>
                  <AdminDashboard {...item} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row>
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
