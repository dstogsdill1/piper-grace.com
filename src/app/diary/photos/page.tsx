'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Plus, Trash2, X, Upload, Camera, Heart, Download } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Photo {
  id: string;
  data: string; // base64
  caption: string;
  createdAt: number;
}

export default function DiaryPhotosPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('piperAuthToken');
    if (!token) {
      router.push('/diary');
      return;
    }

    // Load photos
    const saved = localStorage.getItem('piperPhotos');
    if (saved) {
      setPhotos(JSON.parse(saved));
    }
  }, [router]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB for localStorage)
    if (file.size > 2 * 1024 * 1024) {
      alert('Photo too large! Please choose a smaller image (under 2MB).');
      return;
    }

    setUploading(true);

    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      const photo: Photo = {
        id: Date.now().toString(),
        data: reader.result as string,
        caption: caption || 'My photo 💜',
        createdAt: Date.now(),
      };

      const updated = [photo, ...photos];
      setPhotos(updated);
      
      // Save to localStorage
      try {
        localStorage.setItem('piperPhotos', JSON.stringify(updated));
      } catch {
        alert('Storage full! Try deleting some old photos first.');
      }

      setCaption('');
      setUploading(false);
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const deletePhoto = (id: string) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    localStorage.setItem('piperPhotos', JSON.stringify(updated));
    setSelectedPhoto(null);
  };

  const downloadPhoto = (photo: Photo) => {
    const link = document.createElement('a');
    link.href = photo.data;
    link.download = `piper-photo-${photo.id}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center gap-8 p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 flex items-center gap-4 justify-center">
          <ImageIcon className="w-12 h-12 text-purple-400" />
          My Photos
        </h1>
        <p className="text-lg text-accent mt-2">Your private photo collection 📸</p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card bg-base-100 shadow-xl border-2 border-purple-400/30 w-full max-w-md"
      >
        <div className="card-body">
          <h3 className="card-title text-purple-400">
            <Upload className="w-5 h-5" /> Upload New Photo
          </h3>
          
          <div className="form-control">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption... (optional)"
              className="input input-bordered input-primary mb-4"
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn btn-primary btn-lg gap-2"
          >
            {uploading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Camera className="w-5 h-5" /> Choose Photo
              </>
            )}
          </button>

          <p className="text-xs text-base-content/50 text-center mt-2">
            Max 2MB per photo • Stored privately on this device
          </p>
        </div>
      </motion.div>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.data}
                alt={selectedPhoto.caption}
                className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl"
              />
              <p className="text-center text-white mt-4 text-xl">{selectedPhoto.caption}</p>
              
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => downloadPhoto(selectedPhoto)}
                  className="btn btn-circle btn-primary"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deletePhoto(selectedPhoto.id)}
                  className="btn btn-circle btn-error"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="btn btn-circle btn-ghost text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Grid */}
      <div className="w-full max-w-6xl">
        {photos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ImageIcon className="w-24 h-24 text-purple-400/30 mx-auto mb-4" />
            <p className="text-xl text-base-content/60">No photos yet!</p>
            <p className="text-base-content/40">Upload your first photo above 📸</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedPhoto(photo)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group border-4 border-transparent hover:border-purple-400 transition-all shadow-lg hover:shadow-purple-500/30"
              >
                <img
                  src={photo.data}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-sm line-clamp-2">{photo.caption}</p>
                </div>
                <Heart className="absolute top-2 right-2 w-6 h-6 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center text-base-content/50 text-sm">
        {photos.length} photo{photos.length !== 1 ? 's' : ''} saved
      </div>

      <Link href="/diary" className="btn btn-ghost btn-lg text-primary mt-4">
        ← Back to Private Space
      </Link>
    </div>
  );
}
