'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Star, X, ChevronLeft, ChevronRight, Sparkles, Camera } from 'lucide-react';

// All of Piper's photos
const photos = [
  { id: 1, src: '/images/IMG_3533.JPG', caption: '✨ My favorite!' },
  { id: 2, src: '/images/IMG_2655.jpg', caption: '🐴 Horse life' },
  { id: 3, src: '/images/IMG_3777.JPG', caption: '💕 Good times' },
  { id: 4, src: '/images/IMG_3814.jpg', caption: '🌟 Memories' },
  { id: 5, src: '/images/IMG_4274.JPG', caption: '😊 Fun day' },
  { id: 6, src: '/images/IMG_4910.jpeg', caption: '🎀 Love this' },
  { id: 7, src: '/images/IMG_6025.JPEG', caption: '💜 Beautiful' },
  { id: 8, src: '/images/IMG_9669.jpg', caption: '⭐ Amazing' },
  { id: 9, src: '/images/IMG_9802.jpeg', caption: '🦋 Pretty' },
  { id: 10, src: '/images/IMG_3163.JPEG', caption: '🌸 Sweet' },
  { id: 11, src: '/images/E97A8D6D-1EE7-481D-B8C6-706DB72AC009.JPEG', caption: '💖 Cute' },
  { id: 12, src: '/images/F86C440D-2F80-419E-B3DA-66EC60D8D6FC.JPG', caption: '🎉 Happy' },
  { id: 13, src: '/images/70076492137__D91E9AE1-A86A-418F-AC15-519CB2D40FCE.JPEG', caption: '💫 Special' },
];

export default function AlbumPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [profilePic, setProfilePic] = useState<string>('/images/IMG_3533.JPG');

  useEffect(() => {
    const saved = localStorage.getItem('piper-favorites');
    const savedProfile = localStorage.getItem('piper-profile-pic');
    if (saved) setFavorites(JSON.parse(saved));
    if (savedProfile) setProfilePic(savedProfile);
  }, []);

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id) 
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('piper-favorites', JSON.stringify(newFavorites));
  };

  const setAsProfilePic = (src: string) => {
    setProfilePic(src);
    localStorage.setItem('piper-profile-pic', src);
    alert('Profile picture updated! 🎉');
  };

  const currentIndex = selectedPhoto !== null ? photos.findIndex(p => p.id === selectedPhoto) : -1;

  const goNext = () => {
    if (currentIndex < photos.length - 1) {
      setSelectedPhoto(photos[currentIndex + 1].id);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setSelectedPhoto(photos[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link href="/" className="btn btn-ghost text-primary gap-2 mb-4">
          <ArrowLeft className="w-5 h-5" />
          ← Back Home
        </Link>
        
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <Camera className="w-10 h-10 text-pink-500" />
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
              Piper's Photo Album
            </h1>
            <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
          </motion.div>
          <p className="text-xl text-accent">Click any photo to view it big! 📸</p>
        </div>
      </div>

      {/* Current Profile Pic Display */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-center">
        <div className="bg-base-200 rounded-2xl p-4 flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
            <Image src={profilePic} alt="Profile" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm text-base-content/60">Current Profile Picture</p>
            <p className="font-bold text-primary">Tap any photo below to change it!</p>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <div className="aspect-square relative rounded-xl overflow-hidden border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,255,0.3)]">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-bold">{photo.caption}</p>
                </div>
              </div>
              
              {/* Favorite indicator */}
              {favorites.includes(photo.id) && (
                <div className="absolute top-2 right-2 bg-pink-500 rounded-full p-1">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              )}

              {/* Profile pic indicator */}
              {photo.src === profilePic && (
                <div className="absolute top-2 left-2 bg-yellow-500 rounded-full p-1">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 btn btn-circle btn-ghost text-white"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Nav buttons */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 btn btn-circle btn-primary"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {currentIndex < photos.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 btn btn-circle btn-primary"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] w-full"
            >
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
                <Image
                  src={photos.find(p => p.id === selectedPhoto)?.src || ''}
                  alt="Photo"
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Actions */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => toggleFavorite(selectedPhoto)}
                  className={`btn gap-2 ${favorites.includes(selectedPhoto) ? 'btn-secondary' : 'btn-outline'}`}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(selectedPhoto) ? 'fill-current' : ''}`} />
                  {favorites.includes(selectedPhoto) ? 'Favorited!' : 'Add to Favorites'}
                </button>
                <button
                  onClick={() => setAsProfilePic(photos.find(p => p.id === selectedPhoto)?.src || '')}
                  className="btn btn-primary gap-2"
                >
                  <Star className="w-5 h-5" />
                  Set as Profile Pic
                </button>
              </div>

              <p className="text-center text-white text-xl mt-4">
                {photos.find(p => p.id === selectedPhoto)?.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
