import Link from 'next/link';
import { Home, Palette, Puzzle, Smile, Trophy, Heart, User, Lightbulb, Award } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100/90 backdrop-blur-md shadow-xl rounded-box m-4 w-auto sticky top-4 z-50 border-4 border-primary/20">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-2xl font-bold text-primary hover:scale-105 transition-transform">
          🐴 Piper's World
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-1">
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
        </ul>
      </div>
    </div>
  );
}