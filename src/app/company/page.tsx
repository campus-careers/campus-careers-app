import { getServerSession } from 'next-auth';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Company } from '@prisma/client';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import CompanyCard from '@/components/CompanyCard';
import BrowseCompaniesStudent from '@/components/BrowseCompaniesStudent';
import { prisma } from '@/lib/prisma';
import { useState } from 'react';

/** Render a list of companies for the logged-in user. */
const CompaniesPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Fetch all companies from the database
  const companies: Company[] = await prisma.company.findMany();

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center mb-4">Company Profiles</h1>

              {/* Search and Filter Form */}
              <Form className="mb-4 d-flex justify-content-center">
                <Form.Control
                  type="text"
                  placeholder="Search by company name or category"
                  id="search-input"
                  className="me-2"
                  style={{ maxWidth: '300px' }}
                />
                <Button variant="primary" id="search-button">
                  Search
                </Button>
              </Form>

              <Row xs={1} md={2} lg={3} className="g-4">
                {companies.map((company) => (
                  <Col key={company.id} className='d-flex'>
                    <CompanyCard company={company} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          {/* Browse Companies for Students */}
          <Row className="mt-5">
            <Col>
              <BrowseCompaniesStudent companies={companies} />
            </Col>
          </Row>
        </Container>
      </Container>

      <script>
        {`
          document.getElementById('search-button').addEventListener('click', function() {
            const searchValue = document.getElementById('search-input').value.toLowerCase();
            const companyCards = document.querySelectorAll('.company-card');

            companyCards.forEach((card) => {
              const name = card.querySelector('.company-name').textContent.toLowerCase();
              const category = card.querySelector('.company-category').textContent.toLowerCase();

              if (name.includes(searchValue) || category.includes(searchValue)) {
                card.style.display = '';
              } else {
                card.style.display = 'none';
              }
            });
          });
        `}
      </script>
    </main>
  );
};

export default CompaniesPage;
