import React, { useEffect } from 'react';
import { Screen } from '../types';

interface RajyotsavaPopupProps {
  setScreen: (screen: Screen) => void;
}

const RajyotsavaPopup: React.FC<RajyotsavaPopupProps> = ({ setScreen }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('welcome');
    }, 4500); // Show for 4.5 seconds

    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in p-4">
      {/* SVG filter for the realistic waving effect */}
      <svg width="0" height="0" className="absolute">
        <filter id="waving-flag-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="3" seed="2">
            <animate attributeName="baseFrequency" dur="10s" keyTimes="0;0.5;1" values="0.01 0.05;0.02 0.08;0.01 0.05" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="30" />
        </filter>
      </svg>
      
      <style>
        {`
          .waving-flag {
            position: absolute;
            top: -10%; 
            left: -10%;
            width: 120%;
            height: 120%;
            background: linear-gradient(to bottom, #FFCD00 50%, #C8102E 50%);
            filter: url(#waving-flag-filter);
            z-index: -1;
          }
        `}
      </style>
      
      <div className="relative w-full max-w-lg p-8 rounded-xl bg-[#FFF9E6]/90 backdrop-blur-lg shadow-2xl text-center overflow-hidden border-4 border-[#D4AF37]">
        {/* The flag background div that will be animated */}
        <div className="waving-flag"></div>
        
        <h1 className="font-kannada text-4xl md:text-5xl font-bold text-[#6D001A] mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
          ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವದ
        </h1>
        <h2 className="font-kannada text-3xl md:text-4xl font-semibold text-[#382d22]" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>
          ಹಾರ್ದಿಕ ಶುಭಾಶಯಗಳು!
        </h2>
        <div className="mt-6 text-6xl animate-pulse">
           🪔
        </div>
      </div>
    </div>
  );
};

export default RajyotsavaPopup;