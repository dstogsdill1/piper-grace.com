'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Palette, Sparkles, Heart, 
  Camera, Save, Zap, Mountain, Shirt, PenTool
} from 'lucide-react';
import { HorseSVG } from '@/components/HorseSVG';
import { HorseData } from '@/lib/horse-data';

// ==================== CONFIGURATION DATA ====================

const horseBreeds = [
  { id: 'quarter', name: 'Quarter Horse', description: 'Fast and agile', icon: '🐎' },
  { id: 'arabian', name: 'Arabian', description: 'Elegant and spirited', icon: '✨' },
  { id: 'paint', name: 'Paint Horse', description: 'Colorful and friendly', icon: '🎨' },
  { id: 'appaloosa', name: 'Appaloosa', description: 'Spotted beauty', icon: '🔵' },
  { id: 'mustang', name: 'Mustang', description: 'Wild and free', icon: '🌪️' },
  { id: 'clydesdale', name: 'Clydesdale', description: 'Big and gentle', icon: '💪' },
  { id: 'unicorn', name: 'Unicorn', description: 'Magical and rare!', icon: '🦄' },
  { id: 'pegasus', name: 'Pegasus', description: 'Winged wonder!', icon: '🪽' },
];

const coatColors = [
  { name: 'Palomino', color: '#c4a35a', category: 'natural' },
  { name: 'Black', color: '#1a1a1a', category: 'natural' },
  { name: 'White', color: '#f5f5f5', category: 'natural' },
  { name: 'Chestnut', color: '#8B4513', category: 'natural' },
  { name: 'Bay', color: '#6B4423', category: 'natural' },
  { name: 'Gray', color: '#808080', category: 'natural' },
  { name: 'Buckskin', color: '#C19A6B', category: 'natural' },
  { name: 'Dun', color: '#B8860B', category: 'natural' },
  { name: 'Pink', color: '#FF69B4', category: 'fantasy' },
  { name: 'Purple', color: '#9370DB', category: 'fantasy' },
  { name: 'Blue', color: '#4169E1', category: 'fantasy' },
  { name: 'Mint', color: '#98FB98', category: 'fantasy' },
  { name: 'Coral', color: '#FF7F50', category: 'fantasy' },
  { name: 'Lavender', color: '#E6E6FA', category: 'fantasy' },
  { name: 'Gold', color: '#FFD700', category: 'fantasy' },
  { name: 'Rainbow', color: 'rainbow', category: 'fantasy' },
];

const maneStyles = [
  { id: 'natural', name: 'Natural', icon: '🌿' },
  { id: 'braided', name: 'Braided', icon: '🎀' },
  { id: 'flowing', name: 'Flowing', icon: '💨' },
  { id: 'mohawk', name: 'Mohawk', icon: '⚡' },
  { id: 'curly', name: 'Curly', icon: '🌀' },
  { id: 'short', name: 'Short Crop', icon: '✂️' },
];

const maneColors = [
  { name: 'Natural', color: '#2c2c2c' },
  { name: 'Blonde', color: '#F5DEB3' },
  { name: 'White', color: '#FFFFFF' },
  { name: 'Red', color: '#8B0000' },
  { name: 'Pink', color: '#FF69B4' },
  { name: 'Purple', color: '#8B008B' },
  { name: 'Blue', color: '#0000CD' },
  { name: 'Rainbow', color: 'rainbow' },
];

const markings = [
  { id: 'none', name: 'None', icon: '⬜' },
  { id: 'star', name: 'Star', description: 'White mark on forehead', icon: '⭐' },
  { id: 'blaze', name: 'Blaze', description: 'White stripe on face', icon: '|' },
  { id: 'snip', name: 'Snip', description: 'White mark on nose', icon: '△' },
  { id: 'socks', name: 'Socks', description: 'White lower legs', icon: '🧦' },
  { id: 'stockings', name: 'Stockings', description: 'White legs', icon: '🦵' },
  { id: 'spots', name: 'Spots', description: 'Spotted pattern', icon: '🔵' },
  { id: 'patches', name: 'Patches', description: 'Large patches', icon: '🎨' },
];

