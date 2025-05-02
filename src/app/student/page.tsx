'use client';

import { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import BrowseDataSet from '@/components/BrowseDataSet';
import { prisma } from '@/lib/prisma';

const StudentHomePage = () => {
  const [student, setStudent] = useState<any>(null);
  const [jobListings, setJobListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch student data and job listings on mount
  useEffect(() => {
    async function fetchStudentData() {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;

      if (!email) {
        return;
      }

      const response = await fetch('/api/get');
      const data = await response.json();

      if (data.success) {
        console.log('Student data fetched:', data.user);
        setStudent(data.user);
      }

      // Fetch job listings
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

      const jobListings = jobListingsRaw.map((job: any) => ({
        ...job,
        id: job.id.toString(),
      }));

      setJobListings(jobListings);
      setLoading(false);
    }

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

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
