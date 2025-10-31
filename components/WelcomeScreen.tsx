import React from 'react';
import { Screen } from '../types';
import Button from './common/Button';

interface WelcomeScreenProps {
  setScreen: (screen: Screen) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setScreen }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center p-6 rounded-lg bg-[#FFF9E6]/70 shadow-lg backdrop-blur-sm animate-fade-in border-2 border-[#D4AF37]/60">
      <h1 className="font-serif-heading text-3xl font-bold text-[#6D001A] mb-6">
        Explore the Legacy
      </h1>
      
      <div className="text-md text-[#382d22]/90 mb-8 max-w-lg">
        <p className="font-kannada mb-2">
           ನಮಸ್ಕಾರ! ‘ತಾಳಿಕೋಟೆ ಸಂವಾದ’ಕ್ಕೆ ಸ್ವಾಗತ. ಇಲ್ಲಿ ನಾವು ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ, ಹಂಪಿಯ ಸೌಂದರ್ಯ ಮತ್ತು ತಾಳಿಕೋಟೆ ಯುದ್ಧದ ಪಯಣವನ್ನು ಅನ್ವೇಷಿಸುತ್ತೇವೆ.
        </p>
        <p>
           Namaskara! Welcome to Talikota Samvāda. Here we explore the Vijayanagara Empire, beauty of Hampi, and the journey of the Battle of Talikota.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <Button onClick={() => setScreen('story')}>▶ Start Story Journey</Button>
        <Button onClick={() => setScreen('monuments')}>🏛 Explore Hampi Monuments</Button>
        <Button onClick={() => setScreen('chatbot')}>🤖 Ask Historical Questions</Button>
        <Button onClick={() => setScreen('quiz')}>🎯 Quiz Mode</Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;