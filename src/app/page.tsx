'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Palette, Puzzle, Smile, Trophy, Heart, Box, Sparkles, Lock, Camera } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

export default function Home() {
  const [profilePic, setProfilePic] = useState('/images/IMG_3533.JPG');

  useEffect(() => {
    const saved = localStorage.getItem('piper-profile-pic');
    if (saved) setProfilePic(saved);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-[80vh]">
      {/* Hero Section with Piper's Photo */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10 flex flex-col items-center"
      >
        {/* Piper's Profile Photo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-xl opacity-60 animate-pulse" />
          <Link href="/album" className="block relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_30px_rgba(255,0,255,0.5)] hover:scale-105 transition-transform cursor-pointer">
            <Image
              src={profilePic}
              alt="Piper Grace"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </Link>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-2 border-dashed border-secondary/50 rounded-full pointer-events-none"
          />
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-bounce" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-pink-400 animate-bounce delay-150" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">
          PIPER'S WORLD
        </h1>
        <p className="text-xl md:text-2xl text-accent font-bold tracking-widest uppercase">
          Level Up Your Farm Life 🐴✨
        </p>
        <p className="text-sm text-base-content/60 mt-2">Click my pic to change it! 📸</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
        <CoolGameCard 
          href="/album" 
          title="📸 Photo Album" 
          description="All my favorite pictures!" 
          gradient="from-pink-500 via-rose-500 to-red-400"
        />
        <CoolGameCard 
          href="/runner" 
          title="🏆 Horse Runner" 
          description="Jump obstacles & collect coins!" 
          gradient="from-yellow-500 via-orange-500 to-red-500"
        />
        <CoolGameCard 
          href="/stable" 
          title="❤️ Virtual Stable" 
          description="Feed, groom & love your horse." 
          gradient="from-pink-500 via-fuchsia-500 to-purple-500"
        />
        <CoolGameCard 
          href="/viewer" 
          title="🎨 Horse Creator" 
          description="Design your own custom horse!" 
          gradient="from-blue-500 via-indigo-500 to-purple-500"
        />
        <CoolGameCard 
          href="/draw" 
          title="🖌️ Art Studio" 
          description="Create pro-level masterpieces." 
          gradient="from-cyan-500 via-teal-500 to-emerald-500"
        />
        <CoolGameCard 
          href="/puzzle" 
          title="🧩 Puzzle Master" 
          description="Solve complex photo challenges." 
          gradient="from-purple-500 via-violet-500 to-fuchsia-500"
        />
        <CoolGameCard 
          href="/memory" 
          title="🧠 Memory Matrix" 
          description="Test your brain power." 
          gradient="from-green-500 via-emerald-500 to-teal-500"
        />
        <CoolGameCard 
          href="/names" 
          title="🐴 Name Generator" 
          description="Find the perfect horse name!" 
          gradient="from-amber-500 via-yellow-500 to-lime-500"
        />
        <CoolGameCard 
          href="/diary" 
          title="🔒 Private Space" 
          description="Your secret diary & more." 
          gradient="from-slate-600 via-purple-600 to-slate-600"
        />
      </div>
    </div>
  );
}

function CoolGameCard({ href, title, description, gradient }: { 
  href: string, 
  title: string, 
  description: string, 
  gradient: string
}) {
  return (
    <Link href={href} className="w-full">
      <CardContainer className="inter-var w-full h-full py-4">
        <CardBody className="bg-base-100 relative group/card hover:shadow-2xl hover:shadow-primary/20 w-full h-auto rounded-xl p-6 border border-primary/30 hover:border-primary transition-all duration-300">
          <CardItem
            translateZ="50"
            className="text-2xl font-bold text-white"
          >
            {title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-base-content/70 text-sm mt-2"
          >
            {description}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <div className={`relative w-full h-32 rounded-xl overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center group-hover/card:scale-105 transition-transform duration-500`}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping" style={{top: '20%', left: '20%'}} />
                <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping" style={{top: '60%', right: '30%', animationDelay: '0.3s'}} />
                <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping" style={{bottom: '20%', left: '40%', animationDelay: '0.5s'}} />
              </div>
            </div>
          </CardItem>
          <div className="flex justify-end mt-4">
            <CardItem
              translateZ={20}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-content text-xs font-bold hover:scale-105 transition-transform"
            >
              OPEN →
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  );
}
