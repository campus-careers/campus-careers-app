'use client';

import { useRouter } from 'next/navigation';
import { Company } from '@prisma/client';
import EditCompanyForm from '@/components/EditCompanyForm';

export default function EditCompanyPage({ params }: { params: { id: string | string[] } }) {
  const router = useRouter();

  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);

  // You'll need to pass the company data as a prop from the parent layout or use a client-side fetch.
  // For now, this assumes company data is fetched client-side (or you can convert this page to server 
  // component if needed).

  // Placeholder example company object
  const company: Company = {
    id,
    name: 'Placeholder Company',
    salary: 0,
    overview: '',
    jobs: '',
    contacts: '',
    location: 'Hawaii',
    idealSkill: [],
    userId: 1,
  };

  return (
    <main>
      <EditCompanyForm
        company={company}
        onFinish={() => {
          router.push('/list-companies');
        }}
      />
    </main>
  );
}
