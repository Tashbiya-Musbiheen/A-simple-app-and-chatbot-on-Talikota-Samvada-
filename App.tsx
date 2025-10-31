import React, { useState } from 'react';
import { Language, Screen } from './types';
import LandingScreen from './components/LandingScreen';
import WelcomeScreen from './components/WelcomeScreen';
import StoryMode from './components/StoryMode';
import MonumentsMode from './components/MonumentsMode';
import ChatbotMode from './components/ChatbotMode';
import QuizMode from './components/QuizMode';
import LanguageToggleButton from './components/LanguageToggleButton';
import Button from './components/common/Button';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('landing');
  const [language, setLanguage] = useState<Language>('english');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'english' ? 'kannada' : 'english'));
  };

  const renderScreen = () => {
    switch (screen) {
      case 'landing':
        return <LandingScreen setScreen={setScreen} />;
      case 'welcome':
        return <WelcomeScreen setScreen={setScreen} />;
      case 'story':
        return <StoryMode language={language} setScreen={setScreen} />;
      case 'monuments':
        return <MonumentsMode language={language} setScreen={setScreen} />;
      case 'chatbot':
        return <ChatbotMode language={language} setScreen={setScreen} />;
      case 'quiz':
        return <QuizMode language={language} setScreen={setScreen} />;
      default:
        return <WelcomeScreen setScreen={setScreen} />;
    }
  };
  
  const showHeaderControls = screen !== 'landing' && screen !== 'welcome';

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed p-4 flex flex-col items-center justify-center" style={{ backgroundImage: "url('/background.webp')" }}>
      {showHeaderControls && (
        <>
          <div className="absolute top-6 right-6 z-10">
            <LanguageToggleButton language={language} toggleLanguage={toggleLanguage} />
          </div>
          <div className="absolute top-6 left-6 z-10">
              <Button onClick={() => setScreen('welcome')} className="!w-auto !px-4 !py-2 !text-sm">
               &larr; {language === 'kannada' ? 'ಹಿಂದಕ್ಕೆ' : 'Back to Menu'}
              </Button>
          </div>
        </>
      )}

      <main className="w-full max-w-4xl">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;