'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Heart, Puzzle, Sparkles, Lock, CheckCircle2, TrendingUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  xp: number;
}

interface Achievement extends AchievementDef {
  unlocked: boolean;
  unlockedAt?: string;
}

const achievementsList: AchievementDef[] = [
  { id: 'first_run', name: 'First Gallop', description: 'Play the Horse Runner game', icon: Zap, color: 'bg-amber-500', xp: 10 },
  { id: 'high_score_50', name: 'Speed Demon', description: 'Score 50+ in Horse Runner', icon: Trophy, color: 'bg-yellow-500', xp: 25 },
  { id: 'high_score_100', name: 'Lightning Hooves', description: 'Score 100+ in Horse Runner', icon: Star, color: 'bg-orange-500', xp: 50 },
  { id: 'stable_master', name: 'Stable Master', description: 'Keep your horse happy for 5 minutes', icon: Heart, color: 'bg-rose-500', xp: 30 },
  { id: 'artist', name: 'Creative Spirit', description: 'Save a drawing', icon: Sparkles, color: 'bg-cyan-500', xp: 20 },
  { id: 'puzzle_easy', name: 'Puzzle Starter', description: 'Complete an easy puzzle', icon: Puzzle, color: 'bg-violet-500', xp: 15 },
  { id: 'puzzle_hard', name: 'Puzzle Master', description: 'Complete a hard puzzle', icon: Puzzle, color: 'bg-purple-500', xp: 40 },
  { id: 'memory_win', name: 'Memory Champion', description: 'Win the memory game', icon: Sparkles, color: 'bg-emerald-500', xp: 25 },
  { id: 'horse_creator', name: 'Horse Designer', description: 'Save a custom horse', icon: Heart, color: 'bg-pink-500', xp: 20 },
];

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

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
  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);
  const progressPercent = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 rounded-2xl bg-amber-500/20">
            <Trophy className="w-10 h-10 text-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content">
              My Achievements
            </h1>
            <p className="text-base-content/60">Collect badges and earn XP!</p>
          </div>
        </div>
      </motion.section>

      {/* Stats Cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="ranch-card p-4 text-center">
            <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{unlockedCount}</div>
            <div className="text-xs text-base-content/60">Unlocked</div>
          </div>
          <div className="ranch-card p-4 text-center">
            <Lock className="w-6 h-6 text-base-content/40 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalCount - unlockedCount}</div>
            <div className="text-xs text-base-content/60">Locked</div>
          </div>
          <div className="ranch-card p-4 text-center">
            <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalXP}</div>
            <div className="text-xs text-base-content/60">Total XP</div>
          </div>
          <div className="ranch-card p-4 text-center">
            <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{Math.round(progressPercent)}%</div>
            <div className="text-xs text-base-content/60">Complete</div>
          </div>
        </div>
      </motion.section>

      {/* Progress Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="ranch-card p-4">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-medium">{unlockedCount} / {totalCount} Achievements</span>
            <span className="text-primary font-medium">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-3 bg-base-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </motion.section>

      {/* Achievement Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className={`ranch-card p-5 ${!achievement.unlocked ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${achievement.unlocked ? achievement.color : 'bg-base-300'} text-white relative`}>
                  <achievement.icon className="w-6 h-6" />
                  {achievement.unlocked && (
                    <CheckCircle2 className="w-4 h-4 text-white absolute -top-1 -right-1 bg-emerald-500 rounded-full" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-base-content">{achievement.name}</h3>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      +{achievement.xp} XP
                    </span>
                  </div>
                  <p className="text-sm text-base-content/60 mt-1">{achievement.description}</p>
                  
                  {achievement.unlocked ? (
                    <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Unlocked!
                    </p>
                  ) : (
                    <p className="text-xs text-base-content/40 mt-2 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Keep playing to unlock
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}