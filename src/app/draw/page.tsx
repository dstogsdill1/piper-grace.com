'use client';

import { useRef, useState } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { Eraser, Trash2, Undo, Download } from 'lucide-react';

export default function DrawPage() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [color, setColor] = useState('#ff0000');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [eraseMode, setEraseMode] = useState(false);

  const colors = ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#0099ff', '#6600ff', '#ff00ff', '#000000', '#8B4513', '#A0522D'];

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-accent">Draw Your Masterpiece! 🎨</h1>
      <div className="flex flex-wrap gap-4 justify-center items-center bg-base-100 p-4 rounded-box shadow-lg border-2 border-accent/20">
        <div className="flex gap-2">
          {colors.map((c) => (
            <button key={c} className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${color === c && !eraseMode ? 'border-black scale-110 ring-2 ring-offset-2 ring-accent' : 'border-transparent'}`} style={{ backgroundColor: c }} onClick={() => { setColor(c); setEraseMode(false); canvasRef.current?.eraseMode(false); }} />
          ))}
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex gap-2">
          <button className={`btn btn-circle ${eraseMode ? 'btn-primary' : 'btn-ghost text-accent'}`} onClick={() => { setEraseMode(!eraseMode); canvasRef.current?.eraseMode(!eraseMode); }} title="Eraser"><Eraser /></button>
          <button className="btn btn-circle btn-ghost text-accent" onClick={() => canvasRef.current?.undo()} title="Undo"><Undo /></button>
          <button className="btn btn-circle btn-ghost text-error" onClick={() => canvasRef.current?.clearCanvas()} title="Clear"><Trash2 /></button>
          <button className="btn btn-circle btn-ghost text-success" onClick={() => { canvasRef.current?.exportImage("png").then(data => { const link = document.createElement('a'); link.href = data; link.download = 'piper-art.png'; link.click(); }).catch(e => console.error(e)); }} title="Save"><Download /></button>
        </div>
      </div>
      <div className="w-full h-[60vh] border-4 border-accent rounded-xl overflow-hidden shadow-2xl bg-white">
        <ReactSketchCanvas ref={canvasRef} strokeWidth={strokeWidth} strokeColor={color} canvasColor="white" />
      </div>
    </div>
  );
}