const accessories = [
  { id: 'none', name: 'None', category: 'tack', icon: '⬜' },
  { id: 'western-saddle', name: 'Western Saddle', category: 'tack', icon: '🤠' },
  { id: 'english-saddle', name: 'English Saddle', category: 'tack', icon: '🏇' },
  { id: 'racing-saddle', name: 'Racing Saddle', category: 'tack', icon: '⚡' },
  { id: 'bareback-pad', name: 'Bareback Pad', category: 'tack', icon: '🛋️' },
  { id: 'bridle', name: 'Classic Bridle', category: 'head', icon: '🔗' },
  { id: 'halter', name: 'Halter', category: 'head', icon: '⭕' },
  { id: 'flower-crown', name: 'Flower Crown', category: 'decoration', icon: '🌸' },
  { id: 'ribbons', name: 'Mane Ribbons', category: 'decoration', icon: '🎀' },
  { id: 'blanket', name: 'Horse Blanket', category: 'blanket', icon: '🧥' },
  { id: 'show-blanket', name: 'Show Blanket', category: 'blanket', icon: '✨' },
  { id: 'leg-wraps', name: 'Leg Wraps', category: 'legs', icon: '🩹' },
  { id: 'bell-boots', name: 'Bell Boots', category: 'legs', icon: '🔔' },
  { id: 'wings', name: 'Magical Wings', category: 'fantasy', icon: '🪽' },
  { id: 'horn', name: 'Unicorn Horn', category: 'fantasy', icon: '🦄' },
  { id: 'crown', name: 'Royal Crown', category: 'fantasy', icon: '👑' },
];

const accessoryColors = [
  { name: 'Brown', color: '#8B4513' },
  { name: 'Black', color: '#1a1a1a' },
  { name: 'Pink', color: '#FF69B4' },
  { name: 'Purple', color: '#9370DB' },
  { name: 'Blue', color: '#4169E1' },
  { name: 'Red', color: '#DC143C' },
  { name: 'Gold', color: '#FFD700' },
  { name: 'Silver', color: '#C0C0C0' },
];

const personalities = [
  { id: 'brave', name: 'Brave', emoji: '🦁', description: 'Fearless and bold' },
  { id: 'gentle', name: 'Gentle', emoji: '🕊️', description: 'Kind and calm' },
  { id: 'playful', name: 'Playful', emoji: '🎉', description: 'Fun and energetic' },
  { id: 'loyal', name: 'Loyal', emoji: '💝', description: 'Best friend forever' },
  { id: 'wise', name: 'Wise', emoji: '🦉', description: 'Smart and thoughtful' },
  { id: 'adventurous', name: 'Adventurous', emoji: '🗺️', description: 'Loves exploring' },
  { id: 'mysterious', name: 'Mysterious', emoji: '🌙', description: 'Magical aura' },
  { id: 'silly', name: 'Silly', emoji: '🤪', description: 'Makes you laugh' },
];

const backgrounds = [
  { id: 'meadow', name: 'Meadow', icon: '🌾', gradient: 'from-lime-200 via-green-300 to-emerald-400' },
  { id: 'sunset', name: 'Sunset', icon: '🌅', gradient: 'from-orange-300 via-pink-400 to-purple-500' },
  { id: 'night', name: 'Starry Night', icon: '🌙', gradient: 'from-slate-800 via-purple-900 to-indigo-950' },
  { id: 'beach', name: 'Beach', icon: '🏖️', gradient: 'from-yellow-200 via-amber-300 to-cyan-400' },
  { id: 'mountains', name: 'Mountains', icon: '🏔️', gradient: 'from-blue-300 via-slate-400 to-gray-600' },
  { id: 'forest', name: 'Forest', icon: '🌲', gradient: 'from-green-400 via-emerald-500 to-teal-700' },
  { id: 'rainbow', name: 'Rainbow', icon: '🌈', gradient: 'from-red-400 via-yellow-300 to-blue-400' },
  { id: 'castle', name: 'Castle', icon: '🏰', gradient: 'from-purple-400 via-violet-500 to-indigo-600' },
];

// ==================== UI COMPONENTS ====================

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
        active 
          ? 'bg-primary text-primary-content shadow-lg' 
          : 'bg-base-200 text-base-content hover:bg-base-300'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
}

