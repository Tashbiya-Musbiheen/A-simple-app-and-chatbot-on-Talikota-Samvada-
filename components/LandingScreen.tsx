import React from 'react';
import { Screen } from '../types';
import Button from './common/Button';

interface LandingScreenProps {
  setScreen: (screen: Screen) => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ setScreen }) => {
  return (
    <div 
      className="text-center flex flex-col items-center justify-center h-screen -m-4 animate-fade-in"
    >
      {/* Section 1: Title and Tagline */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="p-6">
          <h1 className="font-serif-heading text-4xl md:text-6xl font-bold text-[#D4AF37] mb-2" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.5)'}}>
            TALIKOTA SAMVĀDA
          </h1>
          <h2 className="text-2xl md:text-4xl font-kannada font-semibold text-[#D4AF37] mb-8" style={{textShadow: '1px 1px 6px rgba(0,0,0,0.5)'}}>
            ತಾಳಿಕೋಟೆ ಸಂವಾದ 🛕
          </h2>

          <div className="text-lg md:text-xl text-[#EAE0D5]">
            <p className="font-kannada font-medium"> ವಿಜಯನಗರ ವೈಭವ, ಹಂಪಿಯ ಹೃದಯದ ಕಥೆ</p>
            <p> Glory of Vijayanagara, story from Hampi’s heart</p>
          </div>
        </div>
      </div>
      
      {/* Section 2: Begin Button */}
      <div className="flex-shrink-0 pb-20 w-full max-w-xs">
        <Button onClick={() => setScreen('rajyotsava')}>
          <div>
            <div className="font-kannada text-lg">ನಮ್ಮ ಪಯಣವನ್ನು ಪ್ರಾರಂಭಿಸೋಣ</div>
            <div className="text-sm font-light tracking-wider uppercase">Let's Begin Our Journey</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default LandingScreen;