import React, { useState, useEffect, useRef } from 'react';
import { Language, Screen, Message } from '../types';
import Button from './common/Button';
import { GoogleGenAI, Chat, GenerateContentResponse, Content } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { translateChatHistory as translateHistoryService } from '../services/geminiService';

// Custom hook to get the previous value of a prop or state
// FIX: Initialize useRef with the current value to satisfy type constraints and hook logic, making it consistent with other components.
function usePrevious(value: Language): Language {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

interface ChatbotModeProps {
  language: Language;
  setScreen: (screen: Screen) => void;
}

const ChatbotMode: React.FC<ChatbotModeProps> = ({ language }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevLanguage = usePrevious(language);

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
    const isLanguageSwitch = prevLanguage && prevLanguage !== language;

    if (isLanguageSwitch) {
      translateChatHistory(language);
    } else if (!chat) {
      initializeChat();
    }
  }, [language]);

  const initializeChat = () => {
    setError(null);
    setMessages([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      const systemInstruction = `You are a knowledgeable and friendly historical guide specializing in the Vijayanagara Empire, the city of Hampi, and the Battle of Talikota. Your name is 'Samvāda'. Answer questions based on this historical context. If a question is outside this scope, gently guide the user back to the topic. Respond in ${language}. Your responses should be well-formatted, using paragraphs and lists where appropriate, as if you were a helpful AI assistant.`;

      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemInstruction,
        },
      });
      setChat(newChat);

      const initialMessageText = "ನಮಸ್ಕಾರ! ನಾನು ಸಂವಾದ. ತಾಳಿಕೋಟೆ ಕದನ ಮತ್ತು ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಬಗ್ಗೆ ಏನು ಬೇಕಾದರೂ ಕೇಳಿ.\n\nGreetings! I am Samvāda. Ask me anything about the Battle of Talikota and the Vijayanagara Empire.";
      
      setMessages([{ role: 'model', text: initialMessageText }]);

    } catch (e) {
      console.error("Failed to initialize chat:", e);
      const initError = language === 'kannada' ? 'ಚಾಟ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸಲು ವಿಫಲವಾಗಿದೆ.' : 'Failed to initialize chat.';
      setError(initError);
      setMessages([{role: 'model', text: initError}]);
    }
  };
  
  const translateChatHistory = async (targetLanguage: Language) => {
    if (messages.length <= 1) return;
    
    setIsTranslating(true);
    setError(null);

    try {
      // Exclude the bilingual greeting from translation
      const historyToTranslate = messages.slice(1);
      const translatedHistory = await translateHistoryService(historyToTranslate, targetLanguage);
      
      if (translatedHistory) {
        // Prepend the original greeting to the translated history
        setMessages([messages[0], ...translatedHistory]);

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const systemInstruction = `You are a knowledgeable and friendly historical guide specializing in the Vijayanagara Empire, the city of Hampi, and the Battle of Talikota. Your name is 'Samvāda'. Answer questions based on this historical context. If a question is outside this scope, gently guide the user back to the topic. Respond in ${targetLanguage}. Your responses should be well-formatted, using paragraphs and lists where appropriate, as if you were a helpful AI assistant.`;
        
        // The chat history for the new instance should not include the bilingual greeting
        const history: Content[] = translatedHistory.map(msg => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        }));
        
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          history: history.length > 0 ? history : undefined,
          config: {
            systemInstruction: systemInstruction,
          },
        });
        setChat(newChat);
      } else {
        const translationError = targetLanguage === 'kannada' ? 'ಅನುವಾದ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : 'Translation failed. Please try again.';
        setError(translationError);
      }
    } catch (e) {
      console.error("Failed to re-initialize chat after translation:", e);
      const initError = targetLanguage === 'kannada' ? 'ಚಾಟ್ ಅನ್ನು ಮರು-ಪ್ರಾರಂಭಿಸಲು ವಿಫಲವಾಗಿದೆ.' : 'Failed to re-initialize chat.';
      setError(initError);
    } finally {
        setIsTranslating(false);
    }
  };

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
  
  const handleClearChat = () => {
    if (isLoading || isTranslating) return;
    initializeChat();
  };

  return (
    <div className="w-full h-[85vh] flex flex-col p-4 md:p-6 rounded-lg bg-[#FFF9E6]/80 shadow-xl backdrop-blur-md border-2 border-[#D4AF37]/60 animate-fade-in relative">
      {isTranslating && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-lg transition-opacity duration-300">
          <div className="w-10 h-10 border-4 border-[#D4AF37]/50 border-t-[#D4AF37] rounded-full animate-spin"></div>
          <p className={`mt-4 text-white font-semibold text-lg ${language === 'kannada' ? 'font-kannada' : ''}`}>
            {language === 'kannada' ? 'ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...' : 'Translating...'}
          </p>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className={`font-serif-heading text-2xl font-bold text-[#6D001A] ${language === 'kannada' ? 'font-kannada' : ''}`}>
            {language === 'kannada' ? 'ಸಂವಾದದೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ' : 'Chat with Samvāda'}
        </h2>
        <button
            onClick={handleClearChat}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg bg-transparent text-[#382d22]/80 border border-[#D4AF37]/50 hover:bg-[#C9B58B]/50 hover:text-[#382d22] transition-colors disabled:opacity-50 flex items-center gap-1.5`}
            disabled={isLoading || isTranslating}
            aria-label={language === 'kannada' ? 'ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ' : 'Clear Chat'}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className={language === 'kannada' ? 'font-kannada' : ''}>
                {language === 'kannada' ? 'ತೆರವುಗೊಳಿಸಿ' : 'Clear'}
            </span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl p-3 rounded-lg shadow ${msg.role === 'user' ? 'bg-[#C9B58B] text-[#382d22]' : 'bg-white text-[#382d22]'} ${language === 'kannada' ? 'font-kannada' : ''}`}>
              {msg.role === 'model' 
                ? <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 my-2 pl-4" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 my-2 pl-4" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                    }}
                  >{msg.text}</ReactMarkdown>
                : msg.text
              }
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

      <div className="mt-2 pt-2 border-t border-[#D4AF37]/30">
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {suggestionTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(topic[language])}
                disabled={isLoading || isTranslating}
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
            className={`flex-1 p-3 rounded-lg border-2 border-[#D4AF37]/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] bg-white/80 text-[#382d22] placeholder:text-[#382d22]/70 resize-none ${language === 'kannada' ? 'font-kannada' : ''}`}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit(e as any);
              }
            }}
            disabled={isLoading || isTranslating}
          />
          <Button type="submit" disabled={isLoading || isTranslating || !userInput.trim()} className="!w-auto !px-5 !py-3 self-stretch flex items-center justify-center">
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