'use client';

import { Card } from 'react-bootstrap';
import Link from 'next/link';
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
        {company.jobs}
        {company.contacts}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default CompanyCard;
