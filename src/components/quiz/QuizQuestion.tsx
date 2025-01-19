import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../types';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
}) => {
  const answers = React.useMemo(() => 
    [...question.incorrect_answers, question.correct_answer]
      .sort(() => Math.random() - 0.5),
    [question]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <h3 
        className="text-xl font-medium text-gray-900"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <div className="space-y-2">
        {answers.map((answer, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onAnswerSelect(answer)}
            className={`
              w-full p-4 text-left rounded-lg border transition-all
              ${selectedAnswer === answer
                ? 'bg-indigo-100 border-indigo-500'
                : 'border-gray-300 hover:bg-gray-50'}
            `}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </motion.div>
  );
};