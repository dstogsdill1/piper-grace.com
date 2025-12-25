'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Utensils, ShowerHead } from 'lucide-react';
import Confetti from 'react-confetti';

export default function StablePage() {
  const [hunger, setHunger] = useState(100);
  const [energy, setEnergy] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [cleanliness, setCleanliness] = useState(100);
  const [horseName, setHorseName] = useState("Spirit");
  const [horseColor, setHorseColor] = useState('#8B4513');
  const [isEditingName, setIsEditingName] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    const savedState = localStorage.getItem('stableState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setHunger(parsed.hunger);
      setEnergy(parsed.energy);
      setHappiness(parsed.happiness);
      setCleanliness(parsed.cleanliness);
      setHorseName(parsed.horseName);
    }
    const savedColor = localStorage.getItem('myHorseColor');
    if (savedColor) setHorseColor(savedColor);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger(h => Math.max(0, h - 0.5));
      setEnergy(e => Math.max(0, e - 0.2));
      setHappiness(h => Math.max(0, h - 0.3));
      setCleanliness(c => Math.max(0, c - 0.4));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('stableState', JSON.stringify({ hunger, energy, happiness, cleanliness, horseName }));
  }, [hunger, energy, happiness, cleanliness, horseName]);

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

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
      {getHorseMood() === "🤩" && <Confetti recycle={false} numberOfPieces={200} />}
      <div className="flex items-center gap-4">
        {isEditingName ? (
          <input type="text" value={horseName} onChange={(e) => setHorseName(e.target.value)} onBlur={() => setIsEditingName(false)} autoFocus className="input input-bordered input-lg text-4xl font-black text-center w-full max-w-md" />
        ) : (
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 cursor-pointer hover:scale-105 transition-transform" onClick={() => setIsEditingName(true)}>{horseName} {getHorseMood()}</h1>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="relative h-96 bg-base-100 rounded-3xl border-4 border-primary/30 shadow-2xl flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/images/piper3.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <motion.div animate={{ y: [0, -10, 0], scale: actionFeedback ? 1.2 : 1 }} transition={{ repeat: Infinity, duration: 3 }} className="relative z-10 drop-shadow-2xl">
            <svg viewBox="0 0 24 24" fill={horseColor} className="w-64 h-64 transform scale-x-[-1]">
              <rect x="14" y="2" width="6" height="5" rx="1" />
              <rect x="12" y="4" width="4" height="8" />
              <rect x="4" y="8" width="14" height="7" rx="2" />
              <rect x="6" y="15" width="3" height="7" rx="1" />
              <rect x="15" y="15" width="3" height="7" rx="1" />
              <rect x="2" y="9" width="2" height="4" rx="1" />
              <circle cx="17" cy="4.5" r="0.8" fill="white" />
            </svg>
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
      <div className="flex justify-between mb-1 font-bold text-lg"><span className="flex items-center gap-2">{icon} {label}</span><span>{Math.round(value)}%</span></div>
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