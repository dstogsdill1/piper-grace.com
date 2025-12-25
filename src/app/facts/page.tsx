'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

const horseFacts = [
  { fact: "Horses can sleep both lying down and standing up!", emoji: "😴" },
  { fact: "A horse's teeth take up more space in their head than their brain.", emoji: "🦷" },
  { fact: "Horses can run within hours after being born.", emoji: "🏃" },
  { fact: "The fastest recorded sprinting speed of a horse was 55 mph.", emoji: "⚡" },
  { fact: "Horses have the largest eyes of any land mammal.", emoji: "👀" },
  { fact: "A horse can see almost 360 degrees at one time.", emoji: "🔄" },
  { fact: "Horses have an excellent memory - they never forget a friend!", emoji: "🧠" },
  { fact: "A baby horse is called a foal.", emoji: "🐴" },
  { fact: "Horses can't breathe through their mouth, only their nose.", emoji: "👃" },
  { fact: "The oldest horse on record lived to be 62 years old!", emoji: "🎂" },
  { fact: "Horses have 16 muscles in each ear, allowing them to rotate 180 degrees.", emoji: "👂" },
  { fact: "A horse's heart weighs about 9-10 pounds!", emoji: "❤️" },
  { fact: "Horses produce approximately 10 gallons of saliva a day.", emoji: "💧" },
  { fact: "Wild horses live in groups called herds.", emoji: "🐎" },
  { fact: "Horses have been domesticated for over 5,000 years.", emoji: "📜" },
  { fact: "A horse can drink up to 25 gallons of water per day.", emoji: "🚰" },
  { fact: "Horses are herbivores - they only eat plants!", emoji: "🌿" },
  { fact: "The average horse's brain weighs 22 oz, about half a human's.", emoji: "🧠" },
];

export default function FactsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const nextFact = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % horseFacts.length);
      setIsFlipping(false);
    }, 300);
  };

  const prevFact = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + horseFacts.length) % horseFacts.length);
      setIsFlipping(false);
    }, 300);
  };

  const randomFact = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex(Math.floor(Math.random() * horseFacts.length));
      setIsFlipping(false);
    }, 300);
  };

  const currentFact = horseFacts[currentIndex];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-3xl mx-auto min-h-[70vh] justify-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 flex items-center justify-center gap-3">
          <Lightbulb className="w-12 h-12 text-yellow-400" />
          Horse Facts
        </h1>
        <p className="text-xl text-base-content/70">Learn something new about horses!</p>
      </motion.div>

      {/* Fact Card */}
      <motion.div
        animate={{ rotateY: isFlipping ? 90 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="card bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl border-4 border-primary/30">
          <div className="card-body items-center text-center py-16 px-8">
            <div className="text-8xl mb-6">{currentFact.emoji}</div>
            <p className="text-2xl md:text-3xl font-bold leading-relaxed">
              {currentFact.fact}
            </p>
            <div className="badge badge-primary mt-4">
              Fact {currentIndex + 1} of {horseFacts.length}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button onClick={prevFact} className="btn btn-circle btn-lg btn-outline">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button onClick={randomFact} className="btn btn-lg btn-primary gap-2">
          <RefreshCw className="w-6 h-6" />
          Random Fact
        </button>
        <button onClick={nextFact} className="btn btn-circle btn-lg btn-outline">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}