'use client';

import { getServerSession } from 'next-auth';
import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma'; // Import prisma for database queries
import authOptions from '@/lib/authOptions';
import CompanyCard from '@/components/CompanyCard';
import { Locations } from '@prisma/client'; // Import Locations enum

/** Type definition for the company data */
type Company = {
  id: number;
  name: string;
  location: Locations; // Ensure location is typed as Locations
  salary: number;
  overview: string;
  jobs: string;
  contacts: string;
  idealSkill: string[];
  userId: number;
};

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To handle errors

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
          setError('You need to be logged in to view this page');
          setLoading(false);
          return;
        }

        // Fetch the companies using Prisma
        const companiesData = await prisma.company.findMany();
        if (companiesData) {
          setCompanies(companiesData);
        } else {
          setError('No companies found');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError('Failed to load companies');
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);  // Empty dependency array means this will run once on component mount

  if (loading) {
    return (
      <main>
        <Container className="text-center mt-5">
          <h1>Loading companies...</h1>
        </Container>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <Container className="text-center mt-5">
          <h1>{error}</h1>
        </Container>
      </main>
    );
  }

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
                  {companies.map((company) => (
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
