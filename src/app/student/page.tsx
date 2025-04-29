import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import BrowseDataSet from '@/components/BrowseDataSet';

const StudentHomePage = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>Please log in to view your data</h1>
        </div>
      </main>
    );
  }

  const student = await prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      email: true,
      location: true,
      skills: true,
      interests: true,
      portfolio: true,
      image: true,
    },
  });

  const jobListingsRaw = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      idealSkill: true,
      overview: true,
      jobs: true,
      contacts: true,
      salary: true,
      user: {
        select: { name: true, image: true },
      },
    },
  });

  const jobListings = jobListingsRaw.map((company) => ({
    id: company.id.toString(),
    name: company.name,
    location: company.location,
    skills: company.idealSkill,
    companies: [company.name],
    image: company.user.image || '',
    interviews: [],
    interests: [],
  }));

  if (!student) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>No profile found</h1>
          <p>Please complete your profile to view opportunities.</p>
        </div>
      </main>
    );
  }

  if (jobListings.length === 0) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>No job listings available</h1>
          <p>Please check back later.</p>
        </div>
      </main>
    );
  }

  return <BrowseDataSet student={student} jobListings={jobListings} />;
};

export default StudentHomePage;
