import React, { useState, useEffect } from 'react';
import { Language, Screen } from '../types';
import { storyChapters } from '../constants/content';

interface StoryModeProps {
  language: Language;
  setScreen: (screen: Screen) => void;
}

const StoryMode: React.FC<StoryModeProps> = ({ language, setScreen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // This effect handles the transition between chapters
    const timer = setTimeout(() => {
      setIsFading(true); // Start fading out
      setTimeout(() => {
        if (currentIndex < storyChapters.length - 1) {
          setCurrentIndex(prevIndex => prevIndex + 1);
          setIsFading(false); // Fade back in with new content
        } else {
          // End of story, navigate back to welcome screen
          setScreen('welcome');
        }
      }, 500); // This should match the fade-out duration
    }, 4000); // How long each chapter is visible

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [currentIndex, setScreen]);

  const currentChapter = storyChapters[currentIndex];
  if (!currentChapter) return null; // Should not happen, but a good safeguard

  const title = currentChapter.title[language];
  const content = currentChapter.content[language];

  return (
    <div className={`p-6 md:p-8 rounded-lg bg-[#FFF9E6]/70 shadow-xl backdrop-blur-md text-center border-2 border-[#D4AF37]/60 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <h3 className={`text-lg font-semibold text-[#382d22]/80 mb-2 ${language === 'kannada' ? 'font-kannada' : ''}`}>
        {language === 'kannada' ? `ಅಧ್ಯಾಯ ${currentIndex + 1}` : `Chapter ${currentIndex + 1}`}
      </h3>
      <h2 className={`font-serif-heading text-3xl font-bold mb-6 text-[#6D001A] ${language === 'kannada' ? 'font-kannada' : ''}`}>
        {title}
      </h2>
      <p className={`text-xl text-[#382d22] max-w-2xl mx-auto min-h-[100px] ${language === 'kannada' ? 'font-kannada' : ''}`}>
        {content}
      </p>
    </div>
  );
};

export default StoryMode;