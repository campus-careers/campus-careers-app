// import { useState } from 'react';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
// import { getSession } from 'next-auth/react';
// import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import BrowseDataSet from '@/components/BrowseDataSet';

const StudentHomePage = async () => {
  // Fetch job listings from the database
  const session = await getServerSession();
  const email = session?.user?.email;

  const student = await prisma.user.findFirst({
    where: { email: email || undefined },
    select: {
      name: true,
      email: true,
      location: true,
      skills: true,
    },
  });

  // Fetch all job listings from the adminList table
  const jobListings = await prisma.adminList.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      skills: true,
      companies: true,
      image: true,
    },
  });

  return <BrowseDataSet student={student} jobListings={jobListings} />;

  /*
    const getMatchedJobs = () => {
      console.log('Student:', student);
      console.log('Job Listings:', jobListings);
      // Ensure `student` and `jobListings` are defined
      if (!student || !student.skills || !jobListings || jobListings.length === 0) {
        return [];
      }

      return jobListings
        .filter((job) => {
          // Check if the job's location matches the student's location
          const locationMatch = job.location === student.location;
          // Check if the job's skills overlap with the student's skills
          const skillMatch = job.skills.some((skill) => student.skills.includes(skill));
          return locationMatch && skillMatch;
        })
        .map((job) => {
          // Calculate the number of matching skills for sorting
          const matchingSkills = job.skills.filter((skill) => student.skills.includes(skill)).length;
          return { ...job, matchingSkills };
        })
        .sort((a, b) => b.matchingSkills - a.matchingSkills) // Sort by matching skills
        .slice(0, 3); // Limit to top 3 jobs
    };

    const matchedJobs = getMatchedJobs();
    const [filteredJobs, setFilteredJobs] = useState(jobListings);

    function filterJobs(filterType: string): void {
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
          filtered = jobListings.filter((job) =>
            job.skills.some((skill) => student?.skills.includes(skill)));
          break;
        case 'location':
          filtered = jobListings.filter((job) => job.location === student?.location);
          break;
        default:
          break;
      }

      setFilteredJobs(filtered);
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
                    <div style={{
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
              <Button variant="light"
              className="border"
              onClick={() => filterJobs('companies')}
              >
              Browse Companies
              </Button>
              <Button variant="light"
              className="border"
              onClick={() => filterJobs('companies')}
              >
              Browse by Skill
              </Button>
              <Button
                variant="light"
                className="border"
                onClick={() => filterJobs('companies')}
              >
                Browse by Location
              </Button>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={8} className="mx-auto">
              <h5 className="fw-bold">Filtered Matches</h5>
              {filteredJobs.length > 0 ? (
                <ul className="list-unstyled">
                  {filteredJobs.map((job) => (
                    <li key={job.id}>
                      {job.name}
                      - Location:
                      {job.location}
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

          <Row className="mt-5">
            <Col md={8} className="mx-auto">
              <h5 className="fw-bold">Top Matches</h5>
              {matchedJobs.length > 0 ? (
                <ul className="list-unstyled">
                  {matchedJobs.map((job) => (
                    <li key={job.id}>
                      {job.name}
                      - Matching Skills:
                      {job.matchingSkills}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No matches found.</p>
              )}
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={8} className="mx-auto">
              <h5 className="fw-bold">Recent Matches</h5>
              <ul className="list-unstyled">
                <li>Company A</li>
                <li>Company B</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </main>
    );
  */
};

export default StudentHomePage;
