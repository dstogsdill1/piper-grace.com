'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Utensils, ShowerHead, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import { useHorse } from '@/hooks/useHorse';
import { HorseSVG } from '@/components/HorseSVG';
import { getBreedInfo } from '@/lib/horse-data';

export default function StablePage() {
  const { horse, setName, isLoaded } = useHorse();
  const [hunger, setHunger] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [cleanliness, setCleanliness] = useState(100);
  const [isEditingName, setIsEditingName] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Load care stats from stable state
  useEffect(() => {
    const savedState = localStorage.getItem('stableState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      if (parsed.hunger !== undefined) setHunger(parsed.hunger);
      if (parsed.energy !== undefined) setEnergy(parsed.energy);
      if (parsed.happiness !== undefined) setHappiness(parsed.happiness);
      if (parsed.cleanliness !== undefined) setCleanliness(parsed.cleanliness);
    }
  }, []);

  // Auto-decay stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      setHunger(h => Math.max(0, h - 0.5));
      setEnergy(e => Math.max(0, e - 0.2));
      setHappiness(h => Math.max(0, h - 0.3));
      setCleanliness(c => Math.max(0, c - 0.4));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save care stats (separate from horse identity data)
  useEffect(() => {
    localStorage.setItem('stableState', JSON.stringify({ hunger, energy, happiness, cleanliness }));
  }, [hunger, energy, happiness, cleanliness]);

  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  const handleAction = (type: 'feed' | 'sleep' | 'play' | 'clean') => {
    setActionFeedback(type);
    setTimeout(() => setActionFeedback(null), 2000);
    if (type === 'feed') { setHunger(h => Math.min(100, h + 20)); setEnergy(e => Math.min(100, e + 5)); }
    else if (type === 'sleep') { setEnergy(e => Math.min(100, e + 40)); setHunger(h => Math.max(0, h - 10)); }
    else if (type === 'play') { setHappiness(h => Math.min(100, h + 25)); setEnergy(e => Math.max(0, e - 15)); setCleanliness(c => Math.max(0, c - 10)); }
    else if (type === 'clean') { setCleanliness(c => Math.min(100, c + 30)); setHappiness(h => Math.min(100, h + 5)); }
  };

  const getHorseMood = () => {
    const average = (hunger + energy + happiness + cleanliness) / 4;
    if (average > 80) return "🤩";
    if (average > 50) return "🙂";
    if (average > 20) return "😐";
    return "😭";
  };

  const breed = getBreedInfo(horse.breed);

  // Don't render until horse data is loaded
  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Sparkles className="w-12 h-12 animate-pulse text-primary" />
        <p className="text-xl">Loading your horse...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
      {getHorseMood() === "🤩" && <Confetti recycle={false} numberOfPieces={200} />}
      <div className="flex items-center gap-4">
        {isEditingName ? (
          <input 
            type="text" 
            value={horse.name} 
            onChange={(e) => handleNameChange(e.target.value)} 
            onBlur={() => setIsEditingName(false)} 
            onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
            autoFocus 
            className="input input-bordered input-lg text-4xl font-black text-center w-full max-w-md" 
          />
        ) : (
          <h1 
            className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 cursor-pointer hover:scale-105 transition-transform flex items-center gap-3" 
            onClick={() => setIsEditingName(true)}
          >
            <span className="text-4xl">{breed.icon}</span>
            {horse.name} {getHorseMood()}
          </h1>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="relative h-96 bg-base-100 rounded-3xl border-4 border-primary/30 shadow-2xl flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/images/piper3.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <motion.div 
            animate={{ 
              scale: actionFeedback ? 1.1 : 1,
            }} 
            transition={{ duration: 0.3 }} 
            className="relative z-10"
          >
            <HorseSVG horse={horse} size="xl" animated={true} />
          </motion.div>
          {actionFeedback && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: -50 }} exit={{ opacity: 0 }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,0,0,1)] z-20">
              {actionFeedback === 'feed' && "🍎 Yummy!"}
              {actionFeedback === 'sleep' && "💤 Zzz..."}
              {actionFeedback === 'play' && "🎾 Fun!"}
              {actionFeedback === 'clean' && "✨ Sparkle!"}
            </motion.div>
          )}
        </div>
        <div className="flex flex-col gap-6 justify-center">
          <StatBar label="Hunger" value={hunger} icon={<Utensils />} color="progress-error" />
          <StatBar label="Energy" value={energy} icon={<Zap />} color="progress-warning" />
          <StatBar label="Happiness" value={happiness} icon={<Heart />} color="progress-secondary" />
          <StatBar label="Cleanliness" value={cleanliness} icon={<ShowerHead />} color="progress-info" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <ActionButton onClick={() => handleAction('feed')} icon="🍎" label="Feed" color="btn-error" />
            <ActionButton onClick={() => handleAction('sleep')} icon="💤" label="Sleep" color="btn-warning" />
            <ActionButton onClick={() => handleAction('play')} icon="🎾" label="Play" color="btn-secondary" />
            <ActionButton onClick={() => handleAction('clean')} icon="🧼" label="Clean" color="btn-info" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, value, icon, color }: { label: string, value: number, icon: React.ReactNode, color: string }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 font-bold text-lg text-white"><span className="flex items-center gap-2">{icon} {label}</span><span>{Math.round(value)}%</span></div>
      <progress className={`progress ${color} w-full h-4 shadow-inner bg-base-300`} value={value} max="100"></progress>
    </div>
  );
}

function ActionButton({ onClick, icon, label, color }: { onClick: () => void, icon: string, label: string, color: string }) {
  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClick} className={`btn ${color} btn-lg h-20 text-xl font-black shadow-lg border-b-4 border-black/20`}>
      <span className="text-3xl mr-2">{icon}</span> {label}
    </motion.button>
  );
}