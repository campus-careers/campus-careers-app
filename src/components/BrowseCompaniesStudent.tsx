'use client';

import { Row, Col, Card } from 'react-bootstrap';

type Company = {
  id: number;
  name: string;
  location: string;
  jobs: string;
};

const BrowseCompaniesStudent = ({ companies }: { companies: Company[] }) => (
  <div>
    <h5 className="fw-bold mb-3">Browse Companies</h5>
    {companies.length > 0 ? (
      <Row xs={1} sm={2} md={3} className="g-4">
        {companies.map((company) => (
          <Col key={company.id}>
            <Card className="h-100 company-card">
              <Card.Body>
                <Card.Title className="company-name">{company.name}</Card.Title>
                <Card.Text>
                  <strong>Location:</strong> {company.location}
                </Card.Text>
                <Card.Text>
                  <strong>Jobs:</strong> {company.jobs}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    ) : (
      <p className="text-muted">No companies available to display.</p>
    )}
  </div>
);

export default BrowseCompaniesStudent;
