import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import BrowseDataSet from '@/components/BrowseDataSet';

const StudentHomePage = async () => {
  const session = await getServerSession();
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
      companies: true, // Include 'companies' in the query
      image: true,
      interviews: true,
      interests: true,
    },
  }).then((listings) => listings.map((job) => ({
    ...job,
    id: job.id.toString(), // Convert id to string
  })));

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
