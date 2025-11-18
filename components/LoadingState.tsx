import React, { useEffect, useState } from 'react';
import { GenerationState } from '../types';

interface LoadingStateProps {
  state: GenerationState;
}

const TIPS = [
  "Focusing on the positive moments...",
  "Crafting a scene of connection...",
  "Visualizing a brighter future...",
  "Drafting words of encouragement...",
  "Rendering happy smiles..."
];

const LoadingState: React.FC<LoadingStateProps> = ({ state }) => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const isImageGen = state === GenerationState.GENERATING_IMAGE;
  const message = isImageGen ? "Painting your vision (this takes a moment)..." : "Drafting the story...";

  return (
    <div className="w-full h-96 flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-pulse">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-brand-500 animate-bounce">
             <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM6.967 13.883l-1.111 3.892a.75.75 0 01-1.442 0l-1.111-3.892a3.75 3.75 0 00-2.576-2.576l-3.892-1.111a.75.75 0 010-1.442l3.892-1.111a3.75 3.75 0 002.576-2.576l1.111-3.892a.75.75 0 011.442 0l1.111 3.892a3.75 3.75 0 002.576 2.576l3.892 1.111a.75.75 0 010 1.442l-3.892 1.111a3.75 3.75 0 00-2.576 2.576z" clipRule="evenodd" />
           </svg>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{message}</h3>
      <p className="text-slate-500 text-sm animate-fade-in transition-opacity duration-500">
        {TIPS[tipIndex]}
      </p>
    </div>
  );
};

export default LoadingState;