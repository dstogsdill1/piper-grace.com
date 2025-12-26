'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Save, Sparkles, Trophy, Star, Award, Camera, Settings, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
  const [playerName, setPlayerName] = useState('Piper');
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [profilePic, setProfilePic] = useState('/images/IMG_3533.JPG');
  const [stats, setStats] = useState({
    runnerHighScore: 0,
    puzzlesSolved: 0,
    memoryWins: 0,
    drawingsSaved: 0,
  });

  useEffect(() => {
    const savedName = localStorage.getItem('playerName');
    if (savedName) setPlayerName(savedName);
    
    const savedPic = localStorage.getItem('piper-profile-pic');
    if (savedPic) setProfilePic(savedPic);

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

  const totalXP = stats.runnerHighScore + (stats.puzzlesSolved * 25) + (stats.memoryWins * 30) + (stats.drawingsSaved * 20);
  const level = Math.floor(totalXP / 100) + 1;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">My Profile</h1>
        <p className="text-base-content/60">Manage your settings and view your progress</p>
      </motion.section>

      {/* Profile Card */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="ranch-card p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Picture */}
          <Link 
            href="/album" 
            className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg hover:scale-105 transition-all group"
          >
            <Image
              src={profilePic}
              alt={playerName}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </Link>

          {/* Name & Level */}
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="flex gap-2 justify-center md:justify-start">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="input input-bordered text-xl font-bold w-48"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && saveName()}
                />
                <button onClick={saveName} className="btn btn-primary">
                  <Save className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <h2 
                onClick={() => setIsEditing(true)}
                className="text-3xl font-bold cursor-pointer hover:text-primary transition-colors inline-flex items-center gap-2"
              >
                {playerName} <span className="text-base-content/40 text-lg">✏️</span>
              </h2>
            )}
            <div className="flex items-center gap-4 mt-2 justify-center md:justify-start">
              <span className="flex items-center gap-1 text-primary">
                <Star className="w-4 h-4" />
                Level {level}
              </span>
              <span className="text-base-content/60">{totalXP} XP</span>
            </div>
            
            {savedMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-emerald-500 mt-2"
              >
                ✓ Profile saved!
              </motion.p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Link href="/achievements" className="btn btn-ghost btn-circle">
              <Award className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">My Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="ranch-card p-5 text-center">
            <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{Math.floor(stats.runnerHighScore / 10)}</p>
            <p className="text-xs text-base-content/60">Runner High Score</p>
          </div>
          <div className="ranch-card p-5 text-center">
            <Star className="w-8 h-8 text-violet-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.puzzlesSolved}</p>
            <p className="text-xs text-base-content/60">Puzzles Solved</p>
          </div>
          <div className="ranch-card p-5 text-center">
            <Sparkles className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.memoryWins}</p>
            <p className="text-xs text-base-content/60">Memory Wins</p>
          </div>
          <div className="ranch-card p-5 text-center">
            <User className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.drawingsSaved}</p>
            <p className="text-xs text-base-content/60">Drawings Saved</p>
          </div>
        </div>
      </motion.section>

      {/* Quick Links */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="space-y-3">
          <Link href="/achievements" className="ranch-card hover-lift p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="font-medium">My Achievements</p>
                <p className="text-sm text-base-content/60">View your badges and progress</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-base-content/40" />
          </Link>
          
          <Link href="/album" className="ranch-card hover-lift p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-500/20">
                <Camera className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <p className="font-medium">Photo Album</p>
                <p className="text-sm text-base-content/60">Change your profile picture</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-base-content/40" />
          </Link>
          
          <Link href="/diary" className="ranch-card hover-lift p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-500/20">
                <Settings className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <p className="font-medium">My Diary</p>
                <p className="text-sm text-base-content/60">Your private journal</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-base-content/40" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}