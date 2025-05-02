'use client';

import { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import BrowseDataSet from '@/components/BrowseDataSet';

const StudentHomePage = () => {
  const [student, setStudent] = useState<any>(null); // Initialize student state
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error handling state

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        if (!email) {
          setError('Please log in to view your data');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/get');
        const data = await response.json();

        if (data.success) {
          setStudent(data.user); // Set student data
        } else {
          setError('Error fetching student data');
        }
      } catch (err) {
        setError('Failed to fetch student data');
      } finally {
        setLoading(false);
      }
    }

    fetchStudentData();
  }, []); // Run only on initial render

  // Handle loading and error states
  if (loading) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>{error}</h1>
        </div>
      </main>
    );
  }

  // Fetch job listings from Prisma
  const [jobListings, setJobListings] = useState<any[]>([]);

  useEffect(() => {
    async function fetchJobListings() {
      try {
        const response = await fetch('/api/jobListings');
        const jobData = await response.json();

        if (jobData.success) {
          setJobListings(jobData.jobListings);
        } else {
          console.error('Failed to fetch job listings');
        }
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    }

    fetchJobListings();
  }, []);

  // Ensure that the student data exists before rendering
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
