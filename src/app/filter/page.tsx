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

  // Get all skills and locations from enums
  // Note
  const allSkills = Object.values(Skill) as Skill[];
  const allLocations = Object.values(Locations) as Locations[];

  // 1. Fetch admin emails from AdminList
  const adminEmails = (await prisma.adminList.findMany({
    select: { email: true },
  })).map((admin) => admin.email);

  // 2. Fetch Students where their email matches AdminList emails
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
  })).map((student) => ({
    ...student,
    id: student.id.toString(), // Convert id to string
  }));

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>Browse by Skill or Location</h1>
            {/* Render the FilterSkillOrLocation component */}
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
