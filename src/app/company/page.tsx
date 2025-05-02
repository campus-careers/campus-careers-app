'use client';

import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma'; // Import prisma for database queries
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import CompanyCard from '@/components/CompanyCard';
import { Locations } from '@prisma/client'; // Import Locations enum from Prisma

/** Type definition for the company data */
type Company = {
  id: number;
  name: string;
  location: Locations;
  salary: number;
  overview: string;
  jobs: string;
  contacts: string;
  idealSkill: string[];
  userId: number;
};

/** Render a list of companies for the logged-in user. */
const CompaniesPage = async () => {
  // Protect the page, only logged-in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Fetch the companies using Prisma
  const companies = await prisma.company.findMany();

  console.log('Fetched companies:', companies);  // Add this log to check the result

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Company Profiles</h1>
              {companies.length === 0 ? (
                <p>No companies found. Please check back later.</p>
              ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {companies.map((company: Company) => (
                    <Col key={company.id}> {/* Use unique company id as key */}
                      <CompanyCard company={company} />
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default CompaniesPage;
