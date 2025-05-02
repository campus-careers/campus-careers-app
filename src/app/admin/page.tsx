import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { Student, User } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { adminProtectedPage } from '@/lib/page-protection';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

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

  const adminEmails = (
    await prisma.adminList.findMany({
      select: { email: true },
    })
  ).map((admin) => admin.email);

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
      major: true,
      portfolio: true,
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
                  <div className="p-3 border rounded shadow-sm">
                    <h5 className="fw-bold">{item.name}</h5>
                    <p>
                      <strong>Email:</strong>
                      {' '}
                      {item.email}
                    </p>
                    <p>
                      <strong>Major:</strong>
                      {' '}
                      {item.major || 'N/A'}
                    </p>
                    <p>
                      <strong>Location:</strong>
                      {' '}
                      {item.location}
                    </p>
                    <p>
                      <strong>Portfolio:</strong>
                      {' '}
                      {item.portfolio || 'N/A'}
                    </p>

                    <div>
                      <strong>Skills:</strong>
                      {item.skills.length > 0 ? (
                        <ul className="list-inline mt-2">
                          {item.skills.map((skill) => (
                            <li key={skill} className="list-inline-item">
                              <span className="badge bg-success">{skill}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">No skills listed</p>
                      )}
                    </div>
                  </div>
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
