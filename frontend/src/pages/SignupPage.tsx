import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types/auth';

export default function SignupPage() {
  const { signup, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setIsSubmitting(true);
    try {
      const user = await signup({ name, email, password, role });
      navigate(`/dashboard/${user.role}`);
    } catch {
      // error is already set in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-surface-container-low rounded-lg scholarly-shadow">
      <h1 className="text-2xl mb-6">Create Account</h1>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-error-container text-on-error-container text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            className="input-field w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="input-field w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            className="input-field w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div>
          <label htmlFor="role" className="block mb-1 text-sm font-medium">
            I am a...
          </label>
          <select
            id="role"
            className="input-field w-full"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
          </select>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary mt-2 disabled:opacity-60">
          {isSubmitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-6 text-sm text-on-surface-variant">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}