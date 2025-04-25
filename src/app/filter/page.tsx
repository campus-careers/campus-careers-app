import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import FilterSkillOrLocation from '@/components/FilterSkillOrLocation';
import { Skill, Locations } from '@prisma/client';

const FilterSkillPage = async () => {
  const session = await getServerSession(authOptions);

  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Get all enum values for skills and locations
  const allSkills = Object.values(Skill) as Skill[];
  const allLocations = Object.values(Locations) as Locations[];

  // 1. Get all admin emails from AdminList
  const adminEmails = (await prisma.adminList.findMany({
    select: { email: true },
  })).map((admin) => admin.email);

  // 2. Fetch matching Students with full profile info
  const adminList = (await prisma.student.findMany({
    where: {
      email: { in: adminEmails },
    },
    select: {
      id: true,
      name: true,
      image: true,
      skills: true,
      location: true,
      companies: true,
      interviews: true,
    },
  })).map(admin => ({
    ...admin,
    id: admin.id.toString(), // convert id to string if needed
  }));

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>Browse by Skill or Location</h1>
            {/* Pass down skills, locations, and filtered users */}
            <FilterSkillOrLocation
              skills={allSkills}
              locations={allLocations}
              users={adminList}
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default FilterSkillPage;
