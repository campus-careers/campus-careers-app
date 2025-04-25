'use client';

import { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

type JobListing = {
  id: string;
  name: string;
  location: string;
  skills: string[];
  companies: string[];
};

type Student = {
  name: string;
  location: string;
  skills: string[];
};

type BrowseDataSetProps = {
  student: Student;
  jobListings: JobListing[];
};

const BrowseDataSet = ({ student, jobListings }: BrowseDataSetProps) => {
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>(jobListings);

  const filterJobs = (filterType: string) => {
    if (!jobListings || jobListings.length === 0) {
      setFilteredJobs([]);
      return;
    }

    let filtered = jobListings;

    switch (filterType) {
      case 'companies':
        filtered = jobListings.filter((job) => job.companies && job.companies.length > 0);
        break;
      case 'skills':
        filtered = jobListings.filter((job) => job.skills.some((skill) => student?.skills.includes(skill)));
        break;
      case 'location':
        filtered = jobListings.filter((job) => job.location === student?.location);
        break;
      default:
        filtered = jobListings; // If no filter, return all jobs
        break;
    }

    setFilteredJobs(filtered);
  };

  if (!jobListings || jobListings.length === 0) {
    return (
      <main>
        <Container className="text-center mt-5">
          <h1>No job listings available</h1>
          <p>Please check back later.</p>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <div className="bg-light py-5">
        <Container fluid className="text-center">
          <h1>Welcome to the Student Home Page</h1>
          <p>Find your perfect match!</p>
        </Container>
      </div>
      <Container className="mt-4">
        <h2 className="text-center mb-4">Student Home Page</h2>
        <Row className="justify-content-center">
          <Col md={4}>
            <Card className="p-3">
              <Row>
                <Col xs={4}>
                  <div
                    style={{
                      width: '100%',
                      paddingBottom: '100%',
                      backgroundColor: '#eee',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                </Col>
                <Col xs={8}>
                  <h5 className="fw-bold">{student?.name || 'Unknown Student'}</h5>
                  <p className="mb-1">
                    Preferred Location:
                    {student?.location || 'Unknown'}
                  </p>
                  <p className="mb-0">
                    Skills:
                    {student?.skills && student.skills.length > 0 ? student.skills.join(', ') : 'None'}
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col md={4} className="d-flex flex-column gap-3">
            <Button variant="light" className="border" onClick={() => filterJobs('companies')}>
              Browse Companies
            </Button>
            <Button variant="light" className="border" onClick={() => filterJobs('skills')}>
              Browse by Skill
            </Button>
            <Button variant="light" className="border" onClick={() => filterJobs('location')}>
              Browse by Location
            </Button>
            <Button variant="light" className="border" onClick={() => setFilteredJobs(jobListings)}>
              Reset Filters
            </Button>
          </Col>
        </Row>

        {/* Filtered Matches Section */}
        <Row className="mt-5">
          <Col md={8} className="mx-auto">
            <h5 className="fw-bold">Filtered Matches</h5>
            {filteredJobs.length > 0 ? (
              <ul className="list-unstyled">
                {filteredJobs.map((job) => (
                  <li key={job.id}>
                    {job.name}
                    {' '}
                    - Location:
                    {job.location}
                    {' '}
                    - Skills:
                    {job.skills.join(', ')}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No matches found.</p>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default BrowseDataSet;
