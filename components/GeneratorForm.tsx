import React, { useState } from 'react';
import { ThemeOption } from '../types';

interface GeneratorFormProps {
  onSubmit: (topic: string, mood: string) => void;
  disabled: boolean;
}

const MOODS: ThemeOption[] = [
  { id: 'hopeful', label: 'Hopeful', description: 'Bright, upward-looking, sunny' },
  { id: 'peaceful', label: 'Peaceful', description: 'Calm, serene, gentle nature' },
  { id: 'vibrant', label: 'Vibrant', description: 'Energetic, colorful, celebrating life' },
  { id: 'connected', label: 'Connected', description: 'Social, warm, togetherness' },
  { id: 'determined', label: 'Determined', description: 'Focused, strong, climbing mountains' },
];

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onSubmit, disabled }) => {
  const [topic, setTopic] = useState('');
  const [selectedMood, setSelectedMood] = useState(MOODS[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic, selectedMood);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-2">
          What is the blog post about?
        </label>
        <div className="relative">
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={disabled}
            placeholder="e.g., Celebrating one year sober, Hiking with friends, Morning meditation..."
            className="w-full px-4 py-4 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-100 focus:border-brand-500 transition-all text-lg placeholder:text-slate-400 shadow-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {!topic && <span className="text-slate-400 text-xs pointer-events-none">Required</span>}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Choose the visual mood
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {MOODS.map((mood) => (
            <button
              key={mood.id}
              type="button"
              disabled={disabled}
              onClick={() => setSelectedMood(mood.id)}
              className={`
                relative flex flex-col items-start p-3 rounded-xl border-2 text-left transition-all duration-200
                ${selectedMood === mood.id 
                  ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500 shadow-md scale-[1.02]' 
                  : 'border-slate-200 bg-white hover:border-brand-200 hover:bg-slate-50'}
              `}
            >
              <span className={`font-semibold text-sm mb-1 ${selectedMood === mood.id ? 'text-brand-700' : 'text-slate-700'}`}>
                {mood.label}
              </span>
              <span className="text-xs text-slate-500 leading-tight">
                {mood.description}
              </span>
              
              {selectedMood === mood.id && (
                <div className="absolute -top-2 -right-2 bg-brand-500 text-white rounded-full p-1 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled || !topic.trim()}
        className={`
          w-full py-4 px-6 rounded-xl font-bold text-lg text-white shadow-lg transition-all
          ${disabled || !topic.trim()
            ? 'bg-slate-300 cursor-not-allowed shadow-none' 
            : 'bg-brand-600 hover:bg-brand-500 hover:shadow-brand-200/50 active:translate-y-0.5'}
        `}
      >
        {disabled ? 'Dreaming...' : 'Generate Vision'}
      </button>
    </form>
  );
};

export default GeneratorForm;