function ColorGrid({ colors, selected, onSelect, showCustom = true }: {
  colors: { name: string; color: string }[];
  selected: string;
  onSelect: (color: string) => void;
  showCustom?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {colors.map((c) => (
          <motion.button
            key={c.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(c.color)}
            className={`w-10 h-10 rounded-full border-3 transition-all ${
              selected === c.color ? 'border-white ring-2 ring-primary shadow-lg scale-110' : 'border-base-300'
            }`}
            style={{ 
              backgroundColor: c.color === 'rainbow' ? undefined : c.color, 
              background: c.color === 'rainbow' ? 'linear-gradient(90deg, red, orange, yellow, green, blue, purple)' : undefined 
            }}
            title={c.name}
          />
        ))}
      </div>
      {showCustom && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">Custom:</span>
          <input 
            type="color" 
            value={selected === 'rainbow' ? '#ff69b4' : selected}
            onChange={(e) => onSelect(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-2 border-base-300"
            title="Pick custom color"
          />
        </div>
      )}
    </div>
  );
}

function StatSlider({ label, value, onChange, icon, color }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  icon: string;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium flex items-center gap-1">
          <span>{icon}</span> {label}
        </span>
        <span className="text-sm font-bold" style={{ color }}>{value}</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="range range-sm range-primary"
        title={`${label}: ${value}`}
      />
      <div className="flex justify-between text-xs text-base-content/50">
        <span>1</span>
        <span>10</span>
      </div>
    </div>
  );
}

