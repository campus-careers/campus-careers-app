'use client';

import { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import EditCompanyForm from './EditCompanyForm';

interface Company {
  id: number;
  name: string;
  location: string;
  salary: number;
  overview: string;
  jobs: string;
  contacts: string;
  idealSkill: string[];
  userId: number;
  category: string;  // New field
}

const CompanyAdmin = () => {
  const { data: session } = useSession();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch('/api/companies');
      const data = await res.json();
      setCompanies(data);
    };
    fetchCompanies();
  }, []);

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h2>Manage Companies</h2>
          {companies.map((company) => (
            <Card key={company.id} className="mb-3">
              <Card.Body>
                <h5>{company.name} - {company.category}</h5>  {/* New field */}
                <p>{company.overview}</p>
                <Button onClick={() => setEditId(company.id)}>Edit</Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyAdmin;
