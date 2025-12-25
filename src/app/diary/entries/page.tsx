'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookHeart, Plus, Trash2, Calendar, Heart, Star, Moon, Sun, Cloud, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DiaryEntry {
  id: string;
  date: string;
  mood: string;
  title: string;
  content: string;
  createdAt: number;
}

const moods = [
  { emoji: '😊', name: 'Happy', color: 'text-yellow-400' },
  { emoji: '🥰', name: 'Loved', color: 'text-pink-400' },
  { emoji: '😎', name: 'Cool', color: 'text-blue-400' },
  { emoji: '🤔', name: 'Thoughtful', color: 'text-purple-400' },
  { emoji: '😴', name: 'Sleepy', color: 'text-indigo-400' },
  { emoji: '🥳', name: 'Excited', color: 'text-orange-400' },
  { emoji: '😢', name: 'Sad', color: 'text-blue-300' },
  { emoji: '😤', name: 'Frustrated', color: 'text-red-400' },
];

export default function DiaryEntriesPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', content: '', mood: '😊' });
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('piperAuthToken');
    if (!token) {
      router.push('/diary');
      return;
    }

    // Load entries
    const saved = localStorage.getItem('piperDiaryEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, [router]);

  const saveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      mood: newEntry.mood,
      title: newEntry.title,
      content: newEntry.content,
      createdAt: Date.now(),
    };

    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('piperDiaryEntries', JSON.stringify(updated));
    setNewEntry({ title: '', content: '', mood: '😊' });
    setShowNew(false);
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('piperDiaryEntries', JSON.stringify(updated));
    setSelectedEntry(null);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center gap-8 p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 flex items-center gap-4 justify-center">
          <BookHeart className="w-12 h-12 text-pink-400" />
          My Diary
        </h1>
        <p className="text-lg text-accent mt-2">Your secret thoughts & memories ✨</p>
      </motion.div>

      {/* New Entry Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowNew(true)}
        className="btn btn-primary btn-lg gap-2"
      >
        <Plus className="w-5 h-5" /> Write New Entry
      </motion.button>

      {/* New Entry Modal */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setShowNew(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="card bg-base-100 w-full max-w-2xl shadow-2xl border-4 border-pink-400/30"
            >
              <div className="card-body">
                <h2 className="card-title text-2xl text-pink-400">
                  <Sparkles className="w-6 h-6" /> New Diary Entry
                </h2>

                {/* Mood Selector */}
                <div className="form-control">
                  <label className="label">How are you feeling?</label>
                  <div className="flex flex-wrap gap-2">
                    {moods.map((m) => (
                      <button
                        key={m.emoji}
                        onClick={() => setNewEntry({ ...newEntry, mood: m.emoji })}
                        className={`btn btn-circle text-2xl ${
                          newEntry.mood === m.emoji ? 'btn-primary' : 'btn-ghost'
                        }`}
                        title={m.name}
                      >
                        {m.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="form-control">
                  <label className="label">Title</label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    placeholder="Give your entry a title..."
                    className="input input-bordered input-primary"
                  />
                </div>

                {/* Content */}
                <div className="form-control">
                  <label className="label">Dear Diary...</label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    placeholder="Write your thoughts here..."
                    className="textarea textarea-primary h-48 text-lg"
                  />
                </div>

                <div className="card-actions justify-end mt-4">
                  <button onClick={() => setShowNew(false)} className="btn btn-ghost">
                    Cancel
                  </button>
                  <button onClick={saveEntry} className="btn btn-primary gap-2">
                    <Heart className="w-4 h-4" /> Save Entry
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Entry Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="card bg-base-100 w-full max-w-2xl shadow-2xl border-4 border-purple-400/30 max-h-[80vh] overflow-y-auto"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-4xl">{selectedEntry.mood}</span>
                    <h2 className="card-title text-2xl text-purple-400 mt-2">
                      {selectedEntry.title}
                    </h2>
                    <p className="text-sm text-base-content/60 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {selectedEntry.date}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteEntry(selectedEntry.id)}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="divider"></div>

                <p className="text-lg whitespace-pre-wrap leading-relaxed">
                  {selectedEntry.content}
                </p>

                <div className="card-actions justify-end mt-4">
                  <button onClick={() => setSelectedEntry(null)} className="btn btn-primary">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries List */}
      <div className="w-full max-w-4xl">
        {entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookHeart className="w-24 h-24 text-pink-400/30 mx-auto mb-4" />
            <p className="text-xl text-base-content/60">No entries yet!</p>
            <p className="text-base-content/40">Click "Write New Entry" to start your diary 💜</p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedEntry(entry)}
                className="card bg-base-100 border-2 border-pink-400/20 shadow-lg hover:shadow-pink-500/20 hover:border-pink-400/40 cursor-pointer transition-all"
              >
                <div className="card-body flex-row items-center gap-4">
                  <span className="text-4xl">{entry.mood}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-pink-300">{entry.title}</h3>
                    <p className="text-sm text-base-content/60">{entry.date}</p>
                    <p className="text-base-content/70 line-clamp-2 mt-1">
                      {entry.content}
                    </p>
                  </div>
                  <Star className="w-6 h-6 text-yellow-400/50" />
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
