'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Save, Sparkles, Trophy, Star } from 'lucide-react';

export default function ProfilePage() {
  const [playerName, setPlayerName] = useState('Piper');
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [stats, setStats] = useState({
    runnerHighScore: 0,
    puzzlesSolved: 0,
    memoryWins: 0,
    drawingsSaved: 0,
  });

  useEffect(() => {
    const savedName = localStorage.getItem('playerName');
    if (savedName) setPlayerName(savedName);

    // Load stats
    const runnerHighScore = parseInt(localStorage.getItem('runnerHighScore') || '0');
    const puzzlesSolved = parseInt(localStorage.getItem('puzzlesSolved') || '0');
    const memoryWins = parseInt(localStorage.getItem('memoryWins') || '0');
    const drawingsSaved = parseInt(localStorage.getItem('drawingsSaved') || '0');
    
    setStats({ runnerHighScore, puzzlesSolved, memoryWins, drawingsSaved });
  }, []);

  const saveName = () => {
    localStorage.setItem('playerName', playerName);
    setIsEditing(false);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const avatarEmojis = ['🐴', '🦄', '🎠', '🏇', '🐎'];
  const [avatarIndex, setAvatarIndex] = useState(0);

  useEffect(() => {
    const savedAvatar = localStorage.getItem('avatarIndex');
    if (savedAvatar) setAvatarIndex(parseInt(savedAvatar));
  }, []);

  const cycleAvatar = () => {
    const newIndex = (avatarIndex + 1) % avatarEmojis.length;
    setAvatarIndex(newIndex);
    localStorage.setItem('avatarIndex', newIndex.toString());
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-2">
          My Profile
        </h1>
      </motion.div>

      {/* Avatar & Name Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card bg-base-100 shadow-2xl w-full border-4 border-primary/30"
      >
        <div className="card-body items-center text-center">
          {/* Avatar */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={cycleAvatar}
            className="text-9xl cursor-pointer hover:drop-shadow-[0_0_20px_rgba(255,0,255,0.5)] transition-all"
          >
            {avatarEmojis[avatarIndex]}
          </motion.button>
          <p className="text-sm text-base-content/50">Click to change avatar</p>

          {/* Name */}
          <div className="mt-4 w-full max-w-xs">
            {isEditing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="input input-bordered input-lg text-center flex-1 text-2xl font-bold"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && saveName()}
                />
                <button onClick={saveName} className="btn btn-primary btn-lg">
                  <Save className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <h2 
                onClick={() => setIsEditing(true)}
                className="text-4xl font-black cursor-pointer hover:text-primary transition-colors"
              >
                {playerName} ✏️
              </h2>
            )}
          </div>

          {savedMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="alert alert-success mt-4"
            >
              <Sparkles className="w-5 h-5" />
              <span>Profile saved!</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <StatCard 
          icon={<Trophy className="w-8 h-8 text-yellow-400" />}
          label="Runner High Score"
          value={Math.floor(stats.runnerHighScore / 10)}
        />
        <StatCard 
          icon={<Star className="w-8 h-8 text-purple-400" />}
          label="Puzzles Solved"
          value={stats.puzzlesSolved}
        />
        <StatCard 
          icon={<Sparkles className="w-8 h-8 text-green-400" />}
          label="Memory Wins"
          value={stats.memoryWins}
        />
        <StatCard 
          icon={<User className="w-8 h-8 text-cyan-400" />}
          label="Drawings Saved"
          value={stats.drawingsSaved}
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="card bg-base-100 shadow-xl border border-primary/20"
    >
      <div className="card-body items-center text-center p-6">
        {icon}
        <p className="text-sm text-base-content/60 mt-2">{label}</p>
        <p className="text-3xl font-black">{value}</p>
      </div>
    </motion.div>
  );
}