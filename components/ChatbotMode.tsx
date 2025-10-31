import React, { useState, useEffect, useRef } from 'react';
import { Language, Screen } from '../types';
import Button from './common/Button';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

interface ChatbotModeProps {
  language: Language;
  setScreen: (screen: Screen) => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatbotMode: React.FC<ChatbotModeProps> = ({ language }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionTopics = [
    {
      kannada: "ಯುದ್ಧದಲ್ಲಿನ ನಂಬಿಕೆದ್ರೋಹದ ಬಗ್ಗೆ ಹೇಳಿ.",
      english: "Tell me about the betrayal in the battle."
    },
    {
      kannada: "ಯುದ್ಧದ ನಂತರ ಹಂಪಿಗೆ ಏನಾಯಿತು?",
      english: "What happened to Hampi after the war?"
    },
    {
      kannada: "ಕೃಷ್ಣದೇವರಾಯ ಯಾರು?",
      english: "Who was Krishnadevaraya?"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const initializeChat = () => {
      setError(null);
      setMessages([]);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        
        const systemInstruction = `You are a knowledgeable and friendly historical guide specializing in the Vijayanagara Empire, the city of Hampi, and the Battle of Talikota. Your name is 'Samvāda'. Answer questions based on this historical context. If a question is outside this scope, gently guide the user back to the topic. Respond in ${language}.`;

        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: systemInstruction,
          },
        });
        setChat(newChat);

        const initialMessageText = language === 'kannada'
          ? "ನಮಸ್ಕಾರ! ನಾನು ಸಂವಾದ. ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಬಗ್ಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ."
          : "Greetings! I am Samvāda. Ask me your questions about the Vijayanagara Empire.";
        
        setMessages([{ role: 'model', text: initialMessageText }]);

      } catch (e) {
        console.error("Failed to initialize chat:", e);
        const initError = language === 'kannada' ? 'ಚಾಟ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸಲು ವಿಫಲವಾಗಿದೆ.' : 'Failed to initialize chat.';
        setError(initError);
        setMessages([{role: 'model', text: initError}]);
      }
    };

    initializeChat();
  }, [language]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !chat || isLoading) return;

    const userMessage: Message = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response: GenerateContentResponse = await chat.sendMessage({ message: messageText });
      const modelMessage: Message = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      const errorMessage = language === 'kannada' ? 'ಕ್ಷಮಿಸಿ, ಉತ್ತರವನ್ನು ಪಡೆಯುವಲ್ಲಿ ದೋಷ ಕಂಡುಬಂದಿದೆ.' : 'Sorry, there was an error getting a response.';
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(userInput);
    setUserInput('');
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };


  return (
    <div className="w-full max-w-2xl h-[80vh] flex flex-col p-4 md:p-6 rounded-lg bg-[#FFF9E6]/80 shadow-xl backdrop-blur-md border-2 border-[#D4AF37]/60 animate-fade-in">
      <h2 className={`font-serif-heading text-2xl font-bold text-center mb-4 text-[#6D001A] ${language === 'kannada' ? 'font-kannada' : ''}`}>
        {language === 'kannada' ? 'ಸಂವಾದದೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ' : 'Chat with Samvāda'}
      </h2>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md p-3 rounded-lg shadow ${msg.role === 'user' ? 'bg-[#C9B58B] text-[#382d22]' : 'bg-white text-[#382d22]'} ${language === 'kannada' ? 'font-kannada' : ''}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-md p-3 rounded-lg shadow bg-white text-[#382d22] flex items-center space-x-2">
               <div className="w-2 h-2 bg-[#6D001A] rounded-full animate-pulse"></div>
               <div className="w-2 h-2 bg-[#6D001A] rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
               <div className="w-2 h-2 bg-[#6D001A] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}
         <div ref={messagesEndRef} />
      </div>

       {error && !isLoading && <p className="text-red-600 text-center my-2 text-sm">{error}</p>}

      <div className="mt-2">
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {suggestionTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(topic[language])}
                disabled={isLoading}
                className={`px-3 py-1 text-sm rounded-full bg-[#C9B58B]/50 text-[#382d22] border border-[#D4AF37]/50 hover:bg-[#C9B58B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${language === 'kannada' ? 'font-kannada' : ''}`}
              >
                {topic[language]}
              </button>
          ))}
        </div>

        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={language === 'kannada' ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...' : 'Type your question here...'}
            className={`flex-1 p-3 rounded-lg border-2 border-[#D4AF37]/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white/80 resize-none ${language === 'kannada' ? 'font-kannada' : ''}`}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit(e as any);
              }
            }}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !userInput.trim()} className="!w-auto !px-5 !py-3 self-stretch flex items-center justify-center">
            {isLoading 
              ? <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
              : (language === 'kannada' ? 'ಕಳುಹಿಸಿ' : 'Send')
            }
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotMode;