import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer, toast } from 'react-toastify';
import { useQuiz } from './hooks/useQuiz';
import { StartPage } from './components/StartPage';
import { QuizQuestion } from './components/quiz/QuizQuestion';
import { QuestionNav } from './components/quiz/QuestionNav';
import { Timer } from './components/quiz/Timer';
import { ReportPage } from './components/ReportPage';
import { Container } from './components/layout/container';
import { Header } from './components/layout/header';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { QuizState } from './types';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: Infinity,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <QuizApp />
    <ReactQueryDevtools initialIsOpen={false} />
    <ToastContainer />
  </QueryClientProvider>
);

const QuizApp: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    visitedQuestions: new Set([0]),
    email: '',
    isComplete: false,
  });

  const { data: questions, isLoading, isError } = useQuiz();

  const handleStart = (email: string) => {
    setState(prev => ({ ...prev, email }));
  };

  const handleAnswerSelect = (answer: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [prev.currentQuestion]: answer },
    }));
    toast.success('Answer saved!');
  };

  const handleQuestionSelect = (index: number) => {
    setState(prev => ({
      ...prev,
      currentQuestion: index,
      visitedQuestions: new Set([...prev.visitedQuestions, index]),
    }));
  };

  const handleComplete = () => {
    if (Object.keys(state.answers).length < (questions?.length || 0)) {
      const confirm = window.confirm(
        'You haven\'t answered all questions. Are you sure you want to submit?'
      );
      if (!confirm) return;
    }
    setState(prev => ({ ...prev, isComplete: true }));
  };

  const handleRetake = () => {
    queryClient.invalidateQueries({ queryKey: ['quiz-questions'] });
    setState({
      currentQuestion: 0,
      answers: {},
      visitedQuestions: new Set([0]),
      email: state.email,
      isComplete: false,
    });
  };

  const handleLogout = () => {
    setState({
      currentQuestion: 0,
      answers: {},
      visitedQuestions: new Set([0]),
      email: '',
      isComplete: false,
    });
    queryClient.clear();
  };

  if (!state.email) {
    return <StartPage onStart={handleStart} isLoading={isLoading} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Container className="min-h-screen flex items-center justify-center">
        <Card>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Error</h2>
            <p className="mt-2 text-gray-600">Failed to load quiz questions.</p>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  if (state.isComplete && questions) {
    return (
      <ReportPage
        questions={questions}
        answers={state.answers}
        email={state.email}
        onRetake={handleRetake}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header email={state.email} onLogout={handleLogout} />
      <Container className="py-8">
        <Card>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900">
              Question {state.currentQuestion + 1} of {questions?.length}
            </h2>
            <Timer
              isActive={!state.isComplete}
              onTimeUp={handleComplete}
            />
          </div>

          {questions && (
            <>
              <QuestionNav
                totalQuestions={questions.length}
                currentQuestion={state.currentQuestion}
                visitedQuestions={state.visitedQuestions}
                answers={state.answers}
                onQuestionSelect={handleQuestionSelect}
              />

              <div className="mt-8">
                <QuizQuestion
                  question={questions[state.currentQuestion]}
                  selectedAnswer={state.answers[state.currentQuestion]}
                  onAnswerSelect={handleAnswerSelect}
                />

                <div className="mt-8 flex justify-between">
                  <Button
                    variant="secondary"
                    onClick={() => handleQuestionSelect(state.currentQuestion - 1)}
                    disabled={state.currentQuestion === 0}
                  >
                    Previous
                  </Button>

                  {state.currentQuestion === questions.length - 1 ? (
                    <Button
                      variant="primary"
                      onClick={handleComplete}
                    >
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleQuestionSelect(state.currentQuestion + 1)}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default App;