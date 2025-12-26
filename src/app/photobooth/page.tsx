'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useHorse } from '@/hooks/useHorse';
import { HorseSVG } from '@/components/HorseSVG';
import { getBreedInfo } from '@/lib/horse-data';

const backgrounds = [
  { id: 'sunset', name: 'Sunset Field', gradient: 'from-orange-400 via-pink-500 to-purple-600', emoji: '🌅' },
  { id: 'forest', name: 'Enchanted Forest', gradient: 'from-green-400 via-emerald-500 to-teal-600', emoji: '🌲' },
  { id: 'ocean', name: 'Ocean Breeze', gradient: 'from-cyan-400 via-blue-500 to-indigo-600', emoji: '🌊' },
  { id: 'night', name: 'Starry Night', gradient: 'from-slate-700 via-purple-800 to-slate-900', emoji: '🌙' },
  { id: 'rainbow', name: 'Rainbow Dreams', gradient: 'from-red-400 via-yellow-400 to-green-400', emoji: '🌈' },
  { id: 'winter', name: 'Winter Wonderland', gradient: 'from-blue-200 via-white to-blue-300', emoji: '❄️' },
  { id: 'meadow', name: 'Spring Meadow', gradient: 'from-lime-300 via-green-400 to-emerald-500', emoji: '🌻' },
  { id: 'castle', name: 'Royal Castle', gradient: 'from-purple-500 via-indigo-600 to-violet-700', emoji: '🏰' },
  { id: 'beach', name: 'Beach Paradise', gradient: 'from-yellow-300 via-amber-400 to-cyan-400', emoji: '🏖️' },
];

// Photo effects/poses
const poses = [
  { id: 'normal', name: 'Standing', emoji: '🐴' },
  { id: 'happy', name: 'Happy', emoji: '😊' },
  { id: 'silly', name: 'Silly', emoji: '🤪' },
  { id: 'sleepy', name: 'Sleepy', emoji: '😴' },
];

// Frame styles
const frames = [
  { id: 'none', name: 'No Frame', emoji: '🖼️' },
  { id: 'hearts', name: 'Hearts', emoji: '💕' },
  { id: 'stars', name: 'Stars', emoji: '⭐' },
  { id: 'flowers', name: 'Flowers', emoji: '🌸' },
  { id: 'sparkles', name: 'Sparkles', emoji: '✨' },
];

