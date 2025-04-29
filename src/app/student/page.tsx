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
      location: true,
      skills: true,
    },
  });

  const jobListingsRaw = await prisma.adminList.findMany({
    select: {
      id: true,
      name: true,
      location: true,
      skills: true,
      companies: true,
    },
  });

  const jobListings = jobListingsRaw.map((job) => ({
    ...job,
    id: job.id.toString(),
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

  return (
    <BrowseDataSet
      student={{
        name: student.name,
        location: student.location,
        skills: student.skills,
      }}
      jobListings={jobListings}
    />
  );
};

export default StudentHomePage;
