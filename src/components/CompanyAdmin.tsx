'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { deleteCompany } from '@/lib/dbActions';
import { Locations } from '@prisma/client';
import EditCompanyForm from './EditCompanyForm';

interface Company {
  id: number;
  name: string;
  location: string;
  salary: number;
  overview: string;
  jobs: string;
  contacts: string;
  idealSkill: string[] | string;
  userId: number;
}

const CompanyAdmin: React.FC = () => {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const isAdmin = session?.user?.email === 'admin@foo.com';

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch('/api/companies');
      const data = await res.json();

      setCompanies(
        data.map((company: Company) => ({
          ...company,
          idealSkill: Array.isArray(company.idealSkill)
            ? company.idealSkill
            : company.idealSkill.split(',').map((s: string) => s.trim()),
        }))
      );
    };

    fetchCompanies();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteCompany(id);
    setCompanies(companies.filter((c) => c.id !== id));
  };

  const handleFinishEdit = () => setEditId(null);

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Company Profiles</h2>
          <Row xs={1} md={2} lg={2} className="g-4">
            {companies.map((company) => (
              <Col key={company.id}>
                {editId === company.id ? (
                  <EditCompanyForm
                    company={{
                      ...company,
                      location: company.location as Locations,
                      idealSkill: Array.isArray(company.idealSkill)
                        ? company.idealSkill
                        : company.idealSkill.split(',').map((s) => s.trim()),
                    }}
                    onFinish={handleFinishEdit}
                  />
                ) : (
                  <Card className="p-3 shadow-sm h-100">
                    <Card.Body>
                      <Card.Title className="fw-bold">{company.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {company.location}
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Salary:</strong> ${company.salary.toLocaleString()}
                      </Card.Text>
                      <Card.Text>
                        <strong>Overview:</strong> {company.overview}
                      </Card.Text>
                      <Card.Text>
                        <strong>Jobs:</strong> {company.jobs}
                      </Card.Text>
                      <Card.Text>
                        <strong>Contacts:</strong> {company.contacts}
                      </Card.Text>
                      <Card.Text>
                        <strong>Recommended Skills:</strong>{' '}
                        {Array.isArray(company.idealSkill)
                          ? company.idealSkill.join(', ')
                          : company.idealSkill}
                      </Card.Text>
                      {isAdmin && (
                        <div className="d-flex flex-column gap-2 mt-3">
                          <Button
                            variant="outline-primary"
                            onClick={() => setEditId(company.id)}
                          >
                            Edit Profile
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(company.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                )}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyAdmin;
