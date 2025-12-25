'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Trash2, Sparkles, Star, Sticker, Palette } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ScrapbookPage {
  _id?: string;
  id?: string;
  title: string;
  content: string;
  stickers: string[];
  backgroundColor: string;
  createdAt?: number;
}

const stickerOptions = [
  '🐴', '🦄', '🌟', '✨', '🌈', '🌸', '🌻', '🦋',
  '💜', '💖', '💕', '💗', '🎀', '👑', '⭐', '🌟',
  '🍀', '🌺', '🌷', '🌹', '🦩', '🐾', '☀️', '🌙',
];

const backgroundColors = [
  '#fce7f3', '#f3e8ff', '#dbeafe', '#d1fae5', '#fef3c7', '#fee2e2',
  '#f0fdf4', '#fdf4ff', '#fff7ed', '#f5f5f4', '#fef2f2', '#eff6ff',
];

export default function ScrapbookPage() {
  const router = useRouter();
  const [pages, setPages] = useState<ScrapbookPage[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPage, setSelectedPage] = useState<ScrapbookPage | null>(null);
  const [newPage, setNewPage] = useState({ 
    title: '', 
    content: '', 
    stickers: [] as string[], 
    backgroundColor: '#fce7f3' 
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('piperAuthToken');
    if (!token) {
      router.push('/diary');
      return;
    }
    loadPages();
  }, [router]);

  const loadPages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sanity/fetch?type=scrapbook');
      const { data } = await res.json();
      if (data && data.length > 0) {
        setPages(data);
      } else {
        const saved = localStorage.getItem('piperScrapbook');
        if (saved) setPages(JSON.parse(saved));
      }
    } catch {
      const saved = localStorage.getItem('piperScrapbook');
      if (saved) setPages(JSON.parse(saved));
    }
    setLoading(false);
  };

  const toggleSticker = (sticker: string) => {
    if (newPage.stickers.includes(sticker)) {
      setNewPage({ ...newPage, stickers: newPage.stickers.filter(s => s !== sticker) });
    } else if (newPage.stickers.length < 8) {
      setNewPage({ ...newPage, stickers: [...newPage.stickers, sticker] });
    }
  };

  const createPage = async () => {
    if (!newPage.title.trim()) return;
    setSaving(true);

    const page: ScrapbookPage = {
      id: Date.now().toString(),
      ...newPage,
      createdAt: Date.now(),
    };

    try {
      await fetch('/api/sanity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'scrapbook', data: newPage }),
      });
    } catch {
      // Ignore
    }

    const updated = [page, ...pages];
    setPages(updated);
    localStorage.setItem('piperScrapbook', JSON.stringify(updated));

    setNewPage({ title: '', content: '', stickers: [], backgroundColor: '#fce7f3' });
    setShowCreate(false);
    setSaving(false);
  };

  const deletePage = async (page: ScrapbookPage) => {
    if (page._id) {
      try {
        await fetch('/api/sanity', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: page._id }),
        });
      } catch {
        // Ignore
      }
    }

    const updated = pages.filter(p => (p._id || p.id) !== (page._id || page.id));
    setPages(updated);
    localStorage.setItem('piperScrapbook', JSON.stringify(updated));
    setSelectedPage(null);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center gap-8 p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 flex items-center gap-4 justify-center">
          <BookOpen className="w-12 h-12 text-pink-400" />
          My Scrapbook
        </h1>
        <p className="text-lg text-accent mt-2">Create beautiful memory pages! ✨📝</p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowCreate(true)}
        className="btn btn-primary btn-lg gap-2"
      >
        <Plus className="w-5 h-5" /> Create New Page
      </motion.button>

      {/* Create Page Modal */}
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
              className="card bg-base-100 w-full max-w-3xl shadow-2xl border-4 border-pink-400/30 max-h-[90vh] overflow-y-auto"
            >
              <div className="card-body">
                <h2 className="card-title text-2xl text-pink-400">
                  <Sparkles className="w-6 h-6" /> Create Scrapbook Page
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left: Form */}
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">Page Title</label>
                      <input
                        type="text"
                        value={newPage.title}
                        onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                        placeholder="My Special Memory..."
                        className="input input-bordered input-primary"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">Write Your Story</label>
                      <textarea
                        value={newPage.content}
                        onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                        placeholder="Today I..."
                        className="textarea textarea-primary h-32"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label flex items-center gap-2">
                        <Palette className="w-4 h-4" /> Background Color
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {backgroundColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setNewPage({ ...newPage, backgroundColor: color })}
                            className={`w-8 h-8 rounded-full border-4 transition-all ${
                              newPage.backgroundColor === color ? 'border-gray-800 scale-110' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label flex items-center gap-2">
                        <Sticker className="w-4 h-4" /> Add Stickers (up to 8)
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {stickerOptions.map((sticker) => (
                          <button
                            key={sticker}
                            onClick={() => toggleSticker(sticker)}
                            className={`text-2xl p-1 rounded transition-all ${
                              newPage.stickers.includes(sticker) 
                                ? 'bg-primary/30 scale-110' 
                                : 'hover:bg-base-200'
                            }`}
                          >
                            {sticker}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Preview */}
                  <div>
                    <label className="label">Preview</label>
                    <div 
                      className="rounded-xl p-4 min-h-[300px] shadow-inner border-2 border-dashed border-gray-300"
                      style={{ backgroundColor: newPage.backgroundColor }}
                    >
                      <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                        {newPage.title || 'Your Title Here'}
                      </h3>
                      <p className="text-gray-700 text-sm mb-4">
                        {newPage.content || 'Your story will appear here...'}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {newPage.stickers.map((s, i) => (
                          <span key={i} className="text-3xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button onClick={() => setShowCreate(false)} className="btn btn-ghost">
                    Cancel
                  </button>
                  <button 
                    onClick={createPage} 
                    disabled={saving || !newPage.title.trim()}
                    className="btn btn-primary gap-2"
                  >
                    {saving ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>
                        <Star className="w-4 h-4" /> Save Page
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Page Modal */}
      <AnimatePresence>
        {selectedPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, rotateY: -15 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.9, rotateY: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg"
            >
              <div 
                className="rounded-2xl p-8 shadow-2xl min-h-[400px] relative"
                style={{ backgroundColor: selectedPage.backgroundColor }}
              >
                <button
                  onClick={() => deletePage(selectedPage)}
                  className="absolute top-2 right-2 btn btn-ghost btn-sm text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                  {selectedPage.title}
                </h2>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6 whitespace-pre-wrap">
                  {selectedPage.content}
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  {selectedPage.stickers.map((s, i) => (
                    <motion.span 
                      key={i} 
                      className="text-4xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1, type: 'spring' }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedPage(null)}
                  className="btn btn-sm btn-ghost mt-6 mx-auto block"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pages Grid */}
      <div className="w-full max-w-6xl">
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : pages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-24 h-24 text-pink-400/30 mx-auto mb-4" />
            <p className="text-xl text-base-content/60">No pages yet!</p>
            <p className="text-base-content/40">Create your first scrapbook page above ✨</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page, i) => (
              <motion.div
                key={page._id || page.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedPage(page)}
                className="cursor-pointer transform hover:scale-105 transition-transform"
              >
                <div 
                  className="rounded-xl p-6 shadow-lg min-h-[200px] border-2 border-white/50"
                  style={{ backgroundColor: page.backgroundColor }}
                >
                  <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1">
                    {page.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {page.content}
                  </p>
                  <div className="flex gap-1">
                    {page.stickers.slice(0, 4).map((s, j) => (
                      <span key={j} className="text-xl">{s}</span>
                    ))}
                    {page.stickers.length > 4 && (
                      <span className="text-sm text-gray-500">+{page.stickers.length - 4}</span>
                    )}
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
