import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const useQuiz = () => {
  return useQuery({
    queryKey: ['quiz-questions'],
    queryFn: api.fetchQuizQuestions,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
    retry: 2
  });
};