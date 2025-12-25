'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Palette, Puzzle, Smile, Trophy, Heart, Box, Lightbulb, Award, User } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { useEffect, useState } from 'react';

export default function Home() {
  const [playerName, setPlayerName] = useState('Piper');

  useEffect(() => {
    const savedName = localStorage.getItem('playerName');
    if (savedName) setPlayerName(savedName);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-[80vh]">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">
          {playerName.toUpperCase()}'S WORLD
        </h1>
        <p className="text-2xl text-accent font-bold tracking-widest uppercase">
          Level Up Your Farm Life 🐴✨
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
        <CoolGameCard 
          href="/runner" 
          title="Horse Runner" 
          description="Jump obstacles & collect coins!" 
          icon={<Trophy className="w-20 h-20 text-yellow-400" />}
          bgImage="/images/piper2.jpg"
        />
        <CoolGameCard 
          href="/stable" 
          title="Virtual Stable" 
          description="Feed, groom & love your horse." 
          icon={<Heart className="w-20 h-20 text-pink-500" />}
          bgImage="/images/piper3.jpg"
        />
        <CoolGameCard 
          href="/viewer" 
          title="Horse Creator" 
          description="Design your own custom horse!" 
          icon={<Box className="w-20 h-20 text-blue-400" />}
          bgImage="/images/piper7.jpg"
        />
        <CoolGameCard 
          href="/draw" 
          title="Art Studio" 
          description="Create pro-level masterpieces." 
          icon={<Palette className="w-20 h-20 text-cyan-400" />}
          bgImage="/images/piper4.jpg"
        />
        <CoolGameCard 
          href="/puzzle" 
          title="Puzzle Master" 
          description="Solve complex photo challenges." 
          icon={<Puzzle className="w-20 h-20 text-purple-400" />}
          bgImage="/images/piper5.jpg"
        />
        <CoolGameCard 
          href="/memory" 
          title="Memory Matrix" 
          description="Test your brain power." 
          icon={<Smile className="w-20 h-20 text-green-400" />}
          bgImage="/images/piper6.jpg"
        />
        <CoolGameCard 
          href="/facts" 
          title="Horse Facts" 
          description="Learn cool things about horses!" 
          icon={<Lightbulb className="w-20 h-20 text-yellow-300" />}
          bgImage="/images/piper9.jpg"
        />
        <CoolGameCard 
          href="/achievements" 
          title="Achievements" 
          description="Collect badges & trophies!" 
          icon={<Award className="w-20 h-20 text-orange-400" />}
          bgImage="/images/piper10.jpg"
        />
        <CoolGameCard 
          href="/profile" 
          title="My Profile" 
          description="Customize your player profile." 
          icon={<User className="w-20 h-20 text-pink-400" />}
          bgImage="/images/piper11.jpg"
        />
      </div>
    </div>
  );
}

function CoolGameCard({ href, title, description, icon, bgImage }: { href: string, title: string, description: string, icon: React.ReactNode, bgImage: string }) {
  return (
    <Link href={href} className="w-full">
      <CardContainer className="inter-var w-full h-full py-4">
        <CardBody className="bg-base-100 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border border-primary/20">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {description}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <div className="relative w-full h-48 rounded-xl overflow-hidden group-hover/card:shadow-xl">
               <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                  {icon}
               </div>
               <img
                src={bgImage}
                className="h-full w-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                alt="thumbnail"
              />
            </div>
          </CardItem>
          <div className="flex justify-between items-center mt-10">
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              View Details →
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-primary text-primary-content text-xs font-bold"
            >
              PLAY NOW
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  );
}