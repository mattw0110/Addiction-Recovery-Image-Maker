import React, { useState, useCallback } from 'react';
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

  const handleGenerate = useCallback(async (topic: string, mood: string) => {
    setState(GenerationState.GENERATING_TEXT);
    setError(null);
    setResult(null);

    try {
      // 1. Generate Text Content & Prompt
      const content = await generateBlogContent(topic, mood);
      
      setState(GenerationState.GENERATING_IMAGE);
      
      // 2. Generate Image from Prompt
      const image = await generateBlogImage(content.imagePrompt);

      setResult({ content, image });
      setState(GenerationState.COMPLETE);
    } catch (err: any) {
      console.error(err);
      setState(GenerationState.ERROR);
      setError(err.message || "An unexpected error occurred. Please try again.");
    }
  }, []);

  const handleReset = () => {
    setState(GenerationState.IDLE);
    setResult(null);
    setError(null);
  };

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