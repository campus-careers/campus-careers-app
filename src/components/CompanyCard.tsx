'use client';

import { Card } from 'react-bootstrap';
// import Link from 'next/link';
import { Company } from '@prisma/client';

const CompanyCard = ({ company }: { company: Company }) => (
  <Card className="h-100 w-75">
    <Card.Header>
      <Card.Title>
        {company.name}
      </Card.Title>
      <Card.Subtitle>
        <p>{company.location}</p>
        <p>
          <b>Skills: </b>
          {company.idealSkill.map((skill) => (
            <span>
              {skill}
              {', '}
            </span>
          ))}
        </p>
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        <p>{company.overview}</p>
        <p>
          <b>Salary Range: </b>
          $
          {company.salary / 1000}
          k
          -
          $
          {(company.salary / 1000) + 20}
          k
        </p>
        <p>
          <b>Searching for: </b>
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
