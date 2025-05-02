'use client';

import { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import CompanyCard from '@/components/CompanyCard';
import { Container, Row, Col } from 'react-bootstrap';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCompanies() {
      const session = await getServerSession(authOptions);
      if (!session?.user?.email) {
        return;
      }

      // Fetch companies from the database
      const companiesRaw = await prisma.company.findMany();
      setCompanies(companiesRaw);
      setLoading(false);
    }

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <main>
        <Container className="text-center mt-5">
          <h1>Loading...</h1>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Company Profiles</h1>
              {companies.length === 0 ? (
                <p>No companies found. Please check back later.</p>
              ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {companies.map((company: any) => (
                    <Col key={company.id}>
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
