'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { deleteCompany } from '@/lib/dbActions';
import { useSession } from 'next-auth/react';
import EditCompanyForm from './EditCompanyForm';
import { Locations } from '@prisma/client';

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
  const { data: session, status } = useSession();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const isAdmin = session?.user?.email === 'admin@foo.com';

  useEffect(() => {
    console.log('Logged in as:', session?.user?.email); // ✅ DEBUG LOG
  }, [session]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch('/api/companies');
      const data = await res.json();
      setCompanies(data);
    };

    fetchCompanies();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteCompany(id);
    setCompanies(companies.filter((company) => company.id !== id));
  };

  if (status === 'loading') return <div>Loading session...</div>;
  if (!session) return <div>You must be signed in.</div>;

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Manage Companies</h2>
          <Card>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Overview</th>
                    <th>Jobs</th>
                    <th>Contacts</th>
                    <th>Ideal Skills</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => {
                    const processedCompany = {
                      id: company.id,
                      name: company.name,
                      salary: company.salary,
                      overview: company.overview,
                      jobs: company.jobs,
                      contacts: company.contacts,
                      location: company.location as Locations,
                      idealSkill: Array.isArray(company.idealSkill)
                        ? company.idealSkill
                        : company.idealSkill.split(',').map((s) => s.trim()),
                      userId: company.userId,
                    };

                    return (
                      <tr key={company.id}>
                        {editId === company.id && isAdmin ? (
                          <td colSpan={8}>
                            <EditCompanyForm
                              company={processedCompany}
                              onFinish={() => setEditId(null)}
                            />
                            <Button
                              variant="secondary"
                              size="sm"
                              className="mt-2"
                              onClick={() => setEditId(null)}
                            >
                              Cancel Edit
                            </Button>
                          </td>
                        ) : (
                          <>
                            <td>{company.name}</td>
                            <td>{company.location}</td>
                            <td>${company.salary.toLocaleString()}</td>
                            <td>{company.overview}</td>
                            <td>{company.jobs}</td>
                            <td>{company.contacts}</td>
                            <td>
                              {Array.isArray(company.idealSkill)
                                ? company.idealSkill.join(', ')
                                : company.idealSkill}
                            </td>
                            <td className="d-flex flex-column gap-2">
                              {isAdmin && (
                                <>
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => setEditId(company.id)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(company.id)}
                                  >
                                    Delete
                                  </Button>
                                </>
                              )}
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyAdmin;
