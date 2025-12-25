'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Palette, Puzzle, Smile, Trophy, Heart, Box, Sparkles, Lock } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

export default function Home() {
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
          <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_30px_rgba(255,0,255,0.5)]">
            <Image
              src="/images/piper13.jpg"
              alt="Piper Grace"
              fill
              className="object-cover"
              priority
            />
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
