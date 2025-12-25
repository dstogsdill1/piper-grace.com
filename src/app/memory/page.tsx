'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const allImages = [
  '/images/piper2.jpg', '/images/piper3.jpg', '/images/piper4.jpg', '/images/piper5.jpg',
  '/images/piper6.jpg', '/images/piper7.jpg', '/images/Piper8.jpg', '/images/piper9.jpg',
  '/images/piper10.jpg', '/images/piper11.jpg', '/images/piper12.jpg', '/images/piper13.jpg', '/images/pirer1.jpg',
];

interface Card { id: number; src: string; isFlipped: boolean; isMatched: boolean; }

export default function MemoryPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const shuffleCards = () => {
    const shuffledImages = [...allImages].sort(() => 0.5 - Math.random()).slice(0, 6);
    const cardDeck = [...shuffledImages, ...shuffledImages].sort(() => Math.random() - 0.5).map((src) => ({ id: Math.random(), src, isFlipped: false, isMatched: false }));
    setChoiceOne(null); setChoiceTwo(null); setCards(cardDeck); setTurns(0); setWon(false);
  };

  const handleChoice = (card: Card) => { choiceOne ? setChoiceTwo(card) : setChoiceOne(card); };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => prevCards.map(card => card.src === choiceOne.src ? { ...card, isMatched: true } : card));
        resetTurn();
      } else { setTimeout(() => resetTurn(), 1000); }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => { if (cards.length > 0 && cards.every(card => card.isMatched)) setWon(true); }, [cards]);

  const resetTurn = () => { setChoiceOne(null); setChoiceTwo(null); setTurns(prevTurns => prevTurns + 1); setDisabled(false); };

  useEffect(() => { shuffleCards(); }, []);

  return (
    <div className="flex flex-col items-center gap-8 pb-10">
      {won && <Confetti recycle={false} numberOfPieces={500} />}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-success mb-2">Memory Game! 🧠</h1>
        <p className="text-xl font-bold text-base-content/70">Turns: {turns}</p>
        <button onClick={shuffleCards} className="btn btn-primary mt-4 btn-lg rounded-full shadow-md">New Game</button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map(card => <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.isMatched} disabled={disabled} />)}
      </div>
      {won && <div className="alert alert-success shadow-lg max-w-md animate-bounce"><div className="flex items-center gap-2"><span className="text-2xl">🏆</span><span className="font-bold text-lg">You found all the matches! Amazing!</span></div></div>}
    </div>
  );
}

function SingleCard({ card, handleChoice, flipped, disabled }: { card: Card, handleChoice: (card: Card) => void, flipped: boolean, disabled: boolean }) {
  const handleClick = () => { if (!disabled && !flipped) handleChoice(card); };
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 cursor-pointer" onClick={handleClick}>
      <motion.div className="w-full h-full relative" initial={false} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6 }} style={{ transformStyle: "preserve-3d" }}>
        <div className="absolute w-full h-full rounded-xl overflow-hidden border-4 border-success shadow-lg bg-white" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
          <img src={card.src} alt="card front" className="w-full h-full object-cover" />
        </div>
        <div className="absolute w-full h-full bg-success rounded-xl border-4 border-white shadow-lg flex items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
          <span className="text-4xl">🐴</span>
        </div>
      </motion.div>
    </div>
  );
}