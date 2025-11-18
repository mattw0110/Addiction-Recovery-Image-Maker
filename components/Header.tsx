import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
              <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.003c-1.228.954-2.602 1.75-4.066 2.341.26.74.467 1.51.617 2.3.108.568-.332 1.09-.908 1.166a.75.75 0 01-.838-.645c-.195-1.506-.648-2.943-1.327-4.255-1.106.346-2.26.564-3.442.617a.75.75 0 01-.795-.72c-.076-.575.277-1.099.838-1.206.79-.15 1.558-.357 2.298-.617C8.407 12.09 9.203 10.716 10.157 9.488c-3.152-1.095-5.895-3.31-7.725-6.165a.75.75 0 011.07-1.008c2.33 1.814 5.175 2.934 8.225 3.057-1.59 1.073-3.31 1.913-5.113 2.488l1.701 2.204v-.006z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Image Maker</h1>
        </div>
        <a 
          href="#" 
          className="text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors"
        >
        </a>
      </div>
    </header>
  );
};

export default Header;