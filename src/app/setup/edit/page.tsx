/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useEffect, useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

const PROGRAMMING_SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Ruby', 'Go', 'Rust', 'Kotlin',
  'Swift', 'HTML', 'CSS', 'SQL', 'R', 'PHP', 'Perl', 'Scala', 'MATLAB', 'Dart', 'Elixir',
  'Shell', 'Assembly', 'Objective-C',
];

const styles = {
  page: { backgroundColor: '#f9fafb', padding: '2rem', display: 'block' } as CSSProperties,
  card: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
    marginBottom: '2rem',
  } as CSSProperties,
  title: { fontSize: '2rem', fontWeight: 700, textAlign: 'center' as const, marginBottom: '1rem' },
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
    skills: [] as string[],
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
        const { user } = await res.json();
        setForm({
          name: user.name || '',
          major: user.major || '',
          skills: user.skills || [],
          interests: (user.interests || []).join(', '),
          location: user.location || '',
          portfolio: user.portfolio || '',
        });
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm({ ...form, skills: selected });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...form,
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
        <h1 style={styles.title}>✏️ Edit Your Profile</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label} htmlFor="name">Full Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} style={styles.input} required />
          </div>

          <div>
            <label style={styles.label} htmlFor="major">Major</label>
            <input id="major" name="major" value={form.major} onChange={handleChange} style={styles.input} required />
          </div>

          <div>
            <label style={styles.label} htmlFor="skills">Skills</label>
            <select id="skills" name="skills" multiple value={form.skills} onChange={handleSkillsChange} style={styles.input}>
              {PROGRAMMING_SKILLS.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Hold Ctrl (Windows) or Cmd (Mac) to select multiple.</p>

            {form.skills.length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                <strong>Selected Skills:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                  {form.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        backgroundColor: '#38A169',
                        color: 'white',
                        padding: '0.3rem 0.7rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.85rem',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label style={styles.label} htmlFor="interests">Interests (comma separated)</label>
            <input id="interests" name="interests" value={form.interests} onChange={handleChange} style={styles.input} required />
          </div>

          <div>
            <label style={styles.label} htmlFor="location">Location</label>
            <select id="location" name="location" value={form.location} onChange={handleChange} style={styles.input} required>
              <option value="">Select a state</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.label} htmlFor="portfolio">Portfolio URL</label>
            <input id="portfolio" name="portfolio" value={form.portfolio} onChange={handleChange} style={styles.input} />
          </div>

          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes →'}
          </button>
        </form>
      </div>
    </div>
  );
}