// Background component with animations
function AnimatedBackground({ type, children }: { type: string; children: React.ReactNode }) {
  const bg = backgrounds.find(b => b.id === type) || backgrounds[0];
  
  return (
    <div className={`relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br ${bg.gradient}`}>
      {/* Animated elements based on background type */}
      {type === 'night' && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 60}%`,
                  opacity: Math.random() * 0.8 + 0.2
                }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: Math.random() * 3 + 1 }}
              />
            ))}
          </div>
          <motion.div 
            className="absolute top-8 right-12 text-6xl"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            🌙
          </motion.div>
        </>
      )}
      
      {type === 'meadow' && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-green-600/50" />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{ 
                left: `${i * 12 + 5}%`, 
                bottom: '10px'
              }}
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
            >
              🌸
            </motion.div>
          ))}
          <motion.div 
            className="absolute top-8 right-8 text-5xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            ☀️
          </motion.div>
        </>
      )}
      
      {type === 'sunset' && (
        <>
          <motion.div 
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-8xl"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            🌅
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-900/40 to-transparent" />
        </>
      )}
      
      {type === 'beach' && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-amber-300/60" />
          <motion.div
            className="absolute bottom-12 left-0 right-0 h-8 bg-cyan-400/40"
            animate={{ x: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <div className="absolute bottom-4 left-8 text-4xl">🐚</div>
          <div className="absolute bottom-4 right-12 text-4xl">🦀</div>
        </>
      )}
      
      {type === 'forest' && (
        <>
          <div className="absolute bottom-0 left-0 text-6xl">🌲</div>
          <div className="absolute bottom-0 left-16 text-8xl">🌲</div>
          <div className="absolute bottom-0 right-16 text-8xl">🌲</div>
          <div className="absolute bottom-0 right-0 text-6xl">🌲</div>
          <motion.div
            className="absolute top-12 left-1/4 text-2xl"
            animate={{ x: [0, 100, 200], y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 8 }}
          >
            🦋
          </motion.div>
        </>
      )}
      
      {type === 'mountains' && (
        <>
          <div className="absolute bottom-0 left-0 right-0 text-center">
            <span className="text-8xl">🏔️</span>
            <span className="text-6xl">⛰️</span>
            <span className="text-8xl">🏔️</span>
          </div>
          <motion.div
            className="absolute top-8 left-8 text-4xl"
            animate={{ x: [0, 200], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 15 }}
          >
            ☁️
          </motion.div>
        </>
      )}
      
      {type === 'rainbow' && (
        <>
          <motion.div
            className="absolute top-4 left-1/4 right-1/4 text-center text-6xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            🌈
          </motion.div>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{ 
                left: `${20 + i * 15}%`, 
                top: `${30 + Math.random() * 20}%`
              }}
              animate={{ y: [0, -15, 0], rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.5 }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}
      
      {type === 'castle' && (
        <>
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-8xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            🏰
          </motion.div>
          <motion.div
            className="absolute top-8 left-8 text-4xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute top-12 right-8 text-4xl"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ✨
          </motion.div>
        </>
      )}
      
      {/* Horse container */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// ==================== MAIN PAGE COMPONENT ====================

export default function ViewerPage() {
  // Horse customization state
  const [horseName, setHorseName] = useState('');
  const [breed, setBreed] = useState('quarter');
  const [coatColor, setCoatColor] = useState('#c4a35a');
  const [maneStyle, setManeStyle] = useState('natural');
  const [maneColor, setManeColor] = useState('#2c2c2c');
  const [marking, setMarking] = useState('none');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [accessoryColor, setAccessoryColor] = useState('#8B4513');
  const [personality, setPersonality] = useState('playful');
  const [background, setBackground] = useState('meadow');
  
  // Stats
  const [speed, setSpeed] = useState(5);
  const [jumping, setJumping] = useState(5);
  const [stamina, setStamina] = useState(5);
  const [friendliness, setFriendliness] = useState(8);
  
  // UI state
  const [activeTab, setActiveTab] = useState('basics');
  const [saved, setSaved] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [savedHorses, setSavedHorses] = useState<HorseData[]>([]);

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem('myHorseData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setHorseName(data.name || '');
      setCoatColor(data.coatColor || '#c4a35a');
      setBreed(data.breed || 'quarter');
      setManeStyle(data.maneStyle || 'natural');
      setManeColor(data.maneColor || '#2c2c2c');
      setMarking(data.marking || 'none');
      setSelectedAccessories(data.accessories || []);
      setAccessoryColor(data.accessoryColor || '#8B4513');
      setPersonality(data.personality || 'playful');
      setSpeed(data.speed || 5);
      setJumping(data.jumping || 5);
      setStamina(data.stamina || 5);
      setFriendliness(data.friendliness || 8);
    }
    
    const gallery = localStorage.getItem('horseGallery');
    if (gallery) {
      setSavedHorses(JSON.parse(gallery));
    }
  }, []);

  // Auto-add horn for unicorn, wings for pegasus
  useEffect(() => {
    if (breed === 'unicorn' && !selectedAccessories.includes('horn')) {
      setSelectedAccessories(prev => [...prev.filter(a => a !== 'wings'), 'horn']);
    } else if (breed === 'pegasus' && !selectedAccessories.includes('wings')) {
      setSelectedAccessories(prev => [...prev.filter(a => a !== 'horn'), 'wings']);
    }
  }, [breed]);

  const toggleAccessory = (id: string) => {
    if (id === 'none') {
      setSelectedAccessories([]);
      return;
    }
    setSelectedAccessories(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const currentHorseData: HorseData = {
    name: horseName || 'Spirit',
    breed,
    coatColor,
    maneStyle,
    maneColor,
    marking,
    accessories: selectedAccessories,
    accessoryColor,
    personality,
    speed,
    jumping,
    stamina,
    friendliness,
  };

  const saveHorse = () => {
    localStorage.setItem('myHorseData', JSON.stringify(currentHorseData));
    localStorage.setItem('myHorseColor', coatColor);
    localStorage.setItem('myHorseName', horseName);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const saveToGallery = () => {
    const horseWithId = {
      ...currentHorseData,
      savedAt: new Date().toISOString(),
    };
    
    const newGallery = [...savedHorses, horseWithId];
    localStorage.setItem('horseGallery', JSON.stringify(newGallery));
    setSavedHorses(newGallery);
  };

  const loadFromGallery = (horse: HorseData) => {
    setHorseName(horse.name);
    setBreed(horse.breed);
    setCoatColor(horse.coatColor);
    setManeStyle(horse.maneStyle);
    setManeColor(horse.maneColor);
    setMarking(horse.marking);
    setSelectedAccessories(horse.accessories || []);
    setAccessoryColor(horse.accessoryColor);
    setPersonality(horse.personality);
    setSpeed(horse.speed);
    setJumping(horse.jumping);
    setStamina(horse.stamina);
    setFriendliness(horse.friendliness);
    setShowGallery(false);
  };

  const deleteFromGallery = (index: number) => {
    const newGallery = savedHorses.filter((_, i) => i !== index);
    localStorage.setItem('horseGallery', JSON.stringify(newGallery));
    setSavedHorses(newGallery);
  };

  const randomizeHorse = () => {
    const randomColor = coatColors[Math.floor(Math.random() * coatColors.length)];
    const randomBreed = horseBreeds[Math.floor(Math.random() * horseBreeds.length)];
    const randomManeStyle = maneStyles[Math.floor(Math.random() * maneStyles.length)];
    const randomManeColor = maneColors[Math.floor(Math.random() * maneColors.length)];
    const randomPersonality = personalities[Math.floor(Math.random() * personalities.length)];
    const randomMarking = markings[Math.floor(Math.random() * markings.length)];
    
    setCoatColor(randomColor.color);
    setBreed(randomBreed.id);
    setManeStyle(randomManeStyle.id);
    setManeColor(randomManeColor.color);
    setPersonality(randomPersonality.id);
    setMarking(randomMarking.id);
    setSpeed(Math.floor(Math.random() * 10) + 1);
    setJumping(Math.floor(Math.random() * 10) + 1);
    setStamina(Math.floor(Math.random() * 10) + 1);
    setFriendliness(Math.floor(Math.random() * 10) + 1);
  };

  const selectedBreed = horseBreeds.find(b => b.id === breed);
  const selectedPersonality = personalities.find(p => p.id === personality);

  const tabs = [
    { id: 'basics', icon: <Palette className="w-5 h-5" />, label: 'Basics' },
    { id: 'style', icon: <Sparkles className="w-5 h-5" />, label: 'Style' },
    { id: 'gear', icon: <Shirt className="w-5 h-5" />, label: 'Gear' },
    { id: 'personality', icon: <Heart className="w-5 h-5" />, label: 'Traits' },
    { id: 'stats', icon: <Zap className="w-5 h-5" />, label: 'Stats' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Header */}
      <div className="text-center py-6">
        <motion.h1 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent"
        >
          🐴 Horse Creator Studio
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base-content/70 mt-2"
        >
          Design your dream horse with endless customization options!
        </motion.p>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Panel - Horse Display */}
          <motion.div 
            className="xl:flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Horse Info Card */}
            <div className="mb-4 p-4 bg-base-100 rounded-2xl shadow-lg border border-base-300">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedBreed?.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold">{horseName || 'Your Horse'}</h2>
                    <p className="text-sm text-base-content/60">{selectedBreed?.name} • {selectedPersonality?.emoji} {selectedPersonality?.name}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={randomizeHorse}
                    className="btn btn-sm btn-outline btn-secondary"
                  >
                    🎲 Randomize
                  </button>
                  <button 
                    onClick={() => setShowGallery(true)}
                    className="btn btn-sm btn-outline btn-accent"
                  >
                    📁 Gallery ({savedHorses.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Main Horse Display with Animated Background */}
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border-4 border-primary/30 shadow-2xl">
              <AnimatedBackground type={background}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <HorseSVG 
                    horse={currentHorseData}
                    size="xl"
                    animated={true}
                    showName={true}
                  />
                </motion.div>
              </AnimatedBackground>
            </div>

            {/* Background Selection */}
            <div className="mt-4 p-4 bg-base-100 rounded-2xl shadow-lg border border-base-300">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Mountain className="w-4 h-4" /> Background Scene
              </h3>
              <div className="flex flex-wrap gap-2">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setBackground(bg.id)}
                    className={`btn btn-sm ${background === bg.id ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    {bg.icon} {bg.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Actions */}
            <div className="mt-4 flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={saveHorse}
                className={`btn btn-primary flex-1 ${saved ? 'btn-success' : ''}`}
              >
                <Save className="w-4 h-4" />
                {saved ? '✓ Saved!' : 'Save as Main Horse'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={saveToGallery}
                className="btn btn-secondary"
              >
                <Camera className="w-4 h-4" /> Add to Gallery
              </motion.button>
            </div>
            <p className="text-center text-sm text-base-content/60 mt-2">
              Your main horse appears in Horse Runner, Stable, and Photo Booth!
            </p>
          </motion.div>

          {/* Right Panel - Customization */}
          <motion.div 
            className="xl:w-[450px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Name Input */}
            <div className="mb-4 p-4 bg-base-100 rounded-2xl shadow-lg border border-base-300">
              <label className="font-bold flex items-center gap-2 mb-2">
                <PenTool className="w-4 h-4" /> Horse Name
              </label>
              <input 
                type="text"
                placeholder="Give your horse a special name..."
                value={horseName}
                onChange={(e) => setHorseName(e.target.value)}
                className="input input-bordered input-primary w-full"
                maxLength={30}
              />
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  icon={tab.icon}
                  label={tab.label}
                />
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-4 min-h-[400px] overflow-y-auto max-h-[600px]">
              <AnimatePresence mode="wait">
                {/* Basics Tab */}
                {activeTab === 'basics' && (
                  <motion.div
                    key="basics"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Breed Selection */}
                    <div>
                      <h3 className="font-bold mb-3">🐎 Breed</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {horseBreeds.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => setBreed(b.id)}
                            className={`p-3 rounded-xl text-left transition-all ${
                              breed === b.id 
                                ? 'bg-primary text-primary-content shadow-lg' 
                                : 'bg-base-200 hover:bg-base-300'
                            }`}
                          >
                            <span className="text-xl">{b.icon}</span>
                            <p className="font-medium text-sm">{b.name}</p>
                            <p className="text-xs opacity-70">{b.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Coat Color */}
                    <div>
                      <h3 className="font-bold mb-3">🎨 Coat Color</h3>
                      <div className="space-y-3">
                        <p className="text-xs text-base-content/60 uppercase font-semibold">Natural Colors</p>
                        <ColorGrid 
                          colors={coatColors.filter(c => c.category === 'natural')} 
                          selected={coatColor} 
                          onSelect={setCoatColor}
                          showCustom={false}
                        />
                        <p className="text-xs text-base-content/60 uppercase font-semibold">Fantasy Colors</p>
                        <ColorGrid 
                          colors={coatColors.filter(c => c.category === 'fantasy')} 
                          selected={coatColor} 
                          onSelect={setCoatColor}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Style Tab */}
                {activeTab === 'style' && (
                  <motion.div
                    key="style"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Mane Style */}
                    <div>
                      <h3 className="font-bold mb-3">💇 Mane Style</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {maneStyles.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setManeStyle(m.id)}
                            className={`p-3 rounded-xl text-center transition-all ${
                              maneStyle === m.id 
                                ? 'bg-secondary text-secondary-content shadow-lg' 
                                : 'bg-base-200 hover:bg-base-300'
                            }`}
                          >
                            <span className="text-2xl">{m.icon}</span>
                            <p className="text-xs font-medium mt-1">{m.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mane Color */}
                    <div>
                      <h3 className="font-bold mb-3">🎨 Mane Color</h3>
                      <ColorGrid 
                        colors={maneColors} 
                        selected={maneColor} 
                        onSelect={setManeColor}
                      />
                    </div>

                    {/* Markings */}
                    <div>
                      <h3 className="font-bold mb-3">✨ Markings</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {markings.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setMarking(m.id)}
                            className={`p-2 rounded-xl text-center transition-all ${
                              marking === m.id 
                                ? 'bg-accent text-accent-content shadow-lg' 
                                : 'bg-base-200 hover:bg-base-300'
                            }`}
                          >
                            <span className="text-xl">{m.icon}</span>
                            <p className="text-xs font-medium mt-1">{m.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Gear Tab */}
                {activeTab === 'gear' && (
                  <motion.div
                    key="gear"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Accessories */}
                    <div>
                      <h3 className="font-bold mb-3">🎒 Accessories</h3>
                      <p className="text-xs text-base-content/60 mb-3">Select multiple accessories!</p>
                      <div className="grid grid-cols-3 gap-2">
                        {accessories.map((a) => (
                          <button
                            key={a.id}
                            onClick={() => toggleAccessory(a.id)}
                            className={`p-2 rounded-xl text-center transition-all ${
                              selectedAccessories.includes(a.id) || (a.id === 'none' && selectedAccessories.length === 0)
                                ? 'bg-primary text-primary-content shadow-lg ring-2 ring-primary ring-offset-2' 
                                : 'bg-base-200 hover:bg-base-300'
                            }`}
                          >
                            <span className="text-xl">{a.icon}</span>
                            <p className="text-xs font-medium mt-1">{a.name}</p>
                          </button>
                        ))}
                      </div>
                      <p className="text-sm text-primary mt-3">
                        Selected: {selectedAccessories.length === 0 ? 'None' : selectedAccessories.map(id => accessories.find(a => a.id === id)?.name).join(', ')}
                      </p>
                    </div>

                    {/* Accessory Color */}
                    <div>
                      <h3 className="font-bold mb-3">🎨 Accessory Color</h3>
                      <ColorGrid 
                        colors={accessoryColors} 
                        selected={accessoryColor} 
                        onSelect={setAccessoryColor}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Personality Tab */}
                {activeTab === 'personality' && (
                  <motion.div
                    key="personality"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <h3 className="font-bold mb-3">💖 Personality</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {personalities.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setPersonality(p.id)}
                          className={`p-4 rounded-xl text-left transition-all ${
                            personality === p.id 
                              ? 'bg-gradient-to-br from-primary to-secondary text-primary-content shadow-lg' 
                              : 'bg-base-200 hover:bg-base-300'
                          }`}
                        >
                          <span className="text-3xl">{p.emoji}</span>
                          <p className="font-bold mt-1">{p.name}</p>
                          <p className="text-xs opacity-70">{p.description}</p>
                        </button>
                      ))}
                    </div>
                    
                    {/* Selected personality display */}
                    <div className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                      <p className="text-center">
                        <span className="text-4xl">{selectedPersonality?.emoji}</span>
                      </p>
                      <p className="text-center font-bold text-lg mt-2">
                        {horseName || 'Your horse'} is {selectedPersonality?.name}!
                      </p>
                      <p className="text-center text-sm text-base-content/70">
                        {selectedPersonality?.description}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Stats Tab */}
                {activeTab === 'stats' && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <h3 className="font-bold mb-4">📊 Horse Stats</h3>
                    <StatSlider 
                      label="Speed" 
                      value={speed} 
                      onChange={setSpeed} 
                      icon="⚡" 
                      color="#f59e0b" 
                    />
                    <StatSlider 
                      label="Jumping" 
                      value={jumping} 
                      onChange={setJumping} 
                      icon="🦘" 
                      color="#10b981" 
                    />
                    <StatSlider 
                      label="Stamina" 
                      value={stamina} 
                      onChange={setStamina} 
                      icon="💪" 
                      color="#3b82f6" 
                    />
                    <StatSlider 
                      label="Friendliness" 
                      value={friendliness} 
                      onChange={setFriendliness} 
                      icon="💕" 
                      color="#ec4899" 
                    />
                    
                    {/* Stats summary */}
                    <div className="p-4 bg-base-200 rounded-xl mt-4">
                      <p className="text-sm text-center text-base-content/70">
                        Total Power: <span className="font-bold text-primary">{speed + jumping + stamina + friendliness}/40</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowGallery(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-base-100 rounded-3xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black">📁 Horse Gallery</h2>
                <button 
                  onClick={() => setShowGallery(false)}
                  className="btn btn-sm btn-ghost"
                >
                  ✕
                </button>
              </div>
              
              {savedHorses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-5xl mb-4">🐴</p>
                  <p className="text-base-content/60">No saved horses yet!</p>
                  <p className="text-sm text-base-content/40 mt-2">Create and save horses to see them here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {savedHorses.map((horse, index) => (
                    <div
                      key={index}
                      className="bg-base-200 rounded-xl p-4 cursor-pointer hover:bg-base-300 transition-all group"
                    >
                      <div className="flex justify-center mb-3">
                        <HorseSVG horse={horse} size="md" animated={false} />
                      </div>
                      <p className="font-bold text-center">{horse.name}</p>
                      <p className="text-xs text-center text-base-content/60">
                        {horseBreeds.find(b => b.id === horse.breed)?.name}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => loadFromGallery(horse)}
                          className="btn btn-sm btn-primary flex-1"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => deleteFromGallery(index)}
                          className="btn btn-sm btn-error btn-outline"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Home */}
      <div className="text-center pb-8">
        <Link href="/" className="btn btn-ghost btn-lg text-primary">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
