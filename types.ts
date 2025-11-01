export type Language = 'kannada' | 'english';

export type Screen = 'landing' | 'rajyotsava' | 'welcome' | 'story' | 'monuments' | 'chatbot' | 'quiz';

export interface Translatable {
  kannada: string;
  english: string;
}

export interface StoryIntro {
  title: Translatable;
  description: Translatable;
  prompt: Translatable;
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

export interface Message {
  role: 'user' | 'model';
  text: string;
}