'use client';

import { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import BrowseDataSet from '@/components/BrowseDataSet';
import authOptions from '@/lib/authOptions';

const StudentHomePage = () => {
  const [student, setStudent] = useState<any>(null);
  const [jobListings, setJobListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);  // To track if data is still loading

  useEffect(() => {
    async function fetchStudentData() {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;

      if (!email) {
        // Handle error or redirection if the user is not logged in
        console.log('User not logged in');
        return;
      }

      // Fetch student data from the API
      const studentResponse = await fetch('/api/get');
      const studentData = await studentResponse.json();
      if (studentData.success) {
        setStudent(studentData.user);
      } else {
        console.log('Error fetching student data:', studentData.error);
      }

      // Fetch job listings
      const jobResponse = await fetch('/api/jobListings');
      const jobData = await jobResponse.json();
      if (jobData.success) {
        setJobListings(jobData.listings);
      } else {
        console.log('Error fetching job listings:', jobData.error);
      }

      setLoading(false);  // Set loading to false once data is fetched
    }

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>Loading data...</h1>
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
