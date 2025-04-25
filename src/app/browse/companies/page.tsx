import { prisma } from '@/lib/prisma';
import BrowseCompaniesStudent from '@/components/BrowseCompaniesStudent';

export async function getServerSideProps() {
  try {
    // Mock student data (replace with actual database query if needed)
    const student = {
      skills: ['JavaScript', 'Python', 'React'],
      location: 'Remote',
    };

    // Fetch all job listings from the adminList table
    const adminList = await prisma.adminList.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        companies: true,
        location: true,
        skills: true, // Ensure skills are fetched for matching
      },
    });

    // Match jobs based on skills and location
    const matchedJobs = adminList
      .filter((job) => {
        // Check if the job's location matches the student's location
        const locationMatch = job.location === student.location;

        // Check if the job's skills overlap with the student's skills
        const skillMatch = job.skills.some((skill) =>
          student.skills.includes(skill));
        return locationMatch && skillMatch;
      })
      .map((job) => {
        // Calculate the number of matching skills for sorting
        const matchingSkills = job.skills.filter((skill) =>
          student.skills.includes(skill)).length;
        return { ...job, matchingSkills };
      })
      .sort((a, b) => b.matchingSkills - a.matchingSkills) // Sort by matching skills
      .slice(0, 3); // Limit to top 3 jobs

    return {
      props: {
        companies: matchedJobs,
      },
    };
  } catch (error) {
    console.error('Error fetching companies:', error);
    return {
      props: {
        companies: [],
      },
    };
  }
}

const BrowseCompaniesPage = ({ companies }) => (
  <div>
    <BrowseCompaniesStudent companies={companies} />
  </div>
);

export default BrowseCompaniesPage;
