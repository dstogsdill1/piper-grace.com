"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Trophy } from "lucide-react";

// Dynamic import to avoid SSR issues with Leaflet (requires window)
const RodeoMap = dynamic(() => import("@/components/RodeoMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full rounded-2xl bg-base-200 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
        <p className="text-primary">Loading Rodeo Map...</p>
      </div>
    </div>
  ),
});

export default function RodeoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="btn btn-ghost text-primary gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back Home
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            🤠 Rodeo Finder
          </h1>
          <div className="w-24"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              🏇 Find Your Next Rodeo Adventure!
            </span>
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-6">
            Explore the biggest and best rodeos across North America! 
            Click on any marker to see details about each event.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full"
            >
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold">15 Rodeos</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full"
            >
              <Calendar className="w-5 h-5 text-secondary" />
              <span className="font-semibold">Year-Round Events</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full"
            >
              <Trophy className="w-5 h-5 text-accent" />
              <span className="font-semibold">Top Competitions</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RodeoMap height="h-[500px] md:h-[600px]" showList={true} />
        </motion.div>
      </section>

      {/* Fun Facts Section */}
      <section className="container mx-auto px-4 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title text-2xl text-primary">
              🌟 Rodeo Fun Facts
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🐎</span>
                <div>
                  <h4 className="font-bold text-secondary">Barrel Racing</h4>
                  <p className="text-sm opacity-80">
                    Riders can complete the cloverleaf pattern in under 14 seconds!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤠</span>
                <div>
                  <h4 className="font-bold text-secondary">Bull Riding</h4>
                  <p className="text-sm opacity-80">
                    Cowboys must stay on for 8 seconds to get a score!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <h4 className="font-bold text-secondary">NFR Prize Money</h4>
                  <p className="text-sm opacity-80">
                    The National Finals Rodeo awards over $10 million in prizes!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎪</span>
                <div>
                  <h4 className="font-bold text-secondary">Oldest Rodeo</h4>
                  <p className="text-sm opacity-80">
                    Prescott Frontier Days started in 1888 - over 135 years ago!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
