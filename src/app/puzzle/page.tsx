'use client';

import { useState } from 'react';
import { JigsawPuzzle } from 'react-jigsaw-puzzle';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import Confetti from 'react-confetti';

// Using actual images from public/images folder
const images = [
  '/images/IMG_2655.jpg',
  '/images/IMG_3163.JPEG',
  '/images/IMG_3533.JPG',
  '/images/IMG_3777.JPG',
  '/images/IMG_3814.jpg',
  '/images/IMG_4274.JPG',
  '/images/IMG_4910.jpeg',
  '/images/IMG_6025.JPEG',
  '/images/IMG_9669.jpg',
  '/images/IMG_9802.jpeg',
  '/images/70076492137__D91E9AE1-A86A-418F-AC15-519CB2D40FCE.JPEG',
  '/images/E97A8D6D-1EE7-481D-B8C6-706DB72AC009.JPEG',
  '/images/F86C440D-2F80-419E-B3DA-66EC60D8D6FC.JPG',
];

export default function PuzzlePage() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [solved, setSolved] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 pb-10">
      {solved && <Confetti recycle={false} numberOfPieces={500} />}
      <h1 className="text-4xl font-bold text-info">Horse Puzzles! 🧩</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="join shadow-md">
          <button className={`join-item btn ${rows === 2 ? 'btn-primary' : 'btn-ghost'}`} onClick={() => { setRows(2); setColumns(2); setSolved(false); }}>Easy (2x2)</button>
          <button className={`join-item btn ${rows === 3 ? 'btn-primary' : 'btn-ghost'}`} onClick={() => { setRows(3); setColumns(3); setSolved(false); }}>Medium (3x3)</button>
          <button className={`join-item btn ${rows === 4 ? 'btn-primary' : 'btn-ghost'}`} onClick={() => { setRows(4); setColumns(4); setSolved(false); }}>Hard (4x4)</button>
        </div>
      </div>
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex space-x-4 px-4">
          {images.map((img, idx) => (
            <div key={idx} className="flex-none">
              <img src={img} className={`rounded-box h-24 w-24 object-cover cursor-pointer border-4 transition-all hover:scale-110 ${selectedImage === img ? 'border-primary scale-110 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`} onClick={() => { setSelectedImage(img); setSolved(false); }} alt={`Puzzle ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-3xl border-8 border-info/30 rounded-xl overflow-hidden shadow-2xl bg-white p-2 jigsaw-puzzle">
        <JigsawPuzzle imageSrc={selectedImage} rows={rows} columns={columns} onSolved={() => setSolved(true)} />
      </div>
      {solved && (
        <div className="alert alert-success shadow-lg max-w-md animate-bounce mt-4">
          <div className="flex items-center gap-2"><span className="text-2xl">🎉</span><span className="font-bold text-lg">Yay! You did it! Great job Piper!</span></div>
        </div>
      )}
    </div>
  );
}