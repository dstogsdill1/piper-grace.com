'use client';

import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, PresentationControls, useAnimations, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';

const horseColors = [
  { name: 'Palomino', color: '#c4a35a' },
  { name: 'Black', color: '#1a1a1a' },
  { name: 'White', color: '#f5f5f5' },
  { name: 'Chestnut', color: '#8B4513' },
  { name: 'Bay', color: '#6B4423' },
  { name: 'Gray', color: '#808080' },
  { name: 'Pink', color: '#FF69B4' },
  { name: 'Purple', color: '#9370DB' },
];

function HorseModel({ scale = 0.02, color }: { scale?: number; color: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/horse.glb');
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    // Play the first animation if available
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      if (firstAction) {
        firstAction.play();
      }
    }
  }, [actions]);
  
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
  
  return <primitive ref={group} object={scene} scale={scale} position={[0, -1, 0]} />;
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span className="text-sm text-base-content/60">Loading horse...</span>
      </div>
    </Html>
  );
}

export default function ViewerPage() {
  const [horseColor, setHorseColor] = useState('#c4a35a');
  const [saved, setSaved] = useState(false);
  const [horseName, setHorseName] = useState('');

  useEffect(() => {
    const savedColor = localStorage.getItem('myHorseColor');
    const savedName = localStorage.getItem('myHorseName');
    if (savedColor) setHorseColor(savedColor);
    if (savedName) setHorseName(savedName);
  }, []);

  const saveHorse = () => {
    localStorage.setItem('myHorseColor', horseColor);
    localStorage.setItem('myHorseName', horseName);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center gap-6 p-4">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
      >
        🎨 Horse Creator
      </motion.h1>
      <p className="text-lg text-accent">Design your perfect horse & use it in all games!</p>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* 3D Viewer */}
        <motion.div 
          className="flex-1 h-[500px] rounded-3xl overflow-hidden border-4 border-primary/30 shadow-2xl bg-gradient-to-br from-base-200 to-base-300"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <Suspense fallback={<LoadingFallback />}>
              <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
                <Stage environment="city" intensity={0.6}>
                  <HorseModel scale={0.02} color={horseColor} />
                </Stage>
              </PresentationControls>
            </Suspense>
            <OrbitControls enableZoom={true} enablePan={false} />
          </Canvas>
        </motion.div>

        {/* Controls */}
        <motion.div 
          className="flex flex-col gap-6 lg:w-80"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {/* Horse Name */}
          <div className="card bg-base-100 shadow-xl border-2 border-secondary/30">
            <div className="card-body">
              <h3 className="card-title text-secondary">🏷️ Horse Name</h3>
              <input 
                type="text"
                placeholder="Name your horse..."
                value={horseName}
                onChange={(e) => setHorseName(e.target.value)}
                className="input input-bordered input-primary w-full"
              />
            </div>
          </div>

          {/* Color Picker */}
          <div className="card bg-base-100 shadow-xl border-2 border-primary/30">
            <div className="card-body">
              <h3 className="card-title text-primary">🎨 Choose Color</h3>
              <div className="grid grid-cols-4 gap-2">
                {horseColors.map((c) => (
                  <motion.button
                    key={c.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setHorseColor(c.color)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      horseColor === c.color ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.name}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm">Custom:</span>
                <input 
                  type="color" 
                  value={horseColor}
                  onChange={(e) => setHorseColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={saveHorse}
            className={`btn btn-lg ${saved ? 'btn-success' : 'btn-primary'} w-full`}
          >
            {saved ? '✓ Saved!' : '💾 Save My Horse'}
          </motion.button>

          <p className="text-sm text-center text-base-content/60">
            Your horse will appear in Runner, Stable, and Photo Booth!
          </p>
        </motion.div>
      </div>

      <Link href="/" className="btn btn-ghost btn-lg text-primary mt-4">
        ← Back to Home
      </Link>
    </div>
  );
}