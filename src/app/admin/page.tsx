import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { AdminList, User } from '@prisma/client'; // ✅ correct
import authOptions from '@/lib/authOptions';
import AdminDashboard from '@/components/AdminDashboard';
import { adminProtectedPage } from '@/lib/page-protection';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const adminListItem: AdminList[] = await prisma.adminList.findMany(); // ✅ correct
  const users: User[] = await prisma.user.findMany();

  return (
    <main>
      <Container id="admin" fluid className="py-4">
        <Row>
          <Col>
            <h1>Admin Portal</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {adminListItem.map((item: AdminList) => (
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
