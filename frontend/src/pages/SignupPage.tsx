import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { Mail, Lock, User, ArrowRight, GraduationCap } from 'lucide-react';

const SignupPage: React.FC = () => {
  return (
    <AuthLayout 
      title="Request Enrollment" 
      subtitle="Join our next cohort of global scholars."
    >
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-on-surface/70 mb-2 uppercase tracking-wider text-[10px]">First Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={16} />
              <input type="text" placeholder="John" className="w-full input-field pl-10 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-on-surface/70 mb-2 uppercase tracking-wider text-[10px]">Last Name</label>
            <input type="text" placeholder="Doe" className="w-full input-field py-2 text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface/70 mb-2 uppercase tracking-wider text-[10px]">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
            <input type="email" placeholder="scholar@cambridge.edu" className="w-full input-field pl-11 py-2 text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface/70 mb-2 uppercase tracking-wider text-[10px]">Select Role</label>
          <div className="relative">
            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
            <select className="w-full input-field pl-11 py-2 text-sm appearance-none bg-surface-container-highest">
              <option>Student</option>
              <option>Teacher</option>
              <option>Parent</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface/70 mb-2 uppercase tracking-wider text-[10px]">Create Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30" size={18} />
            <input type="password" placeholder="••••••••" className="w-full input-field pl-11 py-2 text-sm" />
          </div>
        </div>

        <button className="w-full btn-primary flex items-center justify-center gap-2 py-3 mt-4">
          Submit Application <ArrowRight size={18} />
        </button>

        <div className="text-center pt-2">
          <p className="text-on-surface/60 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
