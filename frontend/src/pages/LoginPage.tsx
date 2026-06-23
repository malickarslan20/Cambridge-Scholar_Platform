import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { Mail, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth, type UserRole } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    const name = email.split('@')[0] || 'Scholar';
    login(name, role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Continue your scholarly journey."
    >
      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-bold text-on-surface/70 mb-2 uppercase tracking-wider">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={20} />
            <input 
              type="email" 
              placeholder="scholar@cambridge.edu" 
              className="w-full input-field pl-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface/70 mb-2 uppercase tracking-wider">Identify As</label>
          <div className="relative">
            <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={20} />
            <select 
              className="w-full input-field pl-12 appearance-none bg-surface-container-highest"
              value={role || 'student'}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-bold text-on-surface/70 uppercase tracking-wider">Password</label>
            <Link to="#" className="text-sm text-primary hover:underline">Forgot Access Key?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={20} />
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full input-field pl-12"
              required
            />
          </div>
        </div>

        <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4">
          Authenticate <ArrowRight size={20} />
        </button>

        <div className="text-center pt-4">
          <p className="text-on-surface/60">
            New to the Academy?{' '}
            <Link to="/signup" className="text-primary font-bold hover:underline">Request Enrollment</Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
