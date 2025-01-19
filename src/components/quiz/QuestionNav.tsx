import React from 'react';
import { motion } from 'framer-motion';

interface QuestionNavProps {
  totalQuestions: number;
  currentQuestion: number;
  visitedQuestions: Set<number>;
  answers: Record<number, string>;
  onQuestionSelect: (index: number) => void;
}

export const QuestionNav: React.FC<QuestionNavProps> = ({
  totalQuestions,
  currentQuestion,
  visitedQuestions,
  answers,
  onQuestionSelect,
}) => {
  return (
    <div className="grid grid-cols-5 gap-3 p-4">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        const isVisited = visitedQuestions.has(index);
        const isAnswered = answers[index] !== undefined;
        const isCurrent = currentQuestion === index;

        return (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onQuestionSelect(index)}
            className={`
              p-3 rounded-lg text-center transition-all
              ${isCurrent ? 'ring-2 ring-indigo-500' : ''}
              ${isAnswered ? 'bg-green-500 text-white' : 
                isVisited ? 'bg-yellow-100' : 'bg-gray-100'}
            `}
          >
            {index + 1}
          </motion.button>
        );
      })}
    </div>
  );
};
