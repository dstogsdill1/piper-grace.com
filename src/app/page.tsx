'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { 
  Trophy, Heart, Palette, Puzzle, Sparkles, Lock, Camera, 
  Images, Map, BookOpen, Award, ArrowRight, Gamepad2, 
  GraduationCap, TrendingUp, Star
} from 'lucide-react';

// Types for activity items
interface ActivityItem {
  href: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  stats?: string;
}

interface ActivitySection {
  category: string;
  items: ActivityItem[];
}

// Activity categories for the dashboard
const activities: ActivitySection[] = [
  {
    category: 'Featured',
    items: [
      { 
        href: '/runner', 
        title: 'Horse Runner', 
        desc: 'Race through obstacles and collect coins',
        icon: Trophy,
        color: 'bg-amber-500',
        stats: 'High Score: --'
      },
      { 
        href: '/stable', 
        title: 'My Stable', 
        desc: 'Care for your virtual horse',
        icon: Heart,
        color: 'bg-rose-500',
        stats: 'Spirit needs attention!'
      },
    ]
  },
  {
    category: 'Games & Challenges',
    items: [
      { href: '/puzzle', title: 'Puzzle Master', desc: 'Solve photo puzzles', icon: Puzzle, color: 'bg-violet-500' },
      { href: '/memory', title: 'Memory Match', desc: 'Test your memory', icon: Sparkles, color: 'bg-emerald-500' },
      { href: '/challenges', title: 'Daily Challenges', desc: 'Earn rewards daily', icon: TrendingUp, color: 'bg-orange-500' },
    ]
  },
  {
    category: 'Create & Express',
    items: [
      { href: '/draw', title: 'Art Studio', desc: 'Digital painting canvas', icon: Palette, color: 'bg-cyan-500' },
      { href: '/viewer', title: 'Horse Creator', desc: 'Design your dream horse', icon: Heart, color: 'bg-pink-500' },
      { href: '/photobooth', title: 'Photo Booth', desc: 'Fun photo filters', icon: Camera, color: 'bg-purple-500' },
      { href: '/names', title: 'Name Generator', desc: 'Find the perfect name', icon: Sparkles, color: 'bg-yellow-500' },
    ]
  },
  {
    category: 'Explore & Learn',
    items: [
      { href: '/rodeo', title: 'Rodeo Finder', desc: 'Discover events near you', icon: Map, color: 'bg-red-500' },
      { href: '/facts', title: 'Horse Facts', desc: 'Learn something new', icon: BookOpen, color: 'bg-indigo-500' },
      { href: '/learn', title: 'Horse Academy', desc: 'Courses & guides', icon: GraduationCap, color: 'bg-teal-500' },
    ]
  },
];

export default function Home() {
  const [profilePic, setProfilePic] = useState('/images/IMG_3533.JPG');
  const [greeting, setGreeting] = useState('Welcome back');

  useEffect(() => {
    const saved = localStorage.getItem('piper-profile-pic');
    if (saved) setProfilePic(saved);
    
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-center gap-8 mb-12"
      >
        {/* Profile Area */}
        <div className="flex items-center gap-6">
          <Link 
            href="/album" 
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer group"
          >
            <Image
              src={profilePic}
              alt="Piper Grace"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </Link>
          
          <div>
            <p className="text-base-content/60 text-sm">{greeting}, Piper! 👋</p>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content">
              Welcome to Your Ranch
            </h1>
            <p className="text-base-content/70 mt-1">What would you like to do today?</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex-1 flex justify-end">
          <div className="flex gap-3">
            <Link href="/achievements" className="ranch-card hover-lift p-4 text-center">
              <Award className="w-6 h-6 text-amber-500 mx-auto mb-1" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-base-content/60">Achievements</div>
            </Link>
            <Link href="/profile" className="ranch-card hover-lift p-4 text-center">
              <Star className="w-6 h-6 text-primary mx-auto mb-1" />
              <div className="text-2xl font-bold">Level 5</div>
              <div className="text-xs text-base-content/60">Explorer</div>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Private Diary Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <Link href="/diary" className="block">
          <div className="ranch-card hover-lift p-6 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">My Private Diary</h3>
                  <p className="text-sm text-base-content/60">Your secret space for thoughts, memories & goals</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Link>
      </motion.section>

      {/* Activity Sections */}
      {activities.map((section, sectionIndex) => (
        <motion.section
          key={section.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * (sectionIndex + 2) }}
          className="mb-10"
        >
          <h2 className="text-xl font-semibold mb-4 text-base-content flex items-center gap-2">
            {section.category}
          </h2>
          
          <div className={`grid gap-4 ${
            section.category === 'Featured' 
              ? 'grid-cols-1 md:grid-cols-2' 
              : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {section.items.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={`ranch-card hover-lift p-5 h-full ${
                  section.category === 'Featured' ? 'flex items-start gap-4' : ''
                }`}>
                  <div className={`p-3 rounded-xl ${item.color} text-white ${
                    section.category === 'Featured' ? '' : 'mb-3'
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base-content">{item.title}</h3>
                    <p className="text-sm text-base-content/60 mt-1">{item.desc}</p>
                    {item.stats && (
                      <p className="text-xs text-primary mt-2 font-medium">{item.stats}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      ))}

      {/* Photo Album Quick Access */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-10"
      >
        <Link href="/album">
          <div className="ranch-card hover-lift p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-pink-500 text-white">
                  <Images className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Photo Album</h3>
                  <p className="text-sm text-base-content/60">View all your favorite memories</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-base-content/40" />
            </div>
          </div>
        </Link>
      </motion.section>

      {/* Daily Tip */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="ranch-card p-6 bg-gradient-to-r from-secondary/10 to-transparent">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-secondary/20">
              <BookOpen className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h4 className="font-semibold text-base-content">Did You Know?</h4>
              <p className="text-sm text-base-content/70 mt-1">
                Horses can sleep both lying down and standing up! They have a special locking mechanism in their legs that lets them rest while staying on their feet.
              </p>
              <Link href="/facts" className="text-sm text-primary font-medium mt-2 inline-block hover:underline">
                Learn more horse facts →
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
