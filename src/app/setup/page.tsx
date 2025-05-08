/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import swal from 'sweetalert';

const US_STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const PROGRAMMING_SKILLS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C',
  'C++',
  'C#',
  'Ruby',
  'Go',
  'Rust',
  'Kotlin',
  'Swift',
  'HTML',
  'CSS',
  'SQL',
  'R',
  'PHP',
  'Perl',
  'Scala',
  'MATLAB',
  'Dart',
  'Elixir',
  'Shell',
  'Assembly',
  'Objective-C',
];

const skillOptions = PROGRAMMING_SKILLS.map((skill) => ({
  value: skill,
  label: skill,
}));

const styles = {
  page: {
    backgroundColor: '#f9fafb',
    padding: '2rem',
    display: 'block',
  } as CSSProperties,
  card: {
    backgroundColor: '#fff',
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
  },
  subtitle: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
    color: '#555',
    fontSize: '0.95rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  label: {
    fontSize: '1.1rem',
    marginBottom: '0.4rem',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '0.8rem',
    color: '#000',
    marginTop: '0.35rem',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    fontSize: '1rem',
    color: '#333',
    outline: 'none',
  },
  button: {
    backgroundColor: '#2F855A',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.85rem 1rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default function SetupPage() {
  const [form, setForm] = useState({
    name: '',
    major: '',
    skills: [] as string[],
    interests: '',
    location: '',
    portfolio: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSkillSelectChange = (selected: any) => {
    const selectedSkills = selected.map((option: any) => option.value);
    setForm({ ...form, skills: selectedSkills });
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
      swal('✅ Success!', 'Your profile has been saved.', 'success').then(
        () => {
          router.push('/student');
        },
      );
    } else {
      swal(
        '❌ Error',
        'Failed to save your profile. Please try again.',
        'error',
      );
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
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="major" style={styles.label}>
              Major
            </label>
            <input
              type="text"
              id="major"
              name="major"
              value={form.major}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="skills" style={styles.label}>
              Skills
            </label>
            <Select
              isMulti
              name="skills"
              options={skillOptions}
              value={skillOptions.filter((opt) =>
                form.skills.includes(opt.value),
              )}
              onChange={handleSkillSelectChange}
              classNamePrefix="select"
              styles={{ control: (base) => ({ ...base, fontSize: '1rem' }) }}
            />
            <p style={styles.description}>
              Hold Ctrl (Windows) or Cmd (Mac) to select multiple.
            </p>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="interests" style={styles.label}>
              Interests
            </label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={form.interests}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <p style={styles.description}>
              Separate interests with commas (e.g. Web, AI)
            </p>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="location" style={styles.label}>
              Location
            </label>
            <select
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select a state</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="portfolio" style={styles.label}>
              Portfolio URL
            </label>
            <input
              type="text"
              id="portfolio"
              name="portfolio"
              value={form.portfolio}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save and Continue →'}
          </button>
        </form>
      </div>
    </div>
  );
}
