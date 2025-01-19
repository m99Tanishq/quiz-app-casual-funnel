import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Container } from './layout/container';
import { Header } from './layout/header';
import { Button } from './ui/button';
import { Question } from '../types';

interface ReportPageProps {
  questions: Question[];
  answers: Record<number, string>;
  email: string;
  onRetake?: () => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({
  questions,
  answers,
  email,
  onRetake
}) => {
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  const score = calculateScore();

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header email={email} />
      <Container className="py-8">
        <Card className="mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Quiz Results</h2>
            <div className="mt-4">
              <p className="text-4xl font-bold mb-2">
                <span className={getScoreColor(score.percentage)}>
                  {score.correct}/{score.total}
                </span>
              </p>
              <p className="text-lg text-gray-600">
                Final Score: {score.percentage}%
              </p>
            </div>
            {onRetake && (
              <Button
                variant="primary"
                className="mt-4"
                onClick={onRetake}
              >
                Retake Quiz
              </Button>
            )}
          </div>
        </Card>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {questions.map((question, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 
                className="text-lg font-medium text-gray-900 mb-4"
                dangerouslySetInnerHTML={{ __html: `Question ${index + 1}: ${question.question}` }}
              />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-medium text-gray-700 mb-2">Your Answer:</p>
                  <div
                    className={`p-3 rounded-lg ${
                      answers[index] === question.correct_answer
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                    dangerouslySetInnerHTML={{ __html: answers[index] || 'Not answered' }}
                  />
                </div>
                
                <div>
                  <p className="font-medium text-gray-700 mb-2">Correct Answer:</p>
                  <div
                    className="p-3 rounded-lg bg-green-100 text-green-800"
                    dangerouslySetInnerHTML={{ __html: question.correct_answer }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
};
