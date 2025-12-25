'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palette, Puzzle, Smile, Trophy, Heart, Box, Sparkles } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-[80vh]">
      {/* Hero Section */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10 flex flex-col items-center"
      >
        {/* Animated Logo/Avatar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-xl opacity-60 animate-pulse" />
          <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_30px_rgba(255,0,255,0.5)] bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-400 flex items-center justify-center">
            <span className="text-6xl md:text-8xl">🐴</span>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-2 border-dashed border-secondary/50 rounded-full"
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
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
        <CoolGameCard 
          href="/runner" 
          title="Horse Runner" 
          description="Jump obstacles & collect coins!" 
          icon={<Trophy className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />}
          gradient="from-yellow-500 via-orange-500 to-red-500"
          emoji="🏆"
        />
        <CoolGameCard 
          href="/stable" 
          title="Virtual Stable" 
          description="Feed, groom & love your horse." 
          icon={<Heart className="w-16 h-16 text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]" />}
          gradient="from-pink-500 via-rose-500 to-red-400"
          emoji="❤️"
        />
        <CoolGameCard 
          href="/viewer" 
          title="Horse Creator" 
          description="Design your own custom horse!" 
          icon={<Box className="w-16 h-16 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />}
          gradient="from-blue-500 via-indigo-500 to-purple-500"
          emoji="🎨"
        />
        <CoolGameCard 
          href="/draw" 
          title="Art Studio" 
          description="Create pro-level masterpieces." 
          icon={<Palette className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />}
          gradient="from-cyan-500 via-teal-500 to-emerald-500"
          emoji="🖌️"
        />
        <CoolGameCard 
          href="/puzzle" 
          title="Puzzle Master" 
          description="Solve complex photo challenges." 
          icon={<Puzzle className="w-16 h-16 text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]" />}
          gradient="from-purple-500 via-violet-500 to-fuchsia-500"
          emoji="🧩"
        />
        <CoolGameCard 
          href="/memory" 
          title="Memory Matrix" 
          description="Test your brain power." 
          icon={<Smile className="w-16 h-16 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]" />}
          gradient="from-green-500 via-emerald-500 to-teal-500"
          emoji="🧠"
        />
      </div>

      {/* Private Space Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Link href="/diary" className="btn btn-outline btn-secondary btn-lg gap-2 group">
          <span className="text-2xl">🔒</span>
          <span>Piper's Private Space</span>
          <Sparkles className="w-5 h-5 group-hover:animate-spin" />
        </Link>
      </motion.div>
    </div>
  );
}

function CoolGameCard({ href, title, description, icon, gradient, emoji }: { 
  href: string, 
  title: string, 
  description: string, 
  icon: React.ReactNode, 
  gradient: string,
  emoji: string 
}) {
  return (
    <Link href={href} className="w-full">
      <CardContainer className="inter-var w-full h-full py-4">
        <CardBody className="bg-base-100 relative group/card hover:shadow-2xl hover:shadow-primary/20 w-full h-auto rounded-xl p-6 border border-primary/30 hover:border-primary transition-all duration-300">
          <CardItem
            translateZ="50"
            className="text-2xl font-bold text-white flex items-center gap-2"
          >
            <span>{emoji}</span>
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
            <div className={`relative w-full h-40 rounded-xl overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center group-hover/card:scale-105 transition-transform duration-500`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 transform group-hover/card:scale-110 transition-transform duration-300">
                {icon}
              </div>
              {/* Animated particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping" style={{top: '20%', left: '20%'}} />
                <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping delay-300" style={{top: '60%', right: '30%'}} />
                <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping delay-500" style={{bottom: '20%', left: '40%'}} />
              </div>
            </div>
          </CardItem>
          <div className="flex justify-between items-center mt-6">
            <CardItem
              translateZ={20}
              className="text-xs text-base-content/60"
            >
              Click to play →
            </CardItem>
            <CardItem
              translateZ={20}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-content text-xs font-bold hover:scale-105 transition-transform"
            >
              PLAY NOW
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  );
}
