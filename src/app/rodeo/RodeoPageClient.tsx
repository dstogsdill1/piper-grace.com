"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Star, Trophy, Heart } from "lucide-react";

// Dynamic import for map (no SSR)
const RodeoMap = dynamic(() => import("@/components/RodeoMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-2xl bg-base-200 animate-pulse flex items-center justify-center">
      <span className="text-2xl">🗺️ Loading Rodeo Map...</span>
    </div>
  ),
});

interface RodeoPageClientProps {
  mapboxToken: string;
}

export default function RodeoPageClient({ mapboxToken }: RodeoPageClientProps) {
  const funFacts = [
    "🤠 The first rodeo was held in Pecos, Texas in 1883!",
    "🐴 Horses can sleep standing up!",
    "🎪 Rodeo is the official state sport of Texas, Wyoming, and South Dakota!",
    "⏱️ Bull riders only have to stay on for 8 seconds!",
    "🐂 Bulls can weigh over 2,000 pounds!",
    "👢 Cowgirl boots were invented to help feet stay in stirrups!",
    "🌟 Barrel racing became an official rodeo event in 1948!",
    "🎠 Some rodeo horses are trained for over 5 years!",
  ];

  const [currentFact, setCurrentFact] = useState(0);

  return (
    <>
      {/* Header */}
      <div className="navbar bg-base-100/80 backdrop-blur-sm sticky top-0 z-50 border-b border-primary/20">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <div className="flex-none">
          <span className="text-2xl">🤠</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero min-h-[40vh] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        <div className="hero-content text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                🐴 Rodeo Finder 🤠
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-base-content/80">
              Discover amazing rodeos near you! Click on the markers to fly to each location!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="badge badge-primary badge-lg gap-2 p-4">
                <MapPin className="w-4 h-4" />
                15 Rodeos
              </div>
              <div className="badge badge-secondary badge-lg gap-2 p-4">
                <Calendar className="w-4 h-4" />
                Year-Round Events
              </div>
              <div className="badge badge-accent badge-lg gap-2 p-4">
                <Trophy className="w-4 h-4" />
                Top Competitions
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card bg-base-200 shadow-2xl overflow-hidden"
          >
            <div className="card-body p-4">
              <h2 className="card-title text-2xl justify-center mb-4">
                <Star className="w-6 h-6 text-warning" />
                Interactive Rodeo Map
                <Star className="w-6 h-6 text-warning" />
              </h2>
              <RodeoMap mapboxToken={mapboxToken} />
              <p className="text-center text-sm text-base-content/60 mt-4">
                🎯 Click any marker to fly to that rodeo! Use the buttons to navigate between events.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-12 px-4 md:px-8 bg-base-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            <Heart className="inline w-8 h-8 text-error mr-2" />
            Fun Rodeo Facts!
          </h2>
          <motion.div
            key={currentFact}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card bg-primary text-primary-content shadow-xl mb-6"
          >
            <div className="card-body">
              <p className="text-2xl">{funFacts[currentFact]}</p>
            </div>
          </motion.div>
          <div className="flex justify-center gap-2 flex-wrap">
            {funFacts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFact(index)}
                className={`btn btn-circle btn-sm ${
                  currentFact === index ? "btn-secondary" : "btn-ghost"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Ready for Adventure? 🌟</h2>
          <p className="text-lg mb-6 text-base-content/80">
            Ask a grown-up to take you to one of these amazing rodeos!
          </p>
          <Link href="/" className="btn btn-primary btn-lg gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Piper's World
          </Link>
        </motion.div>
      </section>
    </>
  );
}
