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

  if (!student || jobListings.length === 0) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>No data available</h1>
          <p>Please check back later.</p>
        </div>
      </main>
    );
  }

  return <BrowseDataSet student={student} jobListings={jobListings} />;
};

export default StudentHomePage;
