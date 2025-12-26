import Link from 'next/link';
import { Heart, Github, Mail } from 'lucide-react';

export default function ModernFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐴</span>
              <span className="font-bold text-lg">Piper's Ranch</span>
            </Link>
            <p className="text-sm text-base-content/60 max-w-md">
              A special place for adventure, creativity, and learning. 
              Explore games, create art, care for horses, and discover the world of rodeo!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 text-base-content">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/runner" className="text-base-content/70 hover:text-primary transition-colors">Horse Runner</Link></li>
              <li><Link href="/stable" className="text-base-content/70 hover:text-primary transition-colors">My Stable</Link></li>
              <li><Link href="/draw" className="text-base-content/70 hover:text-primary transition-colors">Art Studio</Link></li>
              <li><Link href="/rodeo" className="text-base-content/70 hover:text-primary transition-colors">Rodeo Finder</Link></li>
            </ul>
          </div>

          {/* My Space */}
          <div>
            <h3 className="font-semibold mb-3 text-base-content">My Space</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/profile" className="text-base-content/70 hover:text-primary transition-colors">Profile</Link></li>
              <li><Link href="/achievements" className="text-base-content/70 hover:text-primary transition-colors">Achievements</Link></li>
              <li><Link href="/diary" className="text-base-content/70 hover:text-primary transition-colors">Private Diary</Link></li>
              <li><Link href="/album" className="text-base-content/70 hover:text-primary transition-colors">Photo Album</Link></li>
            </ul>
          </div>
        </div>

        <div className="divider my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-base-content/60 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for Piper Grace
          </p>
          <p className="text-sm text-base-content/50">
            © {currentYear} Piper's Ranch — Keep exploring! 🌟
          </p>
        </div>
      </div>
    </footer>
  );
}
