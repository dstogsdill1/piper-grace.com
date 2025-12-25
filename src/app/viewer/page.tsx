'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, OrbitControls, Stars } from '@react-three/drei';
import { useRef, useState, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Save } from 'lucide-react';

function HorseModel({ color, ...props }: { color: string } & any) {
  const { scene, animations } = useGLTF('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Horse.glb');
  const ref = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer>(null);

  // Apply color to the mesh
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Clone material so we don't affect other instances if we had them
        mesh.material = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(color),
          roughness: 0.5,
          metalness: 0.1
        });
      }
    });
  }, [scene, color]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
    if (ref.current) {
        ref.current.rotation.y += 0.002;
    }
  });

  if (animations.length && !mixer.current && scene) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
  }

  return <primitive object={scene} ref={ref} {...props} />;
}

export default function ViewerPage() {
  const [horseColor, setHorseColor] = useState('#8B4513'); // Default brown
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    const savedColor = localStorage.getItem('myHorseColor');
    if (savedColor) setHorseColor(savedColor);
  }, []);

  const saveHorse = () => {
    localStorage.setItem('myHorseColor', horseColor);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const colors = [
    { name: 'Chestnut', hex: '#8B4513' },
    { name: 'Black Beauty', hex: '#1a1a1a' },
    { name: 'Snow White', hex: '#ffffff' },
    { name: 'Golden Palomino', hex: '#DAA520' },
    { name: 'Mystic Purple', hex: '#9333ea' },
    { name: 'Cyber Blue', hex: '#06b6d4' },
    { name: 'Neon Pink', hex: '#ec4899' },
    { name: 'Emerald', hex: '#10b981' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[85vh]">
      
      {/* Controls Panel */}
      <div className="w-full lg:w-1/3 bg-base-200/80 backdrop-blur-md p-6 rounded-3xl border border-primary/20 shadow-xl flex flex-col gap-6 z-20">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg mb-2">
            HORSE CREATOR
          </h1>
          <p className="text-base-content/70">Design your dream horse and use it in games!</p>
        </div>

        <div className="divider">COAT COLOR</div>
        
        <div className="grid grid-cols-2 gap-3">
          {colors.map((c) => (
            <button
              key={c.hex}
              onClick={() => setHorseColor(c.hex)}
              className={`btn h-14 relative overflow-hidden border-2 transition-all ${horseColor === c.hex ? 'border-white scale-105 shadow-lg ring-2 ring-primary' : 'border-transparent hover:scale-105'}`}
              style={{ backgroundColor: c.hex }}
            >
              <span className={`relative z-10 font-bold ${c.hex === '#ffffff' || c.hex === '#DAA520' ? 'text-black' : 'text-white'}`}>
                {c.name}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <button 
            onClick={saveHorse}
            className="btn btn-primary btn-lg w-full shadow-[0_0_20px_rgba(120,0,255,0.5)] border-t border-white/20"
          >
            <Save className="w-6 h-6 mr-2" />
            SAVE MY HORSE
          </button>
          {savedMessage && (
            <div className="alert alert-success shadow-lg animate-bounce">
              <span>Horse Saved! Use it in the Runner Game! 🐎</span>
            </div>
          )}
        </div>
      </div>

      {/* 3D Viewport */}
      <div className="w-full lg:w-2/3 h-full relative bg-black rounded-3xl overflow-hidden border-4 border-primary shadow-[0_0_50px_rgba(120,0,255,0.3)]">
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 45, position: [0, 0, 100] }}>
          <color attach="background" args={['#050505']} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <Suspense fallback={null}>
            <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
              <Stage environment="city" intensity={0.6} contactShadow={false}>
                <HorseModel scale={0.1} color={horseColor} />
              </Stage>
            </PresentationControls>
          </Suspense>
          
          <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={true} makeDefault />
        </Canvas>

        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs text-white/50 border border-white/10">
          Interactive 3D View
        </div>
      </div>
    </div>
  );
}