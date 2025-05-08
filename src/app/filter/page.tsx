import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import FilterSkillOrLocation from '@/components/FilterSkillOrLocation';

const FilterSkillPage = async () => {
  // 1. Fetch distinct skills and locations from Students
  const students = await prisma.student.findMany({
    select: {
      skills: true,
      location: true,
    },
  });

  // Flatten skills and collect unique
  const allSkillsSet = new Set<string>();
  const allLocationsSet = new Set<string>();

  students.forEach((student) => {
    if (student.skills) {
      student.skills.forEach((skill) => allSkillsSet.add(skill));
    }
    if (student.location) {
      allLocationsSet.add(student.location);
    }
  });

  const allSkills = Array.from(allSkillsSet);
  const allLocations = Array.from(allLocationsSet);

  // 2. Fetch Admin Students
  const adminEmails = (
    await prisma.adminList.findMany({
      select: { email: true },
    })
  ).map((admin) => admin.email);

  const adminList = (
    await prisma.student.findMany({
      where: { email: { in: adminEmails } },
      select: {
        id: true,
        name: true,
        image: true,
        skills: true,
        location: true,
        companies: true,
        interviews: true,
      },
    })
  ).map((student) => ({
    ...student,
    id: student.id.toString(),
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
              users={adminList}
            />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default FilterSkillPage;
