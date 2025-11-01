import React, { useState, useEffect, useRef } from 'react';
import { Language, Screen, Monument } from '../types';
import { monuments } from '../constants/content';
import Button from './common/Button';
import { generateMonumentImage } from '../services/geminiService';

// Custom hook to get the previous value of a prop or state
function usePrevious(value: Language) {
  // FIX: Initialize useRef with the current value to satisfy type constraints and hook logic.
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

interface MonumentsModeProps {
  language: Language;
  setScreen: (screen: Screen) => void;
}

const MonumentsMode: React.FC<MonumentsModeProps> = ({ language }) => {
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const prevLanguage = usePrevious(language);

  useEffect(() => {
    if (prevLanguage && prevLanguage !== language) {
      setShowGreeting(true);
    }
  }, [language, prevLanguage]);


  const handleSelectMonument = (monument: Monument) => {
    setSelectedMonument(monument);
    setGeneratedImage(null);
    setIsGenerating(false);
    setError(null);
    setShowGreeting(false);
  };

  const handleGoBack = () => {
    setSelectedMonument(null);
    setGeneratedImage(null);
    setIsGenerating(false);
    setError(null);
    setShowGreeting(false);
    setShowAll(false);
  };

  const handleGenerateImage = async () => {
    if (!selectedMonument || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);
    setError(null);

    const prompt = `A beautiful, detailed artistic representation of the ${selectedMonument.name.english}, which is the "${selectedMonument.heritageLine.english}". Focus on historical accuracy, grandeur, and the architectural style of the Vijayanagara Empire.`;
    
    const imageUrl = await generateMonumentImage(prompt);
    
    if (imageUrl) {
        setGeneratedImage(imageUrl);
    } else {
        setError(language === 'kannada' ? 'ಚಿತ್ರವನ್ನು ರಚಿಸಲು ವಿಫಲವಾಗಿದೆ.' : 'Failed to generate image.');
    }
    setIsGenerating(false);
  };

  if (selectedMonument) {
    const greeting = showGreeting ? (language === 'kannada' ? 'ನಮಸ್ಕಾರ 🙏 ' : 'Greetings 🙏 ') : '';
    const descriptionText = greeting + selectedMonument.description[language];

    return (
      <div className="p-6 md:p-8 rounded-lg bg-[#FFF9E6]/70 shadow-xl backdrop-blur-md text-center animate-fade-in border-2 border-[#D4AF37]/60">
        <h2 className={`font-serif-heading text-3xl font-bold mb-4 text-[#6D001A] ${language === 'kannada' ? 'font-kannada' : ''}`}>
          {selectedMonument.name[language]}
        </h2>
        <p className={`text-lg mb-4 text-[#382d22] ${language === 'kannada' ? 'font-kannada' : ''}`}>
          {descriptionText}
        </p>
        <p className={`text-md italic text-[#6D001A]/90 font-semibold ${language === 'kannada' ? 'font-kannada' : ''}`}>
          "{selectedMonument.heritageLine[language]}"
        </p>
        
        <div className="mt-6 space-y-4">
          {isGenerating && (
            <div className="flex flex-col items-center justify-center p-4 bg-[#C9B58B]/30 rounded-lg">
              <div className="w-8 h-8 border-4 border-[#D4AF37]/50 border-t-[#D4AF37] rounded-full animate-spin"></div>
              <p className={`mt-2 text-[#382d22] ${language === 'kannada' ? 'font-kannada' : ''}`}>
                {language === 'kannada' ? 'ಚಿತ್ರವನ್ನು ರಚಿಸಲಾಗುತ್ತಿದೆ...' : 'Generating image...'}
              </p>
            </div>
          )}

          {error && !isGenerating && (
              <p className="text-red-700">{error}</p>
          )}

          {generatedImage && !isGenerating && (
            <div className="animate-fade-in">
                <img src={generatedImage} alt={selectedMonument.name.english} className="rounded-lg shadow-lg mx-auto max-h-72 w-auto border-2 border-[#D4AF37]/60" />
            </div>
          )}
          
          <Button onClick={handleGenerateImage} disabled={isGenerating}>
            🖼️ {generatedImage ? (language === 'kannada' ? 'ಹೊಸ ಚಿತ್ರವನ್ನು ರಚಿಸಿ' : 'Generate New Image') : (language === 'kannada' ? 'ಚಿತ್ರವನ್ನು ರಚಿಸಿ' : 'Generate Image')}
          </Button>
        </div>

        <Button onClick={handleGoBack} className="mt-4 !bg-[#C9B58B] hover:!bg-[#bda87a] focus:!ring-[#C9B58B]/80 text-[#382d22]">
          &larr; {language === 'kannada' ? 'ಹಿಂದೆ' : 'Back'}
        </Button>
      </div>
    );
  }

  const monumentsToShow = showAll ? monuments : monuments.slice(0, 4);

  return (
    <div className="p-6 md:p-8 rounded-lg bg-[#FFF9E6]/70 shadow-xl backdrop-blur-md animate-fade-in border-2 border-[#D4AF37]/60">
      <h2 className={`font-serif-heading text-4xl font-bold text-center mb-8 text-[#6D001A] ${language === 'kannada' ? 'font-kannada' : ''}`}>
        {language === 'kannada' ? 'ಹಂಪಿಯ ಸ್ಮಾರಕಗಳು' : 'Hampi Monuments'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {monumentsToShow.map((monument, index) => (
          <button
            key={index}
            onClick={() => handleSelectMonument(monument)}
            className={`w-full p-6 rounded-lg bg-[#C9B58B]/40 hover:bg-[#C9B58B]/80 transition-all duration-300 shadow-lg transform hover:scale-105 border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] text-center flex flex-col items-center justify-center space-y-3`}
          >
            <div className="text-4xl">{monument.icon}</div>
            <h3 className={`text-xl font-bold text-[#6D001A] ${language === 'kannada' ? 'font-kannada' : ''}`}>
              {monument.name[language]}
            </h3>
            <p className={`text-sm italic text-[#382d22]/90 ${language === 'kannada' ? 'font-kannada' : ''}`}>
              "{monument.heritageLine[language]}"
            </p>
          </button>
        ))}
        {!showAll && monuments.length > 4 && (
            <div className="md:col-span-2 mt-4">
                <Button onClick={() => setShowAll(true)}>
                    {language === 'kannada' ? 'ಇನ್ನಷ್ಟು ಸ್ಮಾರಕಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'View More Monuments'}
                </Button>
            </div>
        )}
      </div>
    </div>
  );
};

export default MonumentsMode;