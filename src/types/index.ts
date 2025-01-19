export interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    type: string;
    difficulty: string;
    category: string;
  }
  
  export interface QuizState {
    currentQuestion: number;
    answers: Record<number, string>;
    visitedQuestions: Set<number>;
    email: string;
    isComplete: boolean;
  }

  export interface APIResponse {
    response_code: number;
    results: Question[];
  }