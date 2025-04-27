'use client';

/* eslint-disable react/prop-types */

import { Card } from 'react-bootstrap';
import { Company } from '@prisma/client';

const CompanyCard: React.FC<{ company: Company }> = ({ company }) => (
  <Card className="mb-4" style={{ maxWidth: '350px' }}>
    <Card.Body>
      <Card.Title>{company.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        {company.location}
      </Card.Subtitle>

      <Card.Text className="mb-3">
        {company.overview}
      </Card.Text>

      <Card.Text className="mb-2">
        <strong>Searching for:</strong>
        <br />
        {company.jobs}
      </Card.Text>

      <Card.Text>
        <strong>If interested, contact:</strong>
        <br />
        {company.contacts}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default CompanyCard;
