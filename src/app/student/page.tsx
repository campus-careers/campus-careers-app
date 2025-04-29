import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import BrowseDataSet from '@/components/BrowseDataSet';

type MinimalStudent = {
  name: string;
  email: string;
  location: string;
  skills: string[];
  interests: string[];
  portfolio: string;
  image: string;
};

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

  const studentRaw = await prisma.user.findUnique({
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

  if (!studentRaw) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>No profile found</h1>
          <p>Please complete your profile to view opportunities.</p>
        </div>
      </main>
    );
  }

  const student: MinimalStudent = {
    name: studentRaw.name ?? '',
    email: studentRaw.email ?? '',
    location: studentRaw.location ?? '',
    skills: studentRaw.skills ?? [],
    interests: studentRaw.interests ?? [],
    portfolio: studentRaw.portfolio ?? '',
    image: studentRaw.image ?? '',
  };

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

  return <BrowseDataSet student={student} jobListings={jobListings} />;
};

export default StudentHomePage;
