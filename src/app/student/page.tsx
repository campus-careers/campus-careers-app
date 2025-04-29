import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
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

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      location: true,
      skills: true,
      interests: true,
      portfolio: true,
      image: true,
      companies: {
        select: {
          name: true,
        },
      },
      interviews: {
        select: {
          company: true,
        },
      },
    },
  });

  const jobListingsRaw = await prisma.adminList.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      skills: true,
      companies: true,
      image: true,
      interviews: true,
      interests: true,
    },
  });

  const jobListings = jobListingsRaw.map((job) => ({
    ...job,
    id: job.id.toString(),
  }));

  if (!user) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>No profile found</h1>
          <p>Please complete your profile to view opportunities.</p>
        </div>
      </main>
    );
  }

  const student = {
    id: user.id,
    name: user.name,
    email: user.email,
    location: user.location,
    skills: user.skills,
    interests: user.interests,
    portfolio: user.portfolio || '',
    image: user.image,
    companies: user.companies.map((c) => c.name),
    interviews: user.interviews.map((i) => i.company),
  };

  return <BrowseDataSet student={student} jobListings={jobListings} />;
};

export default StudentHomePage;
