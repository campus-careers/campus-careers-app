'use client';

import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import BrowseDataSet from '@/components/BrowseDataSet';

const StudentHomePage = () => {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          setStudent(data.user);
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
    />
  );
};

export default StudentHomePage;
