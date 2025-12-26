'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, ArrowLeft, CheckCircle2, Circle, Clock,
  Star, Award, ChevronRight, Play, Lock,
  Heart, Stethoscope, Utensils, Brush, MapPin, Footprints, Shield, Sparkles,
  LucideIcon
} from 'lucide-react';

// Course data (same as learn page)
const courseData: Record<string, {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  lessons: { title: string; duration: string; completed: boolean }[];
  difficulty: string;
}> = {
  'horse-care-basics': {
    id: 'horse-care-basics',
    title: 'Horse Care Basics',
    description: 'Learn the fundamentals of keeping horses happy and healthy',
    icon: Heart,
    color: 'bg-rose-500',
    difficulty: 'Beginner',
    lessons: [
      { title: 'Introduction to Horse Care', duration: '5 min', completed: true },
      { title: 'Daily Grooming Essentials', duration: '7 min', completed: true },
      { title: 'Feeding Your Horse', duration: '6 min', completed: true },
      { title: 'Understanding Water Needs', duration: '4 min', completed: true },
      { title: 'Shelter & Living Space', duration: '6 min', completed: true },
      { title: 'Exercise Requirements', duration: '5 min', completed: false },
      { title: 'Seasonal Care Tips', duration: '7 min', completed: false },
      { title: 'Building Trust with Your Horse', duration: '5 min', completed: false },
    ]
  },
  'horse-health': {
    id: 'horse-health',
    title: 'Horse Health 101',
    description: 'Understanding signs of health and when to call the vet',
    icon: Stethoscope,
    color: 'bg-emerald-500',
    difficulty: 'Beginner',
    lessons: [
      { title: 'Signs of a Healthy Horse', duration: '6 min', completed: false },
      { title: 'Taking Vital Signs', duration: '8 min', completed: false },
      { title: 'Common Horse Illnesses', duration: '7 min', completed: false },
      { title: 'First Aid Basics', duration: '6 min', completed: false },
      { title: 'When to Call the Vet', duration: '4 min', completed: false },
      { title: 'Preventive Care & Vaccines', duration: '5 min', completed: false },
    ]
  },
  'horse-nutrition': {
    id: 'horse-nutrition',
    title: 'Feeding Your Horse',
    description: 'Everything about hay, grain, and treats',
    icon: Utensils,
    color: 'bg-amber-500',
    difficulty: 'Beginner',
    lessons: [
      { title: 'Types of Hay', duration: '5 min', completed: false },
      { title: 'Understanding Grain', duration: '6 min', completed: false },
      { title: 'Safe Treats for Horses', duration: '4 min', completed: false },
      { title: 'Creating a Feeding Schedule', duration: '5 min', completed: false },
      { title: 'Hydration Needs', duration: '5 min', completed: false },
    ]
  },
  'grooming-guide': {
    id: 'grooming-guide',
    title: 'Grooming Mastery',
    description: 'Keep your horse looking beautiful and feeling great',
    icon: Brush,
    color: 'bg-pink-500',
    difficulty: 'Intermediate',
    lessons: [
      { title: 'Essential Grooming Tools', duration: '5 min', completed: true },
      { title: 'Brushing Techniques', duration: '7 min', completed: true },
      { title: 'Mane & Tail Care', duration: '6 min', completed: false },
      { title: 'Hoof Cleaning & Care', duration: '8 min', completed: false },
      { title: 'Bath Time Basics', duration: '6 min', completed: false },
      { title: 'Show-Ready Grooming', duration: '5 min', completed: false },
      { title: 'Winter Coat Care', duration: '4 min', completed: false },
    ]
  },
  'horse-breeds': {
    id: 'horse-breeds',
    title: 'Horse Breeds Around the World',
    description: 'Discover different breeds and their unique traits',
    icon: MapPin,
    color: 'bg-blue-500',
    difficulty: 'Beginner',
    lessons: [
      { title: 'Introduction to Horse Breeds', duration: '5 min', completed: false },
      { title: 'American Quarter Horse', duration: '5 min', completed: false },
      { title: 'Arabian Horses', duration: '5 min', completed: false },
      { title: 'Thoroughbreds', duration: '5 min', completed: false },
      { title: 'Clydesdales & Draft Horses', duration: '5 min', completed: false },
      { title: 'Appaloosas', duration: '5 min', completed: false },
      { title: 'Paint Horses', duration: '5 min', completed: false },
      { title: 'Mustangs & Wild Horses', duration: '5 min', completed: false },
      { title: 'Miniature Horses', duration: '5 min', completed: false },
      { title: 'International Breeds', duration: '5 min', completed: false },
      { title: 'Choosing the Right Breed', duration: '5 min', completed: false },
      { title: 'Breed Quiz', duration: '5 min', completed: false },
    ]
  },
  'horse-behavior': {
    id: 'horse-behavior',
    title: 'Understanding Horse Behavior',
    description: 'Learn to read body language and communicate with horses',
    icon: Footprints,
    color: 'bg-violet-500',
    difficulty: 'Intermediate',
    lessons: [
      { title: 'Horse Psychology Basics', duration: '6 min', completed: false },
      { title: 'Reading Ear Positions', duration: '5 min', completed: false },
      { title: 'Understanding Tail Signals', duration: '5 min', completed: false },
      { title: 'Eye & Facial Expressions', duration: '6 min', completed: false },
      { title: 'Horse Vocalizations', duration: '5 min', completed: false },
      { title: 'Body Posture Meanings', duration: '7 min', completed: false },
      { title: 'Building Trust & Bonding', duration: '8 min', completed: false },
      { title: 'Calming Anxious Horses', duration: '8 min', completed: false },
    ]
  },
  'horse-safety': {
    id: 'horse-safety',
    title: 'Safety First',
    description: 'Important safety rules for being around horses',
    icon: Shield,
    color: 'bg-red-500',
    difficulty: 'Beginner',
    lessons: [
      { title: 'Approaching Horses Safely', duration: '5 min', completed: true },
      { title: 'Leading & Handling', duration: '5 min', completed: true },
      { title: 'Barn & Stable Safety', duration: '5 min', completed: true },
      { title: 'Essential Riding Gear', duration: '5 min', completed: true },
      { title: 'Trail Safety Tips', duration: '5 min', completed: true },
    ]
  },
  'rodeo-101': {
    id: 'rodeo-101',
    title: 'Rodeo 101',
    description: 'Learn about rodeo events, history, and culture',
    icon: Sparkles,
    color: 'bg-orange-500',
    difficulty: 'Beginner',
    lessons: [
      { title: 'History of Rodeo', duration: '6 min', completed: false },
      { title: 'Barrel Racing', duration: '5 min', completed: false },
      { title: 'Roping Events', duration: '5 min', completed: false },
      { title: 'Bull Riding', duration: '5 min', completed: false },
      { title: 'Bronc Riding', duration: '5 min', completed: false },
      { title: 'Rodeo Clowns & Safety', duration: '4 min', completed: false },
      { title: 'Junior Rodeo Events', duration: '5 min', completed: false },
      { title: 'Rodeo Etiquette', duration: '4 min', completed: false },
      { title: 'Famous Rodeo Champions', duration: '5 min', completed: false },
      { title: 'Finding Rodeos Near You', duration: '4 min', completed: false },
    ]
  },
};

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const [course, setCourse] = useState(courseData[courseId]);
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);

  useEffect(() => {
    if (courseId && courseData[courseId]) {
      setCourse(courseData[courseId]);
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="text-base-content/60 mb-6">This course doesn&apos;t exist or is coming soon!</p>
        <Link href="/learn" className="btn btn-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Horse Academy
        </Link>
      </div>
    );
  }

  const completedCount = course.lessons.filter(l => l.completed).length;
  const progress = Math.round((completedCount / course.lessons.length) * 100);
  const IconComponent = course.icon;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link href="/learn" className="inline-flex items-center text-sm text-base-content/60 hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Horse Academy
        </Link>
        
        <div className="flex items-start gap-4">
          <div className={`p-4 rounded-2xl ${course.color} text-white`}>
            <IconComponent className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-base-content">{course.title}</h1>
            <p className="text-base-content/60 mt-1">{course.description}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1 text-sm text-base-content/60">
                <BookOpen className="w-4 h-4" />
                {course.lessons.length} lessons
              </span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                course.difficulty === 'Beginner' 
                  ? 'bg-emerald-500/20 text-emerald-600' 
                  : 'bg-amber-500/20 text-amber-600'
              }`}>
                {course.difficulty}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="ranch-card p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Your Progress</span>
          <span className="text-primary font-semibold">{progress}%</span>
        </div>
        <div className="h-3 bg-base-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </div>
        <p className="text-sm text-base-content/60 mt-2">
          {completedCount} of {course.lessons.length} lessons completed
        </p>
      </motion.div>

      {/* Lessons List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="ranch-card overflow-hidden"
      >
        <div className="p-4 border-b border-base-200 bg-base-100/50">
          <h2 className="font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Course Lessons
          </h2>
        </div>
        <div className="divide-y divide-base-200">
          {course.lessons.map((lesson, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setCurrentLesson(currentLesson === index ? null : index)}
              className={`w-full p-4 flex items-center gap-4 text-left hover:bg-base-100 transition-colors ${
                currentLesson === index ? 'bg-primary/5' : ''
              }`}
            >
              {lesson.completed ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-base-content/30 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${lesson.completed ? 'text-base-content/60' : 'text-base-content'}`}>
                  {lesson.title}
                </p>
                <p className="text-xs text-base-content/50 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {lesson.duration}
                </p>
              </div>
              <ChevronRight className={`w-5 h-5 text-base-content/30 transition-transform ${
                currentLesson === index ? 'rotate-90' : ''
              }`} />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Current Lesson Preview */}
      {currentLesson !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="ranch-card p-6 mt-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl ${course.color} text-white`}>
              <Play className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">{course.lessons[currentLesson].title}</h3>
              <p className="text-sm text-base-content/60">{course.lessons[currentLesson].duration}</p>
            </div>
          </div>
          <div className="bg-base-200 rounded-xl p-8 text-center">
            <BookOpen className="w-12 h-12 text-base-content/30 mx-auto mb-3" />
            <p className="text-base-content/60">
              Course content coming soon! 🐴
            </p>
            <p className="text-sm text-base-content/40 mt-2">
              This lesson will be available in a future update.
            </p>
          </div>
          {!course.lessons[currentLesson].completed && (
            <button className="btn btn-primary w-full mt-4">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark as Complete
            </button>
          )}
        </motion.div>
      )}

      {/* Achievement Preview */}
      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ranch-card p-6 mt-8 bg-gradient-to-r from-amber-500/10 to-transparent border-amber-500/30"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/20">
              <Award className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-base-content">🎉 Course Completed!</h3>
              <p className="text-sm text-base-content/60">
                You&apos;ve earned 50 XP and the &quot;{course.title} Expert&quot; badge!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
