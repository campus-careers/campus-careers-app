import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import FilterSkillOrLocation from '@/components/FilterSkillOrLocation';
import { Skill, Locations } from '@prisma/client';

// import { adminList } from '@prisma/client';
const FilterSkillPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  // const filterListItem = await prisma.filter.findMany({});
  const users = await prisma.user.findMany({});
  const allSkills = Object.values(Skill) as Skill[];
  const allLocations = Object.values(Locations) as Locations[];
  // console.log('Filter List Items:', filterListItem);

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>Browse by Skill or Location</h1>
            {/* Render FilterSkillOrLocation once and pass allSkills and allLocations */}
            <FilterSkillOrLocation skills={allSkills} locations={allLocations} />
          </Col>
        </Row>
        <br />
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
