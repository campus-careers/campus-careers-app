import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
// eslint-disable-next-line import/extensions
import { Company } from '@prisma/client';
// eslint-disable-next-line import/extensions
import { loggedInProtectedPage } from '@/lib/page-protection';
// eslint-disable-next-line import/extensions
import authOptions from '@/lib/authOptions';
// eslint-disable-next-line import/extensions
import CompanyCard from '@/components/CompanyCard';
// eslint-disable-next-line import/extensions
import { prisma } from '@/lib/prisma';

/** Render a list of stuff for the logged in user. */
const CompaniesPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const owner = session?.user!.email ? session.user.email : '';
  const companies: Company[] = await prisma.company.findMany({
    where: {
      owner,
    },
  });
  // console.log(companies);

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Company Profiles</h1>
              <Row xs={1} md={2} lg={3} className="g-4">
                {companies.map((company) => (
                  <Col key={company.name}>
                    <CompanyCard company={company} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default CompaniesPage;
