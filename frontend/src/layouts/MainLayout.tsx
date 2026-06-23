import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Header } from '../components/shared/Header';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-surface pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-display font-bold text-white hover:text-primary transition-colors"
            >
              Public Landing
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-display font-bold text-white hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="btn-primary text-center py-4 text-xl"
            >
              Apply Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className='mt-16'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
