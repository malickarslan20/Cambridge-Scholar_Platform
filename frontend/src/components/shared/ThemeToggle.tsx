import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 flex items-center bg-surface-container-highest rounded-full p-1 cursor-pointer transition-colors duration-300 scholarly-shadow"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-md"
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        animate={{
          x: theme === 'dark' ? 32 : 0,
        }}
      >
        {theme === 'dark' ? (
          <Moon size={14} className="text-on-primary" />
        ) : (
          <Sun size={14} className="text-on-primary" />
        )}
      </motion.div>
    </button>
  );
};
