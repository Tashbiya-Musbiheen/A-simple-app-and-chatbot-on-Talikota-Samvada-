import React from 'react';
import { Language } from '../types';

interface LanguageToggleButtonProps {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageToggleButton: React.FC<LanguageToggleButtonProps> = ({ language, toggleLanguage }) => {
  return (
    <button
      onClick={toggleLanguage}
      aria-label={language === 'kannada' ? 'Switch to English' : 'Switch to Kannada'}
      className="w-12 h-12 rounded-full bg-[#FFF9E6]/80 text-[#6D001A] font-semibold text-lg shadow-lg hover:bg-[#FFF9E6] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] border-2 border-[#D4AF37]/80 hover:border-[#D4AF37] transform hover:scale-110 flex items-center justify-center"
    >
      {language === 'kannada' 
        ? <span className="font-sans">EN</span> 
        : <span className="font-kannada text-xl">ಕ</span>
      }
    </button>
  );
};

export default LanguageToggleButton;