'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, GraduationCap, Award, ChevronRight, Clock, 
  Star, CheckCircle2, Lock, Heart, Brush, MapPin, Shield,
  Stethoscope, Utensils, Footprints, Sparkles
} from 'lucide-react';

const courses = [
  {
    id: 'horse-care-basics',
    title: 'Horse Care Basics',
    description: 'Learn the fundamentals of keeping horses happy and healthy',
    icon: Heart,
    color: 'bg-rose-500',
    lessons: 8,
    duration: '45 min',
    progress: 62,
    difficulty: 'Beginner',
    topics: ['Daily grooming', 'Feeding schedules', 'Water needs', 'Shelter basics']
  },
  {
    id: 'horse-health',
    title: 'Horse Health 101',
    description: 'Understanding signs of health and when to call the vet',
    icon: Stethoscope,
    color: 'bg-emerald-500',
    lessons: 6,
    duration: '35 min',
    progress: 0,
    difficulty: 'Beginner',
    topics: ['Vital signs', 'Common illnesses', 'First aid', 'Vet visits']
  },
  {
    id: 'horse-nutrition',
    title: 'Feeding Your Horse',
    description: 'Everything about hay, grain, and treats',
    icon: Utensils,
    color: 'bg-amber-500',
    lessons: 5,
    duration: '30 min',
    progress: 0,
    difficulty: 'Beginner',
    topics: ['Types of hay', 'Grain basics', 'Safe treats', 'Feeding schedules']
  },
  {
    id: 'grooming-guide',
    title: 'Grooming Mastery',
    description: 'Keep your horse looking beautiful and feeling great',
    icon: Brush,
    color: 'bg-pink-500',
    lessons: 7,
    duration: '40 min',
    progress: 25,
    difficulty: 'Intermediate',
    topics: ['Brushing techniques', 'Mane & tail care', 'Hoof cleaning', 'Bath time']
  },
  {
    id: 'horse-breeds',
    title: 'Horse Breeds Around the World',
    description: 'Discover different breeds and their unique traits',
    icon: MapPin,
    color: 'bg-blue-500',
    lessons: 12,
    duration: '60 min',
    progress: 0,
    difficulty: 'Beginner',
    topics: ['Quarter horses', 'Arabians', 'Clydesdales', 'Wild horses']
  },
  {
    id: 'horse-behavior',
    title: 'Understanding Horse Behavior',
    description: 'Learn to read body language and communicate with horses',
    icon: Footprints,
    color: 'bg-violet-500',
    lessons: 8,
    duration: '50 min',
    progress: 0,
    difficulty: 'Intermediate',
    topics: ['Body language', 'Ear positions', 'Vocalizations', 'Trust building']
  },
  {
    id: 'horse-safety',
    title: 'Safety First',
    description: 'Important safety rules for being around horses',
    icon: Shield,
    color: 'bg-red-500',
    lessons: 5,
    duration: '25 min',
    progress: 100,
    difficulty: 'Beginner',
    topics: ['Approaching horses', 'Leading safely', 'Barn safety', 'Riding gear']
  },
  {
    id: 'rodeo-101',
    title: 'Rodeo 101',
    description: 'Learn about rodeo events, history, and culture',
    icon: Award,
    color: 'bg-orange-500',
    lessons: 10,
    duration: '55 min',
    progress: 0,
    difficulty: 'Beginner',
    topics: ['Barrel racing', 'Roping events', 'Bull riding', 'Rodeo history']
  },
];

const quickFacts = [
  "Horses can run within hours of being born",
  "A horse's teeth take up more space than their brain",
  "Horses have nearly 360-degree vision",
  "The average horse lives 25-30 years",
  "Horses can sleep standing up or lying down",
];

