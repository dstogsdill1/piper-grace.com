'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function RunnerGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const horseRef = useRef<HTMLDivElement>(null);
  const obstacleRef = useRef<HTMLDivElement>(null);
  const [isJumping, setIsJumping] = useState(false);

  const [horseColor, setHorseColor] = useState('#8B4513');

  useEffect(() => {
    const storedHighScore = localStorage.getItem('runnerHighScore');
    if (storedHighScore) setHighScore(parseInt(storedHighScore));
    
    const savedColor = localStorage.getItem('myHorseColor');
    if (savedColor) setHorseColor(savedColor);
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('runnerHighScore', score.toString());
    }
  }, [score, highScore]);

  const jump = () => {
    if (!isJumping && gameStarted && !gameOver) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameOver) {
      interval = setInterval(() => {
        setScore(s => s + 1);
        const horseTop = parseInt(window.getComputedStyle(horseRef.current!).getPropertyValue("top"));
        const obstacleLeft = parseInt(window.getComputedStyle(obstacleRef.current!).getPropertyValue("left"));
        if (obstacleLeft < 50 && obstacleLeft > 0 && horseTop >= 150) {
          setGameOver(true);
          setGameStarted(false);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (!gameStarted && gameOver) {
          setGameOver(false);
          setScore(0);
          setGameStarted(true);
        } else if (!gameStarted && !gameOver) {
          setGameStarted(true);
        } else {
          jump();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, isJumping]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full overflow-hidden relative bg-gradient-to-b from-sky-400 to-sky-200 dark:from-purple-900 dark:to-indigo-900 rounded-xl border-4 border-primary shadow-2xl">
      <div className="absolute top-4 right-4 flex flex-col items-end z-20">
        <div className="text-4xl font-black text-white drop-shadow-md">Score: {Math.floor(score / 10)}</div>
        <div className="text-xl font-bold text-yellow-300 drop-shadow-md">High Score: {Math.floor(highScore / 10)}</div>
      </div>
      <div className="relative w-full h-[300px] bg-transparent overflow-hidden" onClick={jump}>
        <div className="absolute bottom-0 w-full h-[20px] bg-green-600 dark:bg-emerald-800 border-t-4 border-green-800 dark:border-emerald-900 z-10"></div>
        <div ref={horseRef} className={`absolute left-[50px] w-[60px] h-[60px] transition-all duration-100 ease-linear z-20 ${isJumping ? 'animate-jump' : ''}`} style={{ top: isJumping ? '40px' : '220px' }}>
          <svg viewBox="0 0 24 24" fill={horseColor} className="w-full h-full drop-shadow-lg transform scale-x-[-1]">
            <rect x="14" y="2" width="6" height="5" rx="1" />
            <rect x="12" y="4" width="4" height="8" />
            <rect x="4" y="8" width="14" height="7" rx="2" />
            <rect x="6" y="15" width="3" height="7" rx="1" />
            <rect x="15" y="15" width="3" height="7" rx="1" />
            <rect x="2" y="9" width="2" height="4" rx="1" />
            <circle cx="17" cy="4.5" r="0.8" fill="white" />
          </svg>
        </div>
        <div ref={obstacleRef} className={`absolute bottom-[20px] w-[30px] h-[40px] z-20 ${gameStarted ? 'animate-slide' : 'left-[600px]'}`}>
           <div className="text-4xl">🚧</div>
        </div>
        <motion.div animate={{ x: [-100, 1000] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute top-10 left-0 text-6xl opacity-50">☁️</motion.div>
      </div>
      {(!gameStarted || gameOver) && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-30 backdrop-blur-sm">
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">{gameOver ? "GAME OVER" : "HORSE RUNNER"}</h1>
          <p className="text-2xl text-white mb-8 animate-pulse">Press SPACE or TAP to Jump</p>
          <button className="btn btn-primary btn-lg text-2xl px-10 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.5)] border-2 border-white" onClick={() => { setGameOver(false); setScore(0); setGameStarted(true); }}>{gameOver ? "TRY AGAIN" : "START RUNNING"}</button>
        </div>
      )}
      <style jsx>{`
        @keyframes slide { 0% { left: 100%; } 100% { left: -50px; } }
        .animate-slide { animation: slide 1.5s infinite linear; }
        .animate-jump { animation: jump 0.5s linear; }
        @keyframes jump { 0% { top: 230px; } 30% { top: 100px; } 70% { top: 100px; } 100% { top: 230px; } }
      `}</style>
    </div>
  );
}