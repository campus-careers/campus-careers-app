'use client';

import { Row, Col, Card } from 'react-bootstrap';

type AdminList = {
  id: string;
  name: string;
  image: string;
  companies: string[];
  location: string;
};

const BrowseCompaniesStudent = ({ companies }: { companies: AdminList[] }) => (
  <div>
    <h5 className="fw-bold mb-3">Browse Companies</h5>
    {companies.length > 0 ? (
      <Row xs={1} sm={2} md={3} className="g-4">
        {companies.map((company) => (
          <Col key={company.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={company.image}
                alt={company.name}
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{company.name}</Card.Title>
                <Card.Text>
                  <strong>Location:</strong>
                  {company.location}
                </Card.Text>
                <Card.Text>
                  <strong>Associated Companies:</strong>
                  {' '}
                  {company.companies.join(', ')}
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