export default function LearnPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredCourses = selectedDifficulty 
    ? courses.filter(c => c.difficulty === selectedDifficulty)
    : courses;

  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100);
  const completedCourses = courses.filter(c => c.progress === 100);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 rounded-2xl bg-primary/20">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content">
              Horse Academy
            </h1>
            <p className="text-base-content/60">Learn everything about horses at your own pace</p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="ranch-card p-4 text-center">
            <div className="text-3xl font-bold text-primary">{courses.length}</div>
            <div className="text-sm text-base-content/60">Total Courses</div>
          </div>
          <div className="ranch-card p-4 text-center">
            <div className="text-3xl font-bold text-amber-500">{inProgressCourses.length}</div>
            <div className="text-sm text-base-content/60">In Progress</div>
          </div>
          <div className="ranch-card p-4 text-center">
            <div className="text-3xl font-bold text-emerald-500">{completedCourses.length}</div>
            <div className="text-sm text-base-content/60">Completed</div>
          </div>
          <div className="ranch-card p-4 text-center">
            <div className="text-3xl font-bold text-violet-500">
              {completedCourses.length * 50}
            </div>
            <div className="text-sm text-base-content/60">XP Earned</div>
          </div>
        </div>
      </motion.section>

      {/* Continue Learning */}
      {inProgressCourses.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Continue Learning
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {inProgressCourses.map((course) => (
              <Link key={course.id} href={`/learn/${course.id}`}>
                <div className="ranch-card hover-lift p-5">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${course.color} text-white`}>
                      <course.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base-content">{course.title}</h3>
                      <p className="text-sm text-base-content/60 mt-1">{course.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-base-content/60">{course.progress}% complete</span>
                          <span className="text-primary">Continue →</span>
                        </div>
                        <div className="h-2 bg-base-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* Filter Tabs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedDifficulty(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDifficulty === null 
                ? 'bg-primary text-white' 
                : 'bg-base-200 text-base-content/70 hover:bg-base-300'
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => setSelectedDifficulty('Beginner')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDifficulty === 'Beginner' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-base-200 text-base-content/70 hover:bg-base-300'
            }`}
          >
            🌱 Beginner
          </button>
          <button
            onClick={() => setSelectedDifficulty('Intermediate')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDifficulty === 'Intermediate' 
                ? 'bg-amber-500 text-white' 
                : 'bg-base-200 text-base-content/70 hover:bg-base-300'
            }`}
          >
            ⭐ Intermediate
          </button>
        </div>
      </motion.section>

      {/* All Courses Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-10"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          {selectedDifficulty ? `${selectedDifficulty} Courses` : 'All Courses'}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link href={`/learn/${course.id}`}>
                <div className="ranch-card hover-lift p-5 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-xl ${course.color} text-white`}>
                      <course.icon className="w-5 h-5" />
                    </div>
                    {course.progress === 100 ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : course.progress > 0 ? (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {course.progress}%
                      </span>
                    ) : null}
                  </div>
                  
                  <h3 className="font-semibold text-base-content">{course.title}</h3>
                  <p className="text-sm text-base-content/60 mt-1 flex-1">{course.description}</p>
                  
                  <div className="mt-4 pt-4 border-t border-base-200">
                    <div className="flex items-center justify-between text-xs text-base-content/60">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.lessons} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full ${
                        course.difficulty === 'Beginner' 
                          ? 'bg-emerald-500/20 text-emerald-600' 
                          : 'bg-amber-500/20 text-amber-600'
                      }`}>
                        {course.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Quick Facts Sidebar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-10"
      >
        <div className="ranch-card p-6 bg-gradient-to-r from-secondary/10 to-transparent">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-secondary" />
            Quick Horse Facts
          </h3>
          <ul className="space-y-3">
            {quickFacts.map((fact, index) => (
              <li key={index} className="flex items-start gap-3">
                <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-base-content/70">{fact}</span>
              </li>
            ))}
          </ul>
          <Link 
            href="/facts" 
            className="inline-block mt-4 text-sm text-primary font-medium hover:underline"
          >
            See all horse facts →
          </Link>
        </div>
      </motion.section>

      {/* Achievement Tease */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="ranch-card p-6 border-primary/30">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/20">
              <Award className="w-8 h-8 text-amber-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base-content">Earn Your First Badge!</h3>
              <p className="text-sm text-base-content/60">
                Complete any course to unlock the "Eager Learner" badge and earn 50 XP
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-base-content/40" />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
