'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Download, Share2, Sparkles, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const backgrounds = [
  { id: 'sunset', name: 'Sunset Field', gradient: 'from-orange-400 via-pink-500 to-purple-600', emoji: '🌅' },
  { id: 'forest', name: 'Enchanted Forest', gradient: 'from-green-400 via-emerald-500 to-teal-600', emoji: '🌲' },
  { id: 'ocean', name: 'Ocean Breeze', gradient: 'from-cyan-400 via-blue-500 to-indigo-600', emoji: '🌊' },
  { id: 'night', name: 'Starry Night', gradient: 'from-slate-700 via-purple-800 to-slate-900', emoji: '🌙' },
  { id: 'rainbow', name: 'Rainbow Dreams', gradient: 'from-red-400 via-yellow-400 to-green-400', emoji: '🌈' },
  { id: 'winter', name: 'Winter Wonderland', gradient: 'from-blue-200 via-white to-blue-300', emoji: '❄️' },
];

const horseStyles = [
  { id: 'cute', name: 'Cute Pony', scale: 1, emoji: '🦄' },
  { id: 'majestic', name: 'Majestic Stallion', scale: 1.2, emoji: '🐎' },
  { id: 'baby', name: 'Baby Foal', scale: 0.8, emoji: '🐴' },
  { id: 'unicorn', name: 'Unicorn', scale: 1.1, emoji: '🦄✨' },
];

const accessories = [
  { id: 'none', name: 'None', emoji: '' },
  { id: 'crown', name: 'Crown', emoji: '👑' },
  { id: 'flowers', name: 'Flower Crown', emoji: '🌸' },
  { id: 'bow', name: 'Bow', emoji: '🎀' },
  { id: 'stars', name: 'Stars', emoji: '✨' },
  { id: 'hearts', name: 'Hearts', emoji: '💕' },
];

export default function PhotoBoothPage() {
  const [background, setBackground] = useState(backgrounds[0]);
  const [horseStyle, setHorseStyle] = useState(horseStyles[0]);
  const [accessory, setAccessory] = useState(accessories[0]);
  const [horseColor, setHorseColor] = useState('#c4a35a');
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    const savedColor = localStorage.getItem('myHorseColor');
    if (savedColor) setHorseColor(savedColor);
  }, []);

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

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 p-4">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        📸 Horse Photo Booth
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

            {/* Horse SVG */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `scale(${horseStyle.scale})` }}>
              <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 drop-shadow-2xl">
                <g transform="translate(50, 30)">
                  {/* Body */}
                  <ellipse cx="50" cy="100" rx="45" ry="35" fill={horseColor} />
                  {/* Neck */}
                  <path d="M 75 85 Q 95 60 85 30" stroke={horseColor} strokeWidth="25" fill="none" strokeLinecap="round" />
                  {/* Head */}
                  <ellipse cx="90" cy="25" rx="20" ry="15" fill={horseColor} />
                  {/* Ear */}
                  <polygon points="85,10 90,0 95,10" fill={horseColor} />
                  {/* Eye */}
                  <circle cx="95" cy="22" r="4" fill="#222" />
                  <circle cx="96" cy="21" r="1.5" fill="white" />
                  {/* Mane */}
                  <path d="M 82 10 Q 70 20 75 40 Q 68 50 72 65" stroke="#5a4a3a" strokeWidth="8" fill="none" strokeLinecap="round" />
                  {/* Legs */}
                  <rect x="20" y="125" width="10" height="40" rx="4" fill={horseColor} />
                  <rect x="35" y="130" width="10" height="35" rx="4" fill={horseColor} />
                  <rect x="55" y="130" width="10" height="35" rx="4" fill={horseColor} />
                  <rect x="70" y="125" width="10" height="40" rx="4" fill={horseColor} />
                  {/* Tail */}
                  <path d="M 5 95 Q -15 110 -10 135" stroke="#5a4a3a" strokeWidth="8" fill="none" strokeLinecap="round" />
                  {/* Unicorn horn if selected */}
                  {horseStyle.id === 'unicorn' && (
                    <polygon points="90,5 92,-15 88,-15" fill="#FFD700" stroke="#FFA500" strokeWidth="1" />
                  )}
                </g>
              </svg>
            </div>

            {/* Accessory */}
            {accessory.id !== 'none' && (
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-6xl">
                {accessory.emoji}
              </div>
            )}

            {/* Decorative sparkles */}
            <Sparkles className="absolute top-4 right-4 w-8 h-8 text-yellow-300 animate-pulse" />
            <Sparkles className="absolute bottom-4 left-4 w-6 h-6 text-white animate-pulse" />
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

          {/* Horse style selector */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">🐴 Horse Style</h3>
              <div className="grid grid-cols-2 gap-2">
                {horseStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setHorseStyle(style)}
                    className={`btn btn-sm h-auto py-2 flex-col ${horseStyle.id === style.id ? 'btn-secondary' : 'btn-ghost'}`}
                  >
                    <span className="text-2xl">{style.emoji}</span>
                    <span className="text-xs">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Accessory selector */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">✨ Accessories</h3>
              <div className="grid grid-cols-3 gap-2">
                {accessories.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setAccessory(acc)}
                    className={`btn btn-sm h-auto py-2 flex-col ${accessory.id === acc.id ? 'btn-accent' : 'btn-ghost'}`}
                  >
                    <span className="text-2xl">{acc.emoji || '❌'}</span>
                    <span className="text-xs">{acc.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Color picker */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">🎨 Horse Color</h3>
              <div className="flex items-center gap-4">
                <input 
                  type="color" 
                  value={horseColor}
                  onChange={(e) => setHorseColor(e.target.value)}
                  className="w-16 h-16 rounded-lg cursor-pointer"
                />
                <Link href="/viewer" className="btn btn-outline btn-sm">
                  Use Horse Creator Color
                </Link>
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