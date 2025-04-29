'use client';

import { useEffect, useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

const styles = {
  page: { backgroundColor: '#f9fafb', padding: '2rem', display: 'block' } as CSSProperties,
  card: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
    marginBottom: '2rem',
  } as CSSProperties,
  title: { fontSize: '2rem', fontWeight: 700, textAlign: 'center' as const, marginBottom: '1rem' } as CSSProperties,
  section: { marginBottom: '2rem' } as CSSProperties,
  label: { fontWeight: 'bold', marginBottom: '0.5rem' } as CSSProperties,
  form: { display: 'flex', flexDirection: 'column' as const, gap: '1.2rem' } as CSSProperties,
  input: { padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #ccc', fontSize: '1rem' } as CSSProperties,
  button: {
    backgroundColor: '#2F855A',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.85rem 1rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  } as CSSProperties,
};

export default function EditProfilePage() {
  const [form, setForm] = useState({
    name: '',
    major: '',
    skills: '',
    interests: '',
    location: '',
    portfolio: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch('/api/user/get-user');
      if (res.ok) {
        const user = await res.json();
        setForm({
          name: user.name || '',
          major: user.major || '',
          skills: (user.skills || []).join(', '),
          interests: (user.interests || []).join(', '),
          location: user.location || '',
          portfolio: user.portfolio || '',
        });
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...form,
      skills: form.skills.split(',').map((s) => s.trim()),
      interests: form.interests.split(',').map((i) => i.trim()),
      location: form.location.trim(),
    };

    const response = await fetch('/api/user/save-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      swal('✅ Success!', 'Your profile has been updated.', 'success').then(() => {
        router.push('/student');
      });
    } else {
      swal('❌ Error', 'Failed to update profile. Please try again.', 'error');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main>
        <div className="text-center mt-5">
          <h1>Loading your profile...</h1>
        </div>
      </main>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📝 Your Current Profile</h1>
        <div style={styles.section}>
          <p>
            <span style={styles.label}>Name:</span>
            {' '}
            {form.name || 'Not set'}
          </p>
          <p>
            <span style={styles.label}>Major:</span>
            {' '}
            {form.major || 'Not set'}
          </p>
          <p>
            <span style={styles.label}>Skills:</span>
            {' '}
            {form.skills || 'Not set'}
          </p>
          <p>
            <span style={styles.label}>Interests:</span>
            {' '}
            {form.interests || 'Not set'}
          </p>
          <p>
            <span style={styles.label}>Location:</span>
            {' '}
            {form.location || 'Not set'}
          </p>
          <p>
            <span style={styles.label}>Portfolio:</span>
            {' '}
            {form.portfolio || 'Not set'}
          </p>
        </div>
      </div>

      <div style={styles.card}>
        <h1 style={styles.title}>✏️ Edit Your Profile</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            { label: 'Full Name', key: 'name' },
            { label: 'Major', key: 'major' },
            { label: 'Skills (comma separated)', key: 'skills' },
            { label: 'Interests (comma separated)', key: 'interests' },
            { label: 'Location', key: 'location' },
            { label: 'Portfolio URL', key: 'portfolio' },
          ].map(({ label, key }) => (
            <div key={key}>
              <label style={styles.label} htmlFor={key}>{label}</label>
              <input
                id={key}
                name={key}
                value={(form as any)[key]}
                onChange={handleChange}
                placeholder={label}
                style={styles.input}
                required
              />
            </div>
          ))}
          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes →'}
          </button>
        </form>
      </div>
    </div>
  );
}
