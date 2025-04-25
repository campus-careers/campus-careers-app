import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import CompanyAdmin from '@/components/CompanyAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { revalidatePath } from 'next/cache';
import { Company, Skill, Location as LocationModel } from '@prisma/client'; // ✅ Fixed type imports

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const companies: Company[] = await prisma.company.findMany();
  const skills: Skill[] = await prisma.skill.findMany();
  const locations: LocationModel[] = await prisma.location.findMany(); // ✅ Renamed type

  return (
    <main>
      <Container id="admin" fluid className="py-4">
        <Row>
          <Col>
            <h1>Admin Dashboard</h1>

            <Row xs={1} md={2} lg={3} className="g-4">
              <h2>Companies</h2>
              {companies.map((company) => (
                <Col key={company.name}>
                  <CompanyAdmin company={company} />
                </Col>
              ))}
            </Row>

            <Row xs={1} md={2} lg={3} className="g-4">
              <h2>Students</h2>
              {/* You can render students here if desired */}
            </Row>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6}>
            <h2>Manage Skills</h2>
            <form
              action={async (formData) => {
                'use server';

                const name = formData.get('skill') as string;
                if (name) {
                  await prisma.skill.create({ data: { name } });
                  revalidatePath('/admin');
                }
              }}
              className="mb-3 d-flex gap-2"
            >
              <input
                type="text"
                name="skill"
                placeholder="New skill"
                className="form-control"
                required
              />
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
            <ul className="list-group">
              {skills.map((skill) => (
                <li
                  key={skill.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {skill.name}
                  <form
                    action={async () => {
                      'use server';

                      await prisma.skill.delete({ where: { id: skill.id } });
                      revalidatePath('/admin');
                    }}
                  >
                    <button type="submit" className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </Col>

          <Col md={6}>
            <h2>Manage Locations</h2>
            <form
              action={async (formData) => {
                'use server';

                const name = formData.get('location') as string;
                if (name) {
                  await prisma.location.create({ data: { name } });
                  revalidatePath('/admin');
                }
              }}
              className="mb-3 d-flex gap-2"
            >
              <input
                type="text"
                name="location"
                placeholder="New location"
                className="form-control"
                required
              />
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
            <ul className="list-group">
              {locations.map((loc) => (
                <li
                  key={loc.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {loc.name}
                  <form
                    action={async () => {
                      'use server';

                      await prisma.location.delete({ where: { id: loc.id } });
                      revalidatePath('/admin');
                    }}
                  >
                    <button type="submit" className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
