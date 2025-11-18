import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import GeneratorForm from './components/GeneratorForm';
import ResultCard from './components/ResultCard';
import LoadingState from './components/LoadingState';
import { generateBlogContent, generateBlogImage } from './services/geminiService';
import { GenerationResult, GenerationState } from './types';

function App() {
  const [state, setState] = useState<GenerationState>(GenerationState.IDLE);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // API Key Management State
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isCheckingKey, setIsCheckingKey] = useState<boolean>(true);
  const [manualApiKey, setManualApiKey] = useState<string>("");

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        if (window.aistudio && window.aistudio.hasSelectedApiKey) {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          setHasApiKey(hasKey);
        } else {
          // Safe check for process.env to avoid "ReferenceError: process is not defined" in browser
          const envKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
          setHasApiKey(!!envKey);
        }
      } catch (e) {
        console.error("Error checking API key:", e);
      } finally {
        setIsCheckingKey(false);
      }
    };
    
    checkApiKey();
  }, []);

  const handleConnectApiKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      try {
        await window.aistudio.openSelectKey();
        // Assume success after dialog interaction
        setHasApiKey(true);
      } catch (e) {
        console.error("Error selecting key:", e);
      }
    }
  };

  const handleManualKeySubmit = () => {
    if (manualApiKey.trim()) {
      setHasApiKey(true);
    }
  };

  const handleGenerate = useCallback(async (topic: string, mood: string) => {
    setState(GenerationState.GENERATING_TEXT);
    setError(null);
    setResult(null);

    try {
      // 1. Generate Text Content & Prompt
      // Pass manualApiKey if it exists, otherwise service falls back to env
      const content = await generateBlogContent(topic, mood, manualApiKey);
      
      setState(GenerationState.GENERATING_IMAGE);
      
      // 2. Generate Image from Prompt
      const image = await generateBlogImage(content.imagePrompt, manualApiKey);

      setResult({ content, image });
      setState(GenerationState.COMPLETE);
    } catch (err: any) {
      console.error(err);
      setState(GenerationState.ERROR);
      setError(err.message || "An unexpected error occurred. Please try again.");
    }
  }, [manualApiKey]);

  const handleReset = () => {
    setState(GenerationState.IDLE);
    setResult(null);
    setError(null);
  };

  // Initial Loading Screen
  if (isCheckingKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  // API Key Request Screen
  if (!hasApiKey) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
         <Header />
         <main className="flex-grow flex flex-col items-center justify-center px-4 py-10">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-brand-600">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Connect to Google AI</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                To generate high-quality images and text, Recovery Visions requires access to Google's Gemini API.
              </p>
              
              <button
                onClick={handleConnectApiKey}
                className="w-full py-3.5 px-6 bg-white border-2 border-slate-200 hover:border-brand-500 hover:text-brand-600 text-slate-700 font-bold rounded-xl transition-all flex items-center justify-center gap-3 group"
              >
                <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google" className="w-5 h-5"/>
                <span>Select Key via Google AI Studio</span>
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-sm font-medium text-slate-400">OR</span>
                </div>
              </div>

              <div className="text-left">
                <label htmlFor="apiKey" className="block text-sm font-medium text-slate-700 mb-2">Enter API Key manually</label>
                <div className="flex gap-2">
                  <input
                    id="apiKey"
                    type="password"
                    value={manualApiKey}
                    onChange={(e) => setManualApiKey(e.target.value)}
                    placeholder="Paste your API key here..."
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                  />
                  <button 
                    onClick={handleManualKeySubmit}
                    disabled={!manualApiKey.trim()}
                    className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-200/50 transition-all"
                  >
                    Start
                  </button>
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  Don't have a key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Get one here</a>.
                </p>
              </div>
            </div>
         </main>
      </div>
    );
  }

  // Main App Screen
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
            Create Addiction Recovery Image
          </h2>
          <p className="text-slate-600 text-lg">
            Create inspiring, high-quality images of happy people and accompanying reflections for your recovery journey blog posts.
          </p>
        </div>

        {state === GenerationState.IDLE && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
            <GeneratorForm onSubmit={handleGenerate} disabled={false} />
          </div>
        )}

        {(state === GenerationState.GENERATING_TEXT || state === GenerationState.GENERATING_IMAGE) && (
          <div className="max-w-2xl mx-auto">
            <LoadingState state={state} />
          </div>
        )}

        {state === GenerationState.COMPLETE && result && (
          <div className="max-w-3xl mx-auto">
             <ResultCard 
                content={result.content} 
                image={result.image} 
                onReset={handleReset} 
             />
          </div>
        )}

        {state === GenerationState.ERROR && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 text-red-700">
              <p className="font-semibold">Oops! Something went wrong.</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
            <button 
              onClick={handleReset}
              className="bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Created by Matthrew White. Powered by Google Gemini & Imagen.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;