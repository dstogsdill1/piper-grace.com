'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Sparkles, BookHeart, Image, ArrowRight, LogOut, Heart, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function DiaryLoginPage() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('piperAuthToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('piperAuthToken', data.token);
        setIsLoggedIn(true);
      } else {
        setError('Wrong password! Try again 💜');
      }
    } catch {
      setError('Something went wrong. Try again!');
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('piperAuthToken');
    setIsLoggedIn(false);
    setPassword('');
  };

  if (checking) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-2">
            💜 Piper's Private Space 💜
          </h1>
          <p className="text-lg text-accent">Welcome back, Piper Grace! ✨</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/diary/entries" className="card bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-400/30 shadow-xl hover:shadow-pink-500/20 transition-all hover:scale-105">
              <div className="card-body items-center text-center">
                <BookHeart className="w-16 h-16 text-pink-400" />
                <h2 className="card-title text-2xl text-pink-300">My Diary</h2>
                <p className="text-base-content/70">Write your thoughts, dreams & secrets</p>
                <div className="card-actions">
                  <span className="btn btn-primary btn-sm gap-2">
                    Open <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/diary/photos" className="card bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-400/30 shadow-xl hover:shadow-purple-500/20 transition-all hover:scale-105">
              <div className="card-body items-center text-center">
                <Image className="w-16 h-16 text-purple-400" />
                <h2 className="card-title text-2xl text-purple-300">My Photos</h2>
                <p className="text-base-content/70">Upload & save your favorite pics</p>
                <div className="card-actions">
                  <span className="btn btn-secondary btn-sm gap-2">
                    Open <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/diary/horses" className="card bg-gradient-to-br from-amber-500/20 to-pink-500/20 border-2 border-amber-400/30 shadow-xl hover:shadow-amber-500/20 transition-all hover:scale-105">
              <div className="card-body items-center text-center">
                <Heart className="w-16 h-16 text-amber-400" />
                <h2 className="card-title text-2xl text-amber-300">My Horses</h2>
                <p className="text-base-content/70">Create & collect your dream horses</p>
                <div className="card-actions">
                  <span className="btn btn-accent btn-sm gap-2">
                    Open <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/diary/scrapbook" className="card bg-gradient-to-br from-green-500/20 to-teal-500/20 border-2 border-green-400/30 shadow-xl hover:shadow-green-500/20 transition-all hover:scale-105">
              <div className="card-body items-center text-center">
                <BookOpen className="w-16 h-16 text-green-400" />
                <h2 className="card-title text-2xl text-green-300">Scrapbook</h2>
                <p className="text-base-content/70">Create beautiful memory pages</p>
                <div className="card-actions">
                  <span className="btn btn-success btn-sm gap-2">
                    Open <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="flex gap-4 mt-8">
          <Link href="/" className="btn btn-ghost">
            ← Back to Home
          </Link>
          <button onClick={handleLogout} className="btn btn-outline btn-error gap-2">
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <Lock className="w-16 h-16 text-pink-400 mx-auto mb-4" />
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          🔐 Piper's Private Space
        </h1>
        <p className="text-lg text-accent mt-2">Enter your secret password to continue</p>
      </motion.div>

      <motion.form
        onSubmit={handleLogin}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card bg-base-100 shadow-2xl border-4 border-pink-400/30 w-full max-w-md"
      >
        <div className="card-body gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <User className="w-4 h-4" /> Username
              </span>
            </label>
            <input
              type="text"
              value="Piper Grace"
              disabled
              className="input input-bordered bg-base-200"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Lock className="w-4 h-4" /> Password
              </span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your secret password..."
              className="input input-bordered input-primary"
              autoFocus
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="alert alert-error"
              >
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || !password}
            className="btn btn-primary btn-lg gap-2"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Enter My Space
              </>
            )}
          </button>
        </div>
      </motion.form>

      <Link href="/" className="btn btn-ghost">
        ← Back to Home
      </Link>
    </div>
  );
}
