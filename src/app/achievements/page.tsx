'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Heart, Paintbrush, Puzzle, Brain, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: string;
}

const achievementsList: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  { id: 'first_run', name: 'First Gallop', description: 'Play the Horse Runner game', icon: <Zap className="w-8 h-8" /> },
  { id: 'high_score_50', name: 'Speed Demon', description: 'Score 50+ in Horse Runner', icon: <Trophy className="w-8 h-8" /> },
  { id: 'high_score_100', name: 'Lightning Hooves', description: 'Score 100+ in Horse Runner', icon: <Star className="w-8 h-8" /> },
  { id: 'stable_master', name: 'Stable Master', description: 'Keep your horse happy for 5 minutes', icon: <Heart className="w-8 h-8" /> },
  { id: 'artist', name: 'Creative Spirit', description: 'Save a drawing', icon: <Paintbrush className="w-8 h-8" /> },
  { id: 'puzzle_easy', name: 'Puzzle Starter', description: 'Complete an easy puzzle', icon: <Puzzle className="w-8 h-8" /> },
  { id: 'puzzle_hard', name: 'Puzzle Master', description: 'Complete a hard puzzle', icon: <Puzzle className="w-8 h-8" /> },
  { id: 'memory_win', name: 'Memory Champion', description: 'Win the memory game', icon: <Brain className="w-8 h-8" /> },
  { id: 'horse_creator', name: 'Horse Designer', description: 'Save a custom horse', icon: <Sparkles className="w-8 h-8" /> },
];

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newUnlock, setNewUnlock] = useState<string | null>(null);

  useEffect(() => {
    const savedAchievements = localStorage.getItem('achievements');
    const unlockedIds = savedAchievements ? JSON.parse(savedAchievements) : {};
    
    const fullAchievements = achievementsList.map(a => ({
      ...a,
      unlocked: !!unlockedIds[a.id],
      unlockedAt: unlockedIds[a.id] || undefined,
    }));
    
    setAchievements(fullAchievements);
  }, []);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercent = (unlockedCount / totalCount) * 100;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
          🏆 ACHIEVEMENTS
        </h1>
        <p className="text-xl text-base-content/70">Collect them all!</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-2">
          <span className="font-bold text-lg">{unlockedCount} / {totalCount} Unlocked</span>
          <span className="font-bold text-lg text-warning">{Math.round(progressPercent)}%</span>
        </div>
        <progress className="progress progress-warning w-full h-4" value={progressPercent} max="100"></progress>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <AnimatePresence>
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card bg-base-100 shadow-xl border-2 transition-all ${
                achievement.unlocked 
                  ? 'border-warning bg-gradient-to-br from-yellow-900/20 to-orange-900/20' 
                  : 'border-base-300 opacity-50 grayscale'
              }`}
            >
              <div className="card-body items-center text-center p-6">
                <div className={`p-4 rounded-full ${achievement.unlocked ? 'bg-warning/20 text-warning' : 'bg-base-300 text-base-content/30'}`}>
                  {achievement.icon}
                </div>
                <h2 className="card-title text-lg">{achievement.name}</h2>
                <p className="text-sm text-base-content/60">{achievement.description}</p>
                {achievement.unlocked && achievement.unlockedAt && (
                  <div className="badge badge-warning badge-sm mt-2">✓ Unlocked</div>
                )}
                {!achievement.unlocked && (
                  <div className="badge badge-ghost badge-sm mt-2">🔒 Locked</div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}