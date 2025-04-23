// app/add-company/page.tsx
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import AddCompanyForm from '@/components/AddCompanyForm';

const AddCompany = async () => {
  // Protect the page—only authenticated users may access it
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as { user: { email: string; id: string; randomKey: string } } | null
  );

  return (
    <main>
      <AddCompanyForm />
    </main>
  );
};

export default AddCompany;
