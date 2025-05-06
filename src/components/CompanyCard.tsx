'use client';

import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Company, Locations } from '@prisma/client';
import { useSession } from 'next-auth/react';
import EditCompanyForm from './EditCompanyForm';

const CompanyCard: React.FC<{ company: Company }> = ({ company }) => {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);

  const isAdmin = session?.user?.email === 'admin@foo.com';

  const handleEditFinish = () => {
    setEditing(false);
  };

  return (
    <Card className="mb-4" style={{ maxWidth: '350px' }}>
      <Card.Body>
        {editing ? (
          <>
            <EditCompanyForm
              company={{
                ...company,
                location: company.location as Locations,
                idealSkill: Array.isArray(company.idealSkill)
                  ? company.idealSkill
                  : (company.idealSkill as never as string).split(',').map((s) => s.trim()),
              }}
              onFinish={handleEditFinish}
            />
            <Button
              className="mt-2"
              variant="secondary"
              size="sm"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Card.Title>{company.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {company.location}
            </Card.Subtitle>

            <Card.Text className="mb-3">{company.overview}</Card.Text>

            <Card.Text>
              <strong>Searching for:</strong><br />
              {company.jobs}
            </Card.Text>

            <Card.Text>
              <strong>If interested, contact:</strong><br />
              {company.contacts}
            </Card.Text>

            {isAdmin && (
              <Button
                variant="primary"
                size="sm"
                className="mt-2"
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default CompanyCard;
