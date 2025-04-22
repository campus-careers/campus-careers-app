import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import FilterSkillOrLocation from '@/components/FilterSkillOrLocation';

// import { adminList } from '@prisma/client';
const FilterSkillPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const filterListItem = await prisma.Filter.findMany({});
  const users = await prisma.user.findMany({});

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>Browse by Skill or Location</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {filterListItem.map((item) => (
                <Col key={item.id}>
                  <FilterSkillOrLocation {...item} />
                </Col>
              ))}
            </Row>

            {/* <Table striped bordered hover>
              <thead>
              <tr>
                <th>Name</th>
                <th>Skills</th>
                <th>Interests</th>
                <th>Preferred Location</th>
                <th>Recommended Companies</th>
                <th>Upcoming Interviews</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {stuff.map((item) => (
                <StuffItemAdmin key={item.id} {...item} />
              ))}
              </tbody>
            </Table> */}
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

export default FilterSkillPage;
