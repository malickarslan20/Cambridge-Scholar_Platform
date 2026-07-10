import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, X } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Brand Section */}
      <div className="hidden md:flex md:w-1/2 bg-primary relative items-center justify-center p-12 overflow-hidden">
        <div className="relative z-10 text-white max-w-md">
          <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center transition-colors bg-primary">
                    <img src="/images/logo.jpeg" alt="Cambridge Academy Logo" className="w-full h-full object-cover" />
            
                </div>
                <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-display font-bold mb-6 leading-tight"
          >
            The Scholar's Gateway
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/80 leading-relaxed mb-8"
          >
            "Knowledge is a curated treasure, and critical inquiry is its key." Join a community of excellence.
          </motion.p>
          
          <div className="flex items-center gap-4 text-white/60">
            <ShieldCheck size={20} />
            <span className="text-sm font-medium">Verified Scholarly Access</span>
          </div>
        </div>

        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        {/* Back to Home Button */}
        <Link 
          to="/" 
          className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all group"
          title="Back to Home"
        >
          <X className="text-on-surface/40 group-hover:text-primary transition-colors" size={24} />
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <Link to="/" className="md:hidden inline-flex w-12 h-12 bg-primary rounded-xl items-center justify-center text-white font-bold text-xl mb-6">C</Link>
            <h1 className="text-3xl font-display font-bold text-on-surface mb-2">{title}</h1>
            <p className="text-on-surface/60">{subtitle}</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl scholarly-shadow ghost-border"
          >
            {children}
          </motion.div>

          <p className="mt-8 text-center text-on-surface/40 text-sm">
            © 2024 Cambridge Scholars Academy. Secure Environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
