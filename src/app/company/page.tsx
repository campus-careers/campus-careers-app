'use client';

import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import CompanyCard from '@/components/CompanyCard';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;

        if (!email) {
          setError('Please log in to view the companies');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/get-companies');
        const data = await response.json();

        if (data.success) {
          setCompanies(data.companies);
        } else {
          setError('Error fetching companies');
        }
      } catch (err) {
        setError('Failed to fetch companies');
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      <h1>Company Profiles</h1>
      {companies.length === 0 ? (
        <p>No companies found. Please check back later.</p>
      ) : (
        <div>
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </main>
  );
};

export default CompaniesPage;
