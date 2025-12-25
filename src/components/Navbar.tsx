import Link from 'next/link';
import { Home, Palette, Puzzle, Smile } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-xl rounded-box m-4 w-auto sticky top-4 z-50 border-4 border-primary/20">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-2xl font-bold text-primary hover:scale-105 transition-transform">
          🐴 Piper Grace
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link href="/" className="tooltip tooltip-bottom" data-tip="Home">
              <Home className="w-6 h-6 text-secondary" />
            </Link>
          </li>
          <li>
            <Link href="/draw" className="tooltip tooltip-bottom" data-tip="Draw">
              <Palette className="w-6 h-6 text-accent" />
            </Link>
          </li>
          <li>
            <Link href="/puzzle" className="tooltip tooltip-bottom" data-tip="Puzzles">
              <Puzzle className="w-6 h-6 text-info" />
            </Link>
          </li>
          <li>
            <Link href="/memory" className="tooltip tooltip-bottom" data-tip="Memory Game">
              <Smile className="w-6 h-6 text-success" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}