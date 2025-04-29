'use client';

import { useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert'; // ✅ Import SweetAlert

const styles = {
  page: {
    backgroundColor: '#f9fafb',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    display: 'block',
  } as CSSProperties,
  card: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '1rem',
    boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  } as CSSProperties,
  title: {
    fontSize: '2.65rem',
    fontWeight: 700,
    textAlign: 'center' as const,
    marginBottom: '0.5rem',
  } as CSSProperties,
  subtitle: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
    color: '#555',
    fontSize: '0.95rem',
  } as CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  } as CSSProperties,
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
  } as CSSProperties,
  label: {
    fontSize: '1.1rem',
    marginBottom: '0.4rem',
    fontWeight: 'bold',
  } as CSSProperties,
  description: {
    fontSize: '0.8rem',
    color: '#000000',
    marginTop: '0.35rem',
  } as CSSProperties,
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    fontSize: '1rem',
    color: '#333',
    outline: 'none',
    transition: 'border 0.2s ease, box-shadow 0.2s ease',
  } as CSSProperties,
  button: {
    backgroundColor: '#2F855A',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.85rem 1rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  } as CSSProperties,
};

export default function SetupPage() {
  const [form, setForm] = useState({
    name: '',
    major: '',
    skills: '',
    interests: '',
    location: '',
    portfolio: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...form,
      skills: form.skills.split(',').map((skill) => skill.trim()),
      interests: form.interests.split(',').map((interest) => interest.trim()),
      location: form.location.trim(),
    };

    const response = await fetch('/api/user/save-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      swal('✅ Success!', 'Your profile has been saved.', 'success').then(() => {
        router.push('/student');
      });
    } else {
      swal('❌ Error', 'Failed to save your profile. Please try again.', 'error');
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 Complete Your Profile</h1>
        <p style={styles.subtitle}>
          Let us know more about you to match you with the best opportunities.
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            { label: 'Full Name', key: 'name', description: 'Your legal first and last name.' },
            { label: 'Major', key: 'major', description: 'Your field of study or concentration.' },
            {
              label: 'Skills',
              key: 'skills',
              description: 'Separate each skill with commas (e.g. Python, React, SQL).',
            },
            { label: 'Interests', key: 'interests', description: 'What roles or industries you are interested in.' },
            { label: 'Location', key: 'location', description: 'Where are you based or looking for opportunities?' },
            {
              label: 'Portfolio URL',
              key: 'portfolio',
              description: 'Link to your personal website, GitHub, or resume.',
            },
          ].map(({ label, key, description }) => (
            <div key={key} style={styles.inputGroup}>
              <label htmlFor={key} style={styles.label}>{label}</label>
              <input
                id={key}
                name={key}
                value={(form as any)[key]}
                onChange={handleChange}
                placeholder={label}
                style={styles.input}
                required
              />
              <p style={styles.description}>{description}</p>
            </div>
          ))}
          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save and Continue →'}
          </button>
        </form>
      </div>
    </div>
  );
}
