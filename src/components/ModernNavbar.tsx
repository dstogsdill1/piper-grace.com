'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Home, Palette, Puzzle, Trophy, Heart, Sparkles, 
  Lock, Camera, Images, BookOpen, Map, Award, User, 
  Menu, X, ChevronDown, Gamepad2, GraduationCap, PenTool
} from 'lucide-react';

const navCategories = [
  {
    name: 'Games',
    icon: Gamepad2,
    items: [
      { href: '/runner', label: 'Horse Runner', icon: Trophy, desc: 'Endless adventure' },
      { href: '/puzzle', label: 'Puzzles', icon: Puzzle, desc: 'Brain teasers' },
      { href: '/memory', label: 'Memory Match', icon: Sparkles, desc: 'Test your memory' },
    ]
  },
  {
    name: 'Create',
    icon: PenTool,
    items: [
      { href: '/draw', label: 'Art Studio', icon: Palette, desc: 'Digital canvas' },
      { href: '/viewer', label: 'Horse Creator', icon: Heart, desc: 'Design your horse' },
      { href: '/photobooth', label: 'Photo Booth', icon: Camera, desc: 'Fun filters' },
      { href: '/names', label: 'Name Generator', icon: Sparkles, desc: 'Find the perfect name' },
    ]
  },
  {
    name: 'Explore',
    icon: Map,
    items: [
      { href: '/stable', label: 'My Stable', icon: Heart, desc: 'Care for your horse' },
      { href: '/album', label: 'Photo Album', icon: Images, desc: 'Memories' },
      { href: '/rodeo', label: 'Rodeo Finder', icon: Map, desc: 'Discover events' },
    ]
  },
  {
    name: 'Learn',
    icon: GraduationCap,
    items: [
      { href: '/facts', label: 'Horse Facts', icon: BookOpen, desc: 'Fun knowledge' },
      { href: '/challenges', label: 'Daily Challenges', icon: Trophy, desc: 'Earn rewards' },
      { href: '/learn', label: 'Horse Academy', icon: GraduationCap, desc: 'Courses & guides' },
    ]
  },
];

export default function ModernNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🐴</span>
            <span className="font-bold text-xl text-base-content group-hover:text-primary transition-colors">
              Piper's Ranch
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/" className="btn btn-ghost btn-sm gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>

            {navCategories.map((category) => (
              <div 
                key={category.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(category.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="btn btn-ghost btn-sm gap-1">
                  <category.icon className="w-4 h-4" />
                  {category.name}
                  <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === category.name ? 'rotate-180' : ''}`} />
                </button>
                
                {openDropdown === category.name && (
                  <div className="absolute top-full left-0 pt-2 min-w-[240px]">
                    <div className="bg-base-100 rounded-xl shadow-xl border border-base-200 p-2">
                      {category.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium text-base-content">{item.label}</div>
                            <div className="text-xs text-base-content/60">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="divider divider-horizontal mx-1" />

            <Link href="/achievements" className="btn btn-ghost btn-sm gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Achievements
            </Link>
            <Link href="/profile" className="btn btn-ghost btn-sm gap-2">
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Link href="/diary" className="btn btn-primary btn-sm gap-2">
              <Lock className="w-4 h-4" />
              My Diary
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden btn btn-ghost btn-square"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-base-200 bg-base-100">
          <div className="container mx-auto px-4 py-4">
            <Link 
              href="/" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200"
              onClick={() => setMobileOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>

            {navCategories.map((category) => (
              <div key={category.name} className="mt-4">
                <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-base-content/60 uppercase tracking-wide">
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-base-200"
                      onClick={() => setMobileOpen(false)}
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="divider my-4" />

            <div className="grid grid-cols-2 gap-2">
              <Link 
                href="/achievements" 
                className="btn btn-ghost btn-sm justify-start gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <Award className="w-4 h-4 text-amber-500" />
                Achievements
              </Link>
              <Link 
                href="/profile" 
                className="btn btn-ghost btn-sm justify-start gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
            </div>
            
            <Link 
              href="/diary" 
              className="btn btn-primary btn-block mt-3 gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <Lock className="w-4 h-4" />
              My Private Diary
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
