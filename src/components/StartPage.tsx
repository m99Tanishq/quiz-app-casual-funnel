import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface StartPageProps {
  onStart: (email: string) => void;
  isLoading?: boolean;
}

export const StartPage: React.FC<StartPageProps> = ({ onStart, isLoading }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    onStart(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to the Quiz</h1>
            <p className="mt-2 text-gray-600">Enter your email to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              placeholder="Enter your email"
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Start Quiz
            </Button>
          </form>
        </motion.div>
      </Card>
    </div>
  );
};