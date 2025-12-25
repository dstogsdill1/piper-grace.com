import Link from 'next/link';
import { Home, Palette, Puzzle, Smile, Trophy, Heart, User, Lightbulb, Award, Sparkles, Calendar, Camera, Menu, Lock } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100/90 backdrop-blur-md shadow-xl rounded-box m-4 w-auto sticky top-4 z-50 border-4 border-primary/20">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold text-primary hover:scale-105 transition-transform">
          🐴 Piper's World
        </Link>
      </div>
      <div className="flex-none">
        {/* Desktop menu */}
        <ul className="menu menu-horizontal px-1 gap-1 hidden lg:flex">
          <li>
            <Link href="/" className="tooltip tooltip-bottom" data-tip="Home">
              <Home className="w-5 h-5 text-secondary" />
            </Link>
          </li>
          <li>
            <Link href="/runner" className="tooltip tooltip-bottom" data-tip="Runner">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </Link>
          </li>
          <li>
            <Link href="/stable" className="tooltip tooltip-bottom" data-tip="Stable">
              <Heart className="w-5 h-5 text-pink-500" />
            </Link>
          </li>
          <li>
            <Link href="/photobooth" className="tooltip tooltip-bottom" data-tip="Photo Booth">
              <Camera className="w-5 h-5 text-purple-400" />
            </Link>
          </li>
          <li>
            <Link href="/draw" className="tooltip tooltip-bottom" data-tip="Draw">
              <Palette className="w-5 h-5 text-accent" />
            </Link>
          </li>
          <li>
            <Link href="/puzzle" className="tooltip tooltip-bottom" data-tip="Puzzles">
              <Puzzle className="w-5 h-5 text-info" />
            </Link>
          </li>
          <li>
            <Link href="/memory" className="tooltip tooltip-bottom" data-tip="Memory">
              <Smile className="w-5 h-5 text-success" />
            </Link>
          </li>
          <li>
            <Link href="/names" className="tooltip tooltip-bottom" data-tip="Names">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </Link>
          </li>
          <li>
            <Link href="/challenges" className="tooltip tooltip-bottom" data-tip="Challenges">
              <Calendar className="w-5 h-5 text-orange-400" />
            </Link>
          </li>
          <li>
            <Link href="/facts" className="tooltip tooltip-bottom" data-tip="Facts">
              <Lightbulb className="w-5 h-5 text-yellow-300" />
            </Link>
          </li>
          <li>
            <Link href="/achievements" className="tooltip tooltip-bottom" data-tip="Achievements">
              <Award className="w-5 h-5 text-orange-400" />
            </Link>
          </li>
          <li>
            <Link href="/profile" className="tooltip tooltip-bottom" data-tip="Profile">
              <User className="w-5 h-5 text-pink-400" />
            </Link>
          </li>
          <li>
            <Link href="/diary" className="tooltip tooltip-bottom" data-tip="Private Diary">
              <Lock className="w-5 h-5 text-pink-300" />
            </Link>
          </li>
        </ul>
        {/* Mobile dropdown */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <Menu className="w-6 h-6" />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52 mt-4 border-2 border-primary/20">
            <li><Link href="/"><Home className="w-4 h-4" /> Home</Link></li>
            <li><Link href="/runner"><Trophy className="w-4 h-4" /> Runner</Link></li>
            <li><Link href="/stable"><Heart className="w-4 h-4" /> Stable</Link></li>
            <li><Link href="/photobooth"><Camera className="w-4 h-4" /> Photo Booth</Link></li>
            <li><Link href="/draw"><Palette className="w-4 h-4" /> Art Studio</Link></li>
            <li><Link href="/puzzle"><Puzzle className="w-4 h-4" /> Puzzles</Link></li>
            <li><Link href="/memory"><Smile className="w-4 h-4" /> Memory</Link></li>
            <li><Link href="/names"><Sparkles className="w-4 h-4" /> Name Generator</Link></li>
            <li><Link href="/challenges"><Calendar className="w-4 h-4" /> Challenges</Link></li>
            <li><Link href="/facts"><Lightbulb className="w-4 h-4" /> Horse Facts</Link></li>
            <li><Link href="/achievements"><Award className="w-4 h-4" /> Achievements</Link></li>
            <li><Link href="/profile"><User className="w-4 h-4" /> Profile</Link></li>
            <li className="border-t border-pink-400/30 mt-2 pt-2">
              <Link href="/diary" className="text-pink-300">
                <Lock className="w-4 h-4" /> Private Diary 🔐
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}