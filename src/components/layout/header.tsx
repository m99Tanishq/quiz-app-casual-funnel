
// src/components/layout/header.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  email: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ email, onLogout }) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Quiz App</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Logged in as: <span className="font-medium">{email}</span>
            </span>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