export default function PhotoBoothPage() {
  const { horse, isLoaded } = useHorse();
  const [background, setBackground] = useState(backgrounds[0]);
  const [pose, setPose] = useState(poses[0]);
  const [frame, setFrame] = useState(frames[0]);
  const [capturing, setCapturing] = useState(false);

  const breed = getBreedInfo(horse.breed);

  const takePhoto = () => {
    setCapturing(true);
    // Flash effect
    setTimeout(() => {
      setCapturing(false);
      // Increment photos taken counter
      const count = parseInt(localStorage.getItem('photosTaken') || '0') + 1;
      localStorage.setItem('photosTaken', count.toString());
    }, 500);
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Sparkles className="w-12 h-12 animate-pulse text-primary" />
        <p className="text-xl">Loading your horse...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 p-4">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        📸 {horse.name}&apos;s Photo Booth
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* Photo Preview */}
        <motion.div 
          className="flex-1"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div 
            className={`relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${background.gradient} ${capturing ? 'animate-pulse' : ''}`}
          >
            {/* Flash overlay */}
            {capturing && (
              <motion.div 
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                className="absolute inset-0 bg-white z-50"
              />
            )}

            {/* Frame decorations */}
            {frame.id === 'hearts' && (
              <div className="absolute inset-0 pointer-events-none z-20">
                <span className="absolute top-4 left-4 text-4xl">💕</span>
                <span className="absolute top-4 right-4 text-4xl">💕</span>
                <span className="absolute bottom-4 left-4 text-4xl">💕</span>
                <span className="absolute bottom-4 right-4 text-4xl">💕</span>
              </div>
            )}
            {frame.id === 'stars' && (
              <div className="absolute inset-0 pointer-events-none z-20">
                <span className="absolute top-4 left-4 text-4xl">⭐</span>
                <span className="absolute top-4 right-4 text-4xl">⭐</span>
                <span className="absolute bottom-4 left-4 text-4xl">⭐</span>
                <span className="absolute bottom-4 right-4 text-4xl">⭐</span>
                <span className="absolute top-1/2 left-2 text-3xl">✨</span>
                <span className="absolute top-1/2 right-2 text-3xl">✨</span>
              </div>
            )}
            {frame.id === 'flowers' && (
              <div className="absolute inset-0 pointer-events-none z-20">
                <span className="absolute top-4 left-4 text-4xl">🌸</span>
                <span className="absolute top-4 right-4 text-4xl">🌺</span>
                <span className="absolute bottom-4 left-4 text-4xl">🌷</span>
                <span className="absolute bottom-4 right-4 text-4xl">🌻</span>
              </div>
            )}
            {frame.id === 'sparkles' && (
              <div className="absolute inset-0 pointer-events-none z-20">
                <span className="absolute top-4 left-4 text-4xl animate-pulse">✨</span>
                <span className="absolute top-4 right-4 text-4xl animate-pulse">✨</span>
                <span className="absolute bottom-4 left-4 text-4xl animate-pulse">✨</span>
                <span className="absolute bottom-4 right-4 text-4xl animate-pulse">✨</span>
                <span className="absolute top-1/4 left-8 text-2xl animate-pulse">💫</span>
                <span className="absolute bottom-1/4 right-8 text-2xl animate-pulse">💫</span>
              </div>
            )}

            {/* Horse with all customizations */}
            <div className="absolute inset-0 flex items-center justify-center">
              <HorseSVG horse={horse} size="xl" animated={!capturing} showName={false} />
            </div>

            {/* Pose effects */}
            {pose.id === 'happy' && (
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-6xl animate-bounce">
                😊
              </div>
            )}
            {pose.id === 'silly' && (
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-6xl animate-spin">
                🤪
              </div>
            )}
            {pose.id === 'sleepy' && (
              <div className="absolute top-1/4 right-1/4 text-5xl">
                💤
              </div>
            )}

            {/* Horse name badge */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-30">
              <p className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <span>{breed.icon}</span> {horse.name}
              </p>
            </div>

            {/* Decorative sparkles */}
            <Sparkles className="absolute top-4 right-4 w-8 h-8 text-yellow-300 animate-pulse" />
            <Sparkles className="absolute bottom-16 left-4 w-6 h-6 text-white animate-pulse" />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={takePhoto}
              className="btn btn-primary btn-lg gap-2"
            >
              <Camera className="w-6 h-6" /> Take Photo
            </motion.button>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div 
          className="flex-1 space-y-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {/* Horse info card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">{breed.icon} Your Horse</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-bold text-lg">{horse.name}</p>
                  <p className="text-sm opacity-70">{breed.name}</p>
                  <p className="text-xs opacity-50 mt-1">{horse.accessories.length} accessories equipped</p>
                </div>
                <Link href="/viewer" className="btn btn-primary btn-sm">
                  Edit Horse
                </Link>
              </div>
            </div>
          </div>

          {/* Background selector */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">🌅 Background</h3>
              <div className="grid grid-cols-3 gap-2">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setBackground(bg)}
                    className={`btn btn-sm h-auto py-2 flex-col ${background.id === bg.id ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    <span className="text-2xl">{bg.emoji}</span>
                    <span className="text-xs">{bg.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pose selector */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">🎭 Pose</h3>
              <div className="grid grid-cols-4 gap-2">
                {poses.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPose(p)}
                    className={`btn btn-sm h-auto py-2 flex-col ${pose.id === p.id ? 'btn-secondary' : 'btn-ghost'}`}
                  >
                    <span className="text-2xl">{p.emoji}</span>
                    <span className="text-xs">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Frame selector */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">🖼️ Frame</h3>
              <div className="grid grid-cols-5 gap-2">
                {frames.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFrame(f)}
                    className={`btn btn-sm h-auto py-2 flex-col ${frame.id === f.id ? 'btn-accent' : 'btn-ghost'}`}
                  >
                    <span className="text-2xl">{f.emoji}</span>
                    <span className="text-xs">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Link href="/" className="btn btn-ghost btn-lg text-primary mt-4">
        ← Back to Home
      </Link>
    </div>
  );
}