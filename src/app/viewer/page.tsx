'use client';

import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, PresentationControls, useAnimations, Html, Environment, Stars, Cloud } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';
import { 
  Palette, Sparkles, Star, Heart, Crown, Ribbon, 
  Camera, Download, Save, ChevronLeft, ChevronRight,
  Zap, Mountain, Wind, Award, Shirt, PenTool, Eye
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
  { name: 'Rainbow', color: 'linear-gradient(90deg, red, orange, yellow, green, blue, purple)', category: 'fantasy' },
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
  { id: 'studio', name: 'Studio', icon: '📷' },
  { id: 'meadow', name: 'Meadow', icon: '🌾' },
  { id: 'sunset', name: 'Sunset', icon: '🌅' },
  { id: 'night', name: 'Starry Night', icon: '🌙' },
  { id: 'beach', name: 'Beach', icon: '🏖️' },
  { id: 'mountains', name: 'Mountains', icon: '🏔️' },
  { id: 'forest', name: 'Forest', icon: '🌲' },
  { id: 'rainbow', name: 'Rainbow', icon: '🌈' },
];

// ==================== 3D COMPONENTS ====================

function HorseModel({ scale = 0.02, color, isAnimating }: { scale?: number; color: string; isAnimating: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/horse.glb');
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      if (firstAction) {
        if (isAnimating) {
          firstAction.play();
        } else {
          firstAction.stop();
        }
      }
    }
  }, [actions, isAnimating]);
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(color),
          roughness: 0.4,
          metalness: 0.1
        });
      }
    });
  }, [scene, color]);
  
  useFrame((state) => {
    if (group.current && !isAnimating) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });
  
  return <primitive ref={group} object={scene} scale={scale} position={[0, -1, 0]} />;
}

function BackgroundEnvironment({ type }: { type: string }) {
  switch (type) {
    case 'night':
      return <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />;
    case 'sunset':
      return <Environment preset="sunset" />;
    case 'forest':
      return <Environment preset="forest" />;
    case 'meadow':
      return (
        <>
          <Environment preset="park" />
          <Cloud position={[-4, 5, -10]} speed={0.2} opacity={0.4} />
          <Cloud position={[4, 4, -8]} speed={0.1} opacity={0.3} />
        </>
      );
    default:
      return <Environment preset="city" />;
  }
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span className="text-sm text-base-content/60">Loading your horse...</span>
      </div>
    </Html>
  );
}

// Screenshot component
function Screenshot({ onCapture }: { onCapture: (dataUrl: string) => void }) {
  const { gl, scene, camera } = useThree();
  
  useEffect(() => {
    const captureHandler = () => {
      gl.render(scene, camera);
      const dataUrl = gl.domElement.toDataURL('image/png');
      onCapture(dataUrl);
    };
    
    window.addEventListener('capture-screenshot', captureHandler);
    return () => window.removeEventListener('capture-screenshot', captureHandler);
  }, [gl, scene, camera, onCapture]);
  
  return null;
}

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
            style={{ backgroundColor: c.color.includes('gradient') ? undefined : c.color, background: c.color.includes('gradient') ? c.color : undefined }}
            title={c.name}
          />
        ))}
      </div>
      {showCustom && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">Custom:</span>
          <input 
            type="color" 
            value={selected}
            onChange={(e) => onSelect(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-2 border-base-300"
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
        className="range range-sm"
        style={{ '--range-shdw': color } as React.CSSProperties}
      />
      <div className="flex justify-between text-xs text-base-content/50">
        <span>1</span>
        <span>10</span>
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
  const [background, setBackground] = useState('studio');
  
  // Stats
  const [speed, setSpeed] = useState(5);
  const [jumping, setJumping] = useState(5);
  const [stamina, setStamina] = useState(5);
  const [friendliness, setFriendliness] = useState(8);
  
  // UI state
  const [activeTab, setActiveTab] = useState('basics');
  const [isAnimating, setIsAnimating] = useState(true);
  const [saved, setSaved] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [savedHorses, setSavedHorses] = useState<any[]>([]);
  const [screenshot, setScreenshot] = useState<string | null>(null);

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

  const toggleAccessory = (id: string) => {
    setSelectedAccessories(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const saveHorse = () => {
    const horseData = {
      name: horseName,
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
      savedAt: new Date().toISOString(),
    };
    
    localStorage.setItem('myHorseData', JSON.stringify(horseData));
    localStorage.setItem('myHorseColor', coatColor); // For backward compatibility
    localStorage.setItem('myHorseName', horseName);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const saveToGallery = () => {
    const horseData = {
      id: Date.now(),
      name: horseName || 'Unnamed Horse',
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
      savedAt: new Date().toISOString(),
    };
    
    const newGallery = [...savedHorses, horseData];
    localStorage.setItem('horseGallery', JSON.stringify(newGallery));
    setSavedHorses(newGallery);
  };

  const loadFromGallery = (horse: any) => {
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

  const deleteFromGallery = (id: number) => {
    const newGallery = savedHorses.filter(h => h.id !== id);
    localStorage.setItem('horseGallery', JSON.stringify(newGallery));
    setSavedHorses(newGallery);
  };

  const takeScreenshot = () => {
    window.dispatchEvent(new Event('capture-screenshot'));
  };

  const handleScreenshot = useCallback((dataUrl: string) => {
    setScreenshot(dataUrl);
  }, []);

  const downloadScreenshot = () => {
    if (screenshot) {
      const link = document.createElement('a');
      link.download = `${horseName || 'my-horse'}.png`;
      link.href = screenshot;
      link.click();
      setScreenshot(null);
    }
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
          {/* Left Panel - 3D Viewer */}
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

            {/* 3D Canvas */}
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border-4 border-primary/30 shadow-2xl bg-gradient-to-br from-base-200 to-base-300">
              <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <Suspense fallback={<LoadingFallback />}>
                  <BackgroundEnvironment type={background} />
                  <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
                    <Stage environment={null} intensity={0.6}>
                      <HorseModel scale={0.02} color={coatColor} isAnimating={isAnimating} />
                    </Stage>
                  </PresentationControls>
                </Suspense>
                <OrbitControls enableZoom={true} enablePan={false} />
                <Screenshot onCapture={handleScreenshot} />
              </Canvas>

              {/* Overlay Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsAnimating(!isAnimating)}
                    className={`btn btn-sm ${isAnimating ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    {isAnimating ? '⏸️ Pause' : '▶️ Play'}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button onClick={takeScreenshot} className="btn btn-sm btn-secondary">
                    <Camera className="w-4 h-4" /> Photo
                  </button>
                </div>
              </div>
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

            {/* 2D Preview - How horse appears in Stable/Runner/PhotoBooth */}
            <div className="mt-4 p-4 bg-base-100 rounded-2xl shadow-lg border border-base-300">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4" /> 2D Preview
                <span className="text-xs text-base-content/60 font-normal">(How your horse looks in Stable, Runner, PhotoBooth)</span>
              </h3>
              <div className="flex justify-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                <HorseSVG 
                  horse={{
                    name: horseName || 'My Horse',
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
                  }}
                  size="lg"
                  animated={true}
                  showName={true}
                />
              </div>
              <p className="text-xs text-center text-base-content/50 mt-2">
                This is how your horse will appear throughout the app!
              </p>
            </div>
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
            <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-4 min-h-[400px]">
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
                        {maneStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setManeStyle(style.id)}
                            className={`p-3 rounded-xl text-center transition-all ${
                              maneStyle === style.id 
                                ? 'bg-secondary text-secondary-content shadow-lg' 
                                : 'bg-base-200 hover:bg-base-300'
                            }`}
                          >
                            <span className="text-2xl">{style.icon}</span>
                            <p className="text-xs mt-1">{style.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mane Color */}
                    <div>
                      <h3 className="font-bold mb-3">🌈 Mane Color</h3>
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
                            title={m.description}
                          >
                            <span className="text-lg">{m.icon}</span>
                            <p className="text-xs mt-1">{m.name}</p>
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
                    <div>
                      <h3 className="font-bold mb-3">🎠 Accessories</h3>
                      <p className="text-sm text-base-content/60 mb-3">Select multiple items!</p>
                      
                      {['tack', 'head', 'decoration', 'blanket', 'legs', 'fantasy'].map((category) => (
                        <div key={category} className="mb-4">
                          <p className="text-xs text-base-content/60 uppercase font-semibold mb-2">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {accessories.filter(a => a.category === category).map((acc) => (
                              <button
                                key={acc.id}
                                onClick={() => toggleAccessory(acc.id)}
                                className={`px-3 py-2 rounded-xl text-sm transition-all ${
                                  selectedAccessories.includes(acc.id)
                                    ? 'bg-primary text-primary-content shadow-lg' 
                                    : 'bg-base-200 hover:bg-base-300'
                                }`}
                              >
                                {acc.icon} {acc.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Accessory Color */}
                    <div>
                      <h3 className="font-bold mb-3">🎨 Gear Color</h3>
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
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-bold mb-3">💝 Personality</h3>
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
                            <p className="text-xs opacity-80">{p.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected personality details */}
                    {selectedPersonality && (
                      <div className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{selectedPersonality.emoji}</span>
                          <div>
                            <p className="font-bold">{horseName || 'Your horse'} is {selectedPersonality.name}!</p>
                            <p className="text-sm text-base-content/70">{selectedPersonality.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
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
                    <div>
                      <h3 className="font-bold mb-4">⚡ Horse Stats</h3>
                      <div className="space-y-5">
                        <StatSlider 
                          label="Speed" 
                          value={speed} 
                          onChange={setSpeed} 
                          icon="🏃" 
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
                          color="#ef4444"
                        />
                        <StatSlider 
                          label="Friendliness" 
                          value={friendliness} 
                          onChange={setFriendliness} 
                          icon="💕" 
                          color="#ec4899"
                        />
                      </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="p-4 bg-base-200 rounded-xl">
                      <p className="font-bold mb-2">📊 Stats Summary</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Points:</span>
                          <span className="font-bold">{speed + jumping + stamina + friendliness}/40</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Best Trait:</span>
                          <span className="font-bold">
                            {Math.max(speed, jumping, stamina, friendliness) === speed && '🏃 Speed'}
                            {Math.max(speed, jumping, stamina, friendliness) === jumping && '🦘 Jumping'}
                            {Math.max(speed, jumping, stamina, friendliness) === stamina && '💪 Stamina'}
                            {Math.max(speed, jumping, stamina, friendliness) === friendliness && '💕 Friendly'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-3">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveHorse}
                  className={`btn flex-1 ${saved ? 'btn-success' : 'btn-primary'} btn-lg`}
                >
                  {saved ? '✓ Saved!' : <><Save className="w-5 h-5" /> Save as Main Horse</>}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveToGallery}
                  className="btn btn-secondary btn-lg"
                >
                  <Award className="w-5 h-5" /> Add to Gallery
                </motion.button>
              </div>
              <p className="text-sm text-center text-base-content/60">
                Your main horse appears in Horse Runner, Stable, and Photo Booth!
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back Link */}
      <div className="text-center pb-8">
        <Link href="/" className="btn btn-ghost text-primary">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowGallery(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-base-100 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">📁 Horse Gallery</h2>
              {savedHorses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-6xl mb-4">🐴</p>
                  <p className="text-base-content/60">No horses saved yet!</p>
                  <p className="text-sm text-base-content/40">Create a horse and add it to your gallery.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedHorses.map((horse) => (
                    <div 
                      key={horse.id} 
                      className="p-4 bg-base-200 rounded-xl flex items-center gap-4"
                    >
                      <div 
                        className="w-16 h-16 rounded-full"
                        style={{ backgroundColor: horse.coatColor }}
                      />
                      <div className="flex-1">
                        <p className="font-bold">{horse.name}</p>
                        <p className="text-sm text-base-content/60">
                          {horseBreeds.find(b => b.id === horse.breed)?.name}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => loadFromGallery(horse)}
                          className="btn btn-sm btn-primary"
                        >
                          Load
                        </button>
                        <button 
                          onClick={() => deleteFromGallery(horse.id)}
                          className="btn btn-sm btn-ghost text-error"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button 
                onClick={() => setShowGallery(false)}
                className="btn btn-ghost w-full mt-4"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screenshot Modal */}
      <AnimatePresence>
        {screenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setScreenshot(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-base-100 rounded-3xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">📸 Horse Photo</h2>
              <img src={screenshot} alt="Horse screenshot" className="w-full rounded-xl mb-4" />
              <div className="flex gap-3">
                <button onClick={downloadScreenshot} className="btn btn-primary flex-1">
                  <Download className="w-4 h-4" /> Download
                </button>
                <button onClick={() => setScreenshot(null)} className="btn btn-ghost">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}