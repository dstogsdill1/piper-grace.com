'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Star, Clock, CheckCircle, XCircle, Zap } from 'lucide-react';
import Link from 'next/link';

interface DailyChallenge {
  id: number;
  title: string;
  description: string;
  game: string;
  target: number;
  reward: string;
  icon: string;
}

const challenges: DailyChallenge[] = [
  { id: 1, title: 'Speed Runner', description: 'Score 500+ in Horse Runner', game: 'runner', target: 500, reward: '🌟 Gold Star', icon: '🏃' },
  { id: 2, title: 'Puzzle Pro', description: 'Complete 3 puzzles today', game: 'puzzle', target: 3, reward: '🏆 Trophy Badge', icon: '🧩' },
  { id: 3, title: 'Memory Master', description: 'Win 5 memory games', game: 'memory', target: 5, reward: '🧠 Brain Badge', icon: '🎮' },
  { id: 4, title: 'Caring Heart', description: 'Max all stable stats', game: 'stable', target: 100, reward: '❤️ Love Badge', icon: '🐴' },
  { id: 5, title: 'Art Star', description: 'Save 3 drawings', game: 'draw', target: 3, reward: '🎨 Artist Badge', icon: '🖌️' },
  { id: 6, title: 'Explorer', description: 'Visit all games today', game: 'all', target: 6, reward: '🗺️ Explorer Badge', icon: '🌍' },
  { id: 7, title: 'High Flyer', description: 'Score 1000+ in Runner', game: 'runner', target: 1000, reward: '🚀 Rocket Badge', icon: '✨' },
];

export default function ChallengesPage() {
  const [todayChallenge, setTodayChallenge] = useState<DailyChallenge | null>(null);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    // Get today's challenge based on date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const challengeIndex = dayOfYear % challenges.length;
    setTodayChallenge(challenges[challengeIndex]);

    // Load streak
    const savedStreak = localStorage.getItem('challengeStreak');
    const lastCompleted = localStorage.getItem('lastChallengeDate');
    const todayStr = today.toDateString();
    
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }

    if (lastCompleted === todayStr) {
      setCompleted(true);
    }

    // Load progress based on challenge type
    loadProgress(challenges[challengeIndex]);

    // Calculate time until reset
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadProgress = (challenge: DailyChallenge) => {
    let currentProgress = 0;
    switch(challenge.game) {
      case 'runner':
        currentProgress = parseInt(localStorage.getItem('runnerHighScore') || '0');
        break;
      case 'puzzle':
        currentProgress = parseInt(localStorage.getItem('puzzlesSolved') || '0');
        break;
      case 'memory':
        currentProgress = parseInt(localStorage.getItem('memoryWins') || '0');
        break;
      case 'draw':
        currentProgress = parseInt(localStorage.getItem('drawingsSaved') || '0');
        break;
      default:
        currentProgress = 0;
    }
    setProgress(currentProgress);
  };

  const completeChallenge = () => {
    if (!completed && progress >= (todayChallenge?.target || 0)) {
      setCompleted(true);
      const today = new Date().toDateString();
      localStorage.setItem('lastChallengeDate', today);
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('challengeStreak', newStreak.toString());
    }
  };

  useEffect(() => {
    if (todayChallenge && progress >= todayChallenge.target && !completed) {
      completeChallenge();
    }
  }, [progress, todayChallenge, completed]);

  if (!todayChallenge) return null;

  const progressPercent = Math.min((progress / todayChallenge.target) * 100, 100);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 p-4">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        📅 Daily Challenge
      </motion.h1>

      <div className="flex gap-4 flex-wrap justify-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="stat bg-base-100 rounded-xl shadow-xl border-2 border-orange-500/30"
        >
          <div className="stat-figure text-orange-500">
            <Zap className="w-8 h-8" />
          </div>
          <div className="stat-title">Current Streak</div>
          <div className="stat-value text-orange-500">{streak}</div>
          <div className="stat-desc">Days in a row</div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="stat bg-base-100 rounded-xl shadow-xl border-2 border-info/30"
        >
          <div className="stat-figure text-info">
            <Clock className="w-8 h-8" />
          </div>
          <div className="stat-title">Resets In</div>
          <div className="stat-value text-info text-2xl">{timeLeft}</div>
          <div className="stat-desc">New challenge tomorrow!</div>
        </motion.div>
      </div>

      <motion.div 
        className="card bg-base-100 shadow-2xl border-4 border-primary/30 w-full max-w-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="card-body items-center text-center">
          <div className="text-6xl mb-4">{todayChallenge.icon}</div>
          
          <h2 className="card-title text-3xl text-accent">
            {todayChallenge.title}
          </h2>
          
          <p className="text-lg text-base-content/70 mb-4">
            {todayChallenge.description}
          </p>

          <div className="w-full bg-base-300 rounded-full h-6 mb-4">
            <motion.div 
              className="bg-gradient-to-r from-primary to-secondary h-6 rounded-full flex items-center justify-center text-sm font-bold"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              {progressPercent >= 20 && `${progress}/${todayChallenge.target}`}
            </motion.div>
          </div>

          {completed ? (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <CheckCircle className="w-16 h-16 text-success" />
              <p className="text-2xl font-bold text-success">Challenge Complete!</p>
              <div className="badge badge-lg badge-accent gap-2 p-4 text-lg">
                <Trophy className="w-5 h-5" /> {todayChallenge.reward}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-base-content/60">Keep going! You're {progressPercent.toFixed(0)}% there!</p>
              <Link 
                href={`/${todayChallenge.game}`}
                className="btn btn-primary btn-lg gap-2"
              >
                <Star className="w-5 h-5" /> Play {todayChallenge.game.charAt(0).toUpperCase() + todayChallenge.game.slice(1)}
              </Link>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card bg-base-100 shadow-xl border-2 border-secondary/30 w-full max-w-2xl"
      >
        <div className="card-body">
          <h3 className="card-title text-secondary">
            <Calendar className="w-6 h-6" /> Upcoming Challenges
          </h3>
          <div className="grid gap-2 mt-4">
            {challenges.slice(0, 4).map((challenge, i) => (
              <motion.div 
                key={challenge.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-3 bg-base-200 rounded-lg"
              >
                <span className="text-2xl">{challenge.icon}</span>
                <div className="flex-1">
                  <p className="font-bold">{challenge.title}</p>
                  <p className="text-sm text-base-content/60">{challenge.description}</p>
                </div>
                <span className="badge badge-secondary">{challenge.reward}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <Link href="/" className="btn btn-ghost btn-lg mt-4">
        ← Back to Home
      </Link>
    </div>
  );
}