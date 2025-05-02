'use client';

import { getServerSession } from 'next-auth';
import { useState, useEffect } from 'react';
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

  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    async function fetchStudentData() {
      const response = await fetch('/api/get');
      const data = await response.json();
      if (data.success) {
        console.log('Student data fetched:', data.user);
        setStudent(data.user);
      } else {
        console.log('Error fetching student data:', data.error);
      }
    }

    fetchStudentData();
  }, []);

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
        interests: student.interests,
        companies: student.companies,
        interviews: student.interviews,
        image: student.image,
      }}
      jobListings={jobListings}
    />
  );
};

export default StudentHomePage;
