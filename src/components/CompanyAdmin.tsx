'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { Locations } from '@prisma/client';
import { deleteCompany } from '@/lib/dbActions';
import EditCompanyForm from './EditCompanyForm';

interface Company {
  id: number;
  name: string;
  location: Locations | string;
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
        data.map((company: any) => {
          const idealSkillArray = Array.isArray(company.idealSkill)
            ? company.idealSkill
            : company.idealSkill.split(',').map((s: string) => s.trim());

          return {
            ...company,
            idealSkill: idealSkillArray,
          };
        })
      );
    };

    fetchCompanies();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteCompany(id);
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Manage Companies</h2>
          <Card>
            <Card.Body>
              {companies.map((company) => {
                const parsedIdealSkill = Array.isArray(company.idealSkill)
                  ? company.idealSkill
                  : company.idealSkill.split(',').map((s: string) => s.trim());

                return editId === company.id && isAdmin ? (
                  <Container fluid className="px-4" key={company.id}>
                    <Row className="justify-content-center">
                      <Col lg={10}>
                        <EditCompanyForm
                          company={{
                            ...company,
                            location: company.location as Locations,
                            idealSkill: parsedIdealSkill,
                          }}
                          onFinish={() => setEditId(null)}
                        />
                        <div className="text-end mt-2">
                          <Button variant="secondary" size="sm" onClick={() => setEditId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <Card className="mb-3" key={company.id}>
                    <Card.Body>
                      <Row className="mb-2">
                        <Col md={6}>
                          <strong>Name:</strong> {company.name}
                        </Col>
                        <Col md={6}>
                          <strong>Location:</strong> {company.location}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col md={6}>
                          <strong>Salary:</strong> ${company.salary.toLocaleString()}
                        </Col>
                        <Col md={6}>
                          <strong>Contacts:</strong> {company.contacts}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <strong>Overview:</strong> {company.overview}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <strong>Jobs:</strong> {company.jobs}
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <strong>Ideal Skills:</strong> {parsedIdealSkill.join(', ')}
                        </Col>
                      </Row>
                      {isAdmin && (
                        <div className="d-flex gap-2 mt-3">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setEditId(company.id)}
                          >
                            Edit Profile
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(company.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyAdmin;
