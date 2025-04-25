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

  const allSkills = Object.values(Skill) as Skill[];
  const allLocations = Object.values(Locations) as Locations[];

  const studentList = (await prisma.student.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      skills: true,
      location: true,
      companies: true, // ✅ Include companies
      interviews: true, // ✅ Include interviews
    },
  })).map(student => ({
    ...student,
    id: student.id.toString(),
    skills: student.skills.map(skill => skill.toString()),
    location: student.location.toString(),
    companies: student.companies ?? [],
    interviews: student.interviews ?? [],
  }));

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>Browse by Skill or Location</h1>
            <FilterSkillOrLocation
              skills={allSkills}
              locations={allLocations}
              users={studentList}
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default FilterSkillPage;
