'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Trash2, Sparkles, Star, Palette } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Horse {
  _id?: string;
  id?: string;
  name: string;
  color: string;
  personality: string;
  story: string;
  createdAt?: number;
}

const personalities = [
  { emoji: '😊', name: 'Friendly', desc: 'Loves meeting new friends!' },
  { emoji: '🦄', name: 'Magical', desc: 'Full of sparkles and wonder' },
  { emoji: '🏃', name: 'Speedy', desc: 'The fastest in the stable!' },
  { emoji: '😴', name: 'Sleepy', desc: 'Loves naps and cozy spots' },
  { emoji: '🥳', name: 'Playful', desc: 'Always ready for fun!' },
  { emoji: '🤔', name: 'Wise', desc: 'Smart and thoughtful' },
  { emoji: '💖', name: 'Cuddly', desc: 'Loves hugs and pets' },
  { emoji: '⭐', name: 'Star', desc: 'Born to shine!' },
];

const horseColors = [
  '#c4a35a', '#1a1a1a', '#f5f5f5', '#8B4513', 
  '#6B4423', '#808080', '#FF69B4', '#9370DB',
  '#FFD700', '#87CEEB', '#98FB98', '#DDA0DD'
];

export default function MyHorsesPage() {
  const router = useRouter();
  const [horses, setHorses] = useState<Horse[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newHorse, setNewHorse] = useState({ name: '', color: '#c4a35a', personality: 'Friendly', story: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('piperAuthToken');
    if (!token) {
      router.push('/diary');
      return;
    }
    loadHorses();
  }, [router]);

  const loadHorses = async () => {
    setLoading(true);
    try {
      // Try Sanity first
      const res = await fetch('/api/sanity/fetch?type=horses');
      const { data } = await res.json();
      if (data && data.length > 0) {
        setHorses(data);
      } else {
        // Fallback to localStorage
        const saved = localStorage.getItem('piperHorses');
        if (saved) setHorses(JSON.parse(saved));
      }
    } catch {
      // Fallback to localStorage
      const saved = localStorage.getItem('piperHorses');
      if (saved) setHorses(JSON.parse(saved));
    }
    setLoading(false);
  };

  const createHorse = async () => {
    if (!newHorse.name.trim()) return;
    setSaving(true);

    const horse: Horse = {
      id: Date.now().toString(),
      ...newHorse,
      createdAt: Date.now(),
    };

    try {
      // Try to save to Sanity
      await fetch('/api/sanity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'horse', data: newHorse }),
      });
    } catch {
      // Ignore Sanity errors
    }

    // Always save to localStorage as backup
    const updated = [horse, ...horses];
    setHorses(updated);
    localStorage.setItem('piperHorses', JSON.stringify(updated));

    setNewHorse({ name: '', color: '#c4a35a', personality: 'Friendly', story: '' });
    setShowCreate(false);
    setSaving(false);
  };

  const deleteHorse = async (horse: Horse) => {
    const id = horse._id || horse.id;
    
    if (horse._id) {
      try {
        await fetch('/api/sanity', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: horse._id }),
        });
      } catch {
        // Ignore
      }
    }

    const updated = horses.filter(h => (h._id || h.id) !== id);
    setHorses(updated);
    localStorage.setItem('piperHorses', JSON.stringify(updated));
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center gap-8 p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 flex items-center gap-4 justify-center">
          <Heart className="w-12 h-12 text-pink-400" />
          My Horses
        </h1>
        <p className="text-lg text-accent mt-2">Create and collect your dream horses! 🐴✨</p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowCreate(true)}
        className="btn btn-primary btn-lg gap-2"
      >
        <Plus className="w-5 h-5" /> Create New Horse
      </motion.button>

      {/* Create Horse Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreate(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="card bg-base-100 w-full max-w-2xl shadow-2xl border-4 border-pink-400/30 max-h-[90vh] overflow-y-auto"
            >
              <div className="card-body">
                <h2 className="card-title text-2xl text-pink-400">
                  <Sparkles className="w-6 h-6" /> Create Your Horse
                </h2>

                {/* Name */}
                <div className="form-control">
                  <label className="label">Horse Name</label>
                  <input
                    type="text"
                    value={newHorse.name}
                    onChange={(e) => setNewHorse({ ...newHorse, name: e.target.value })}
                    placeholder="What's your horse's name?"
                    className="input input-bordered input-primary"
                  />
                </div>

                {/* Color */}
                <div className="form-control">
                  <label className="label flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Coat Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {horseColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewHorse({ ...newHorse, color })}
                        className={`w-10 h-10 rounded-full border-4 transition-all ${
                          newHorse.color === color ? 'border-white scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <input
                      type="color"
                      value={newHorse.color}
                      onChange={(e) => setNewHorse({ ...newHorse, color: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Personality */}
                <div className="form-control">
                  <label className="label">Personality</label>
                  <div className="grid grid-cols-4 gap-2">
                    {personalities.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => setNewHorse({ ...newHorse, personality: p.name })}
                        className={`btn btn-sm h-auto py-2 flex-col ${
                          newHorse.personality === p.name ? 'btn-primary' : 'btn-ghost'
                        }`}
                      >
                        <span className="text-xl">{p.emoji}</span>
                        <span className="text-xs">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Story */}
                <div className="form-control">
                  <label className="label">Your Horse's Story</label>
                  <textarea
                    value={newHorse.story}
                    onChange={(e) => setNewHorse({ ...newHorse, story: e.target.value })}
                    placeholder="Tell us about your horse! Where did they come from? What do they love?"
                    className="textarea textarea-primary h-24"
                  />
                </div>

                {/* Horse Preview */}
                <div className="flex justify-center my-4">
                  <div className="relative">
                    <svg viewBox="0 0 200 200" className="w-32 h-32">
                      <g transform="translate(50, 30)">
                        <ellipse cx="50" cy="100" rx="45" ry="35" fill={newHorse.color} />
                        <path d="M 75 85 Q 95 60 85 30" stroke={newHorse.color} strokeWidth="25" fill="none" strokeLinecap="round" />
                        <ellipse cx="90" cy="25" rx="20" ry="15" fill={newHorse.color} />
                        <polygon points="85,10 90,0 95,10" fill={newHorse.color} />
                        <circle cx="95" cy="22" r="4" fill="#222" />
                        <circle cx="96" cy="21" r="1.5" fill="white" />
                        <path d="M 82 10 Q 70 20 75 40 Q 68 50 72 65" stroke="#5a4a3a" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <rect x="20" y="125" width="10" height="40" rx="4" fill={newHorse.color} />
                        <rect x="35" y="130" width="10" height="35" rx="4" fill={newHorse.color} />
                        <rect x="55" y="130" width="10" height="35" rx="4" fill={newHorse.color} />
                        <rect x="70" y="125" width="10" height="40" rx="4" fill={newHorse.color} />
                        <path d="M 5 95 Q -15 110 -10 135" stroke="#5a4a3a" strokeWidth="8" fill="none" strokeLinecap="round" />
                      </g>
                    </svg>
                    <span className="absolute -top-2 -right-2 text-2xl">
                      {personalities.find(p => p.name === newHorse.personality)?.emoji}
                    </span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button onClick={() => setShowCreate(false)} className="btn btn-ghost">
                    Cancel
                  </button>
                  <button 
                    onClick={createHorse} 
                    disabled={saving || !newHorse.name.trim()}
                    className="btn btn-primary gap-2"
                  >
                    {saving ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <Heart className="w-4 h-4" /> Create Horse
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Horses Grid */}
      <div className="w-full max-w-6xl">
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : horses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Heart className="w-24 h-24 text-pink-400/30 mx-auto mb-4" />
            <p className="text-xl text-base-content/60">No horses yet!</p>
            <p className="text-base-content/40">Create your first dream horse above 🐴✨</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {horses.map((horse, i) => (
              <motion.div
                key={horse._id || horse.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="card bg-base-100 shadow-xl border-2 border-pink-400/20 hover:border-pink-400/50 transition-all"
              >
                <div className="card-body">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                        style={{ backgroundColor: horse.color }}
                      />
                      <div>
                        <h3 className="card-title text-pink-300">{horse.name}</h3>
                        <p className="text-sm text-base-content/60 flex items-center gap-1">
                          {personalities.find(p => p.name === horse.personality)?.emoji} {horse.personality}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteHorse(horse)}
                      className="btn btn-ghost btn-sm text-error"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Horse Preview */}
                  <div className="flex justify-center my-4">
                    <svg viewBox="0 0 200 200" className="w-24 h-24">
                      <g transform="translate(50, 30)">
                        <ellipse cx="50" cy="100" rx="45" ry="35" fill={horse.color} />
                        <path d="M 75 85 Q 95 60 85 30" stroke={horse.color} strokeWidth="25" fill="none" strokeLinecap="round" />
                        <ellipse cx="90" cy="25" rx="20" ry="15" fill={horse.color} />
                        <polygon points="85,10 90,0 95,10" fill={horse.color} />
                        <circle cx="95" cy="22" r="4" fill="#222" />
                        <circle cx="96" cy="21" r="1.5" fill="white" />
                        <path d="M 82 10 Q 70 20 75 40 Q 68 50 72 65" stroke="#5a4a3a" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <rect x="20" y="125" width="10" height="40" rx="4" fill={horse.color} />
                        <rect x="70" y="125" width="10" height="40" rx="4" fill={horse.color} />
                        <path d="M 5 95 Q -15 110 -10 135" stroke="#5a4a3a" strokeWidth="8" fill="none" strokeLinecap="round" />
                      </g>
                    </svg>
                  </div>

                  {horse.story && (
                    <p className="text-sm text-base-content/70 italic line-clamp-3">
                      "{horse.story}"
                    </p>
                  )}

                  <div className="flex gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Link href="/diary" className="btn btn-ghost btn-lg mt-4">
        ← Back to Private Space
      </Link>
    </div>
  );
}
