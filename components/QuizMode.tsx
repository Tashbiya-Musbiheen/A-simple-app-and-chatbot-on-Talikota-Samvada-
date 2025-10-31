import React, { useState, useEffect, useRef } from 'react';
import { Language, Screen } from '../types';
import { quizQuestions } from '../constants/content';
import Button from './common/Button';

// Custom hook to get the previous value of a prop or state
function usePrevious(value: Language) {
  // FIX: Initialize useRef with the current value to satisfy type constraints and hook logic.
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

interface QuizModeProps {
  language: Language;
  setScreen: (screen: Screen) => void;
}

const QuizMode: React.FC<QuizModeProps> = ({ language }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showGreeting, setShowGreeting] = useState(false);
  const prevLanguage = usePrevious(language);

  useEffect(() => {
    if (prevLanguage && prevLanguage !== language) {
      setShowGreeting(true);
    }
  }, [language, prevLanguage]);

  useEffect(() => {
    setShowGreeting(false);
  }, [currentQuestionIndex]);

  const handleAnswer = (selectedIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks

    setSelectedAnswer(selectedIndex);
    if (selectedIndex === quizQuestions[currentQuestionIndex].correctAnswerIndex) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < quizQuestions.length) {
        setCurrentQuestionIndex(nextQuestion);
      } else {
        setShowScore(true);
      }
      setSelectedAnswer(null); // Reset for next question
    }, 1200);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
  };

  if (showScore) {
    return (
      <div className="text-center p-8 rounded-lg bg-[#FFF9E6]/70 shadow-xl backdrop-blur-md animate-fade-in border-2 border-[#D4AF37]/60">
        <h2 className={`font-serif-heading text-2xl font-bold mb-4 text-[#6D001A] ${language === 'kannada' ? 'font-kannada' : ''}`}>
          {language === 'kannada' ? 'ನಿಮ್ಮ ಅಂಕ' : 'Your Score'}
        </h2>
        <p className="font-serif-heading text-5xl font-bold mb-4 text-[#D4AF37]">{score} / {quizQuestions.length}</p>
        <p className={`text-xl font-semibold text-[#6D001A] mb-6 ${language === 'kannada' ? 'font-kannada' : ''}`}>
          {language === 'kannada' ? 'ಶಬಾಸ್! ನೀವು ಇತಿಹಾಸ ಪ್ರಿಯ!' : 'Great! You love history!'}
        </p>
        <Button onClick={restartQuiz}>{language === 'kannada' ? 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ' : 'Try Again'}</Button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const greeting = showGreeting ? (language === 'kannada' ? 'ನಮಸ್ಕಾರ 🙏 ' : 'Greetings 🙏 ') : '';
  const questionText = greeting + currentQuestion.question[language];


  return (
    <div className="p-6 md:p-8 rounded-lg bg-[#FFF9E6]/70 shadow-xl backdrop-blur-md animate-fade-in border-2 border-[#D4AF37]/60">
      <div className="mb-6">
        <p className="text-sm text-[#382d22]/80">
          {language === 'kannada' ? `ಪ್ರಶ್ನೆ ${currentQuestionIndex + 1}/${quizQuestions.length}` : `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`}
        </p>
        <h2 className={`text-xl md:text-2xl font-semibold mt-2 min-h-[60px] text-[#6D001A] ${language === 'kannada' ? 'font-kannada' : ''}`}>
          {questionText}
        </h2>
      </div>
      <div className="flex flex-col space-y-3">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = index === currentQuestion.correctAnswerIndex;
          const isSelected = selectedAnswer === index;
          
          let buttonClass = 'bg-[#C9B58B]/50 hover:bg-[#C9B58B] border-[#C9B58B]';
          if (isSelected) {
            buttonClass = isCorrect ? 'bg-green-700 text-white border-green-700' : 'bg-red-700 text-white border-red-700';
          } else if (selectedAnswer !== null && isCorrect) {
            // Reveal correct answer after selection
            buttonClass = 'bg-green-700/80 text-white border-green-700/80';
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 rounded-lg text-lg text-left transition-all duration-300 transform ${selectedAnswer === null ? 'hover:scale-105' : ''} disabled:cursor-not-allowed border ${buttonClass} ${language === 'kannada' ? 'font-kannada' : ''}`}
            >
              {option[language]}
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default QuizMode;