'use client';

import { Card } from 'react-bootstrap';
import { Company } from '@prisma/client';

const CompanyCard = ({ company }: { company: Company }) => (
  <Card className="h-100 w-75">
    <Card.Header>
      <Card.Title>
        {company.name}
      </Card.Title>
      <Card.Subtitle>
        {company.location}
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {company.overview}
        <p />
        <p>
          <b>Searching for:</b>
          {' '}
          {company.jobs}
        </p>
        <p>
          <b>If interested, contact: </b>
          {company.contacts}
        </p>
      </Card.Text>
    </Card.Body>
  </Card>
);

export default CompanyCard;
