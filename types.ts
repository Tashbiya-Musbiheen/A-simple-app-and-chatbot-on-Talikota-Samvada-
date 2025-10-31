export type Language = 'kannada' | 'english';

export type Screen = 'landing' | 'welcome' | 'story' | 'monuments' | 'chatbot' | 'quiz';

export interface Translatable {
  kannada: string;
  english: string;
}

export interface StoryChapter {
  title: Translatable;
  content: Translatable;
}

export interface Monument {
  name: Translatable;
  heritageLine: Translatable;
  description: Translatable;
  icon: string;
}

export interface QuizQuestion {
    question: Translatable;
    options: Translatable[];
    correctAnswerIndex: number;
}