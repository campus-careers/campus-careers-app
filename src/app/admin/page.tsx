import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import CompanyAdmin from '@/components/CompanyAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Company, Student } from '@prisma/client';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const companies: Company[] = await prisma.company.findMany({
  });
  const students: Student[] = await prisma.student.findMany({});

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>Admin Dashboard</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              <h2>Companies</h2>
              {companies.map((company) => (
                <Col key={company.name}>
                  <CompanyAdmin company={company} />
                </Col>
              ))}
            </Row>
            <Row xs={1} md={2} lg={3} className="g-4">
              <h2>Students</h2>
              {students.map((student) => (
                <Col key={student.name}>
                  <Student student={student} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
