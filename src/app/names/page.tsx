'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Copy, Check, Heart, Bookmark } from 'lucide-react';
import Link from 'next/link';

const prefixes = [
  'Midnight', 'Shadow', 'Thunder', 'Storm', 'Silver', 'Golden', 'Crystal', 'Mystic',
  'Spirit', 'Dream', 'Star', 'Moon', 'Sun', 'Cloud', 'Wind', 'Fire', 'Ice', 'Frost',
  'Wild', 'Swift', 'Royal', 'Noble', 'Lucky', 'Magic', 'Velvet', 'Diamond', 'Ruby',
  'Sapphire', 'Emerald', 'Pearl', 'Onyx', 'Crimson', 'Azure', 'Violet', 'Amber',
  'Dusty', 'Copper', 'Bronze', 'Honey', 'Sugar', 'Cocoa', 'Pepper', 'Ginger'
];

const suffixes = [
  'Runner', 'Dancer', 'Spirit', 'Star', 'Dream', 'Wish', 'Heart', 'Soul',
  'Belle', 'Rose', 'Lily', 'Sky', 'Storm', 'Thunder', 'Lightning', 'Flame',
  'Blaze', 'Flash', 'Dash', 'Arrow', 'Knight', 'Prince', 'Princess', 'Queen',
  'King', 'Champion', 'Legend', 'Hero', 'Angel', 'Comet', 'Eclipse', 'Aurora',
  'Whisper', 'Shadow', 'Mystery', 'Wonder', 'Miracle', 'Treasure', 'Joy', 'Grace'
];

const titles = [
  '', '', '', 'of the Valley', 'of the Wind', 'of the Night', 'the Great',
  'the Swift', 'the Brave', 'the Wild', '', '', ''
];

export default function NamesPage() {
  const [name, setName] = useState('');
  const [savedNames, setSavedNames] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedHorseNames');
    if (saved) setSavedNames(JSON.parse(saved));
    generateName();
  }, []);

  const generateName = () => {
    setGenerating(true);
    setTimeout(() => {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const title = titles[Math.floor(Math.random() * titles.length)];
      const newName = title ? `${prefix} ${suffix} ${title}` : `${prefix} ${suffix}`;
      setName(newName);
      setGenerating(false);
    }, 300);
  };

  const copyName = () => {
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveName = () => {
    if (!savedNames.includes(name)) {
      const newSaved = [...savedNames, name];
      setSavedNames(newSaved);
      localStorage.setItem('savedHorseNames', JSON.stringify(newSaved));
    }
  };

  const removeSaved = (nameToRemove: string) => {
    const filtered = savedNames.filter(n => n !== nameToRemove);
    setSavedNames(filtered);
    localStorage.setItem('savedHorseNames', JSON.stringify(filtered));
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 p-4">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        🐎 Horse Name Generator
      </motion.h1>

      <motion.div 
        className="card bg-base-100 shadow-2xl border-4 border-primary/30 w-full max-w-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="card-body items-center text-center">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={name}
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.9 }}
              className="text-4xl font-bold text-accent py-8"
            >
              {generating ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                <>
                  <Sparkles className="inline w-8 h-8 mr-2 text-yellow-400" />
                  {name}
                  <Sparkles className="inline w-8 h-8 ml-2 text-yellow-400" />
                </>
              )}
            </motion.h2>
          </AnimatePresence>

          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateName}
              className="btn btn-primary btn-lg gap-2"
            >
              <RefreshCw className="w-5 h-5" /> Generate New
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyName}
              className="btn btn-secondary btn-lg gap-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveName}
              className="btn btn-accent btn-lg gap-2"
              disabled={savedNames.includes(name)}
            >
              <Bookmark className="w-5 h-5" />
              {savedNames.includes(name) ? 'Saved!' : 'Save'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {savedNames.length > 0 && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="card bg-base-100 shadow-xl border-2 border-secondary/30 w-full max-w-2xl"
        >
          <div className="card-body">
            <h3 className="card-title text-secondary">
              <Heart className="w-6 h-6 text-pink-500" /> Saved Names ({savedNames.length})
            </h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {savedNames.map((savedName, i) => (
                <motion.div 
                  key={savedName}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="badge badge-lg badge-primary gap-2 p-4"
                >
                  {savedName}
                  <button 
                    onClick={() => removeSaved(savedName)}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    ×
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <Link href="/" className="btn btn-ghost btn-lg text-primary mt-4">
        ← Back to Home
      </Link>
    </div>
  );
}