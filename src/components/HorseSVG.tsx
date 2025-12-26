'use client';

import { motion } from 'framer-motion';
import { HorseData, getBreedInfo, hasAccessory } from '@/lib/horse-data';

interface HorseSVGProps {
  horse: HorseData;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showName?: boolean;
  className?: string;
}

const SIZES = {
  sm: { width: 80, height: 80 },
  md: { width: 150, height: 150 },
  lg: { width: 250, height: 250 },
  xl: { width: 400, height: 400 },
};

// Rainbow gradient definition
function RainbowDefs() {
  return (
    <defs>
      <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF0000" />
        <stop offset="17%" stopColor="#FF7F00" />
        <stop offset="33%" stopColor="#FFFF00" />
        <stop offset="50%" stopColor="#00FF00" />
        <stop offset="67%" stopColor="#0000FF" />
        <stop offset="83%" stopColor="#4B0082" />
        <stop offset="100%" stopColor="#9400D3" />
      </linearGradient>
      <linearGradient id="rainbowMane" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF69B4" />
        <stop offset="25%" stopColor="#9370DB" />
        <stop offset="50%" stopColor="#4169E1" />
        <stop offset="75%" stopColor="#48D1CC" />
        <stop offset="100%" stopColor="#98FB98" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
  );
}

// Base horse body
function HorseBody({ color, marking }: { color: string; marking: string }) {
  const fillColor = color === 'rainbow' ? 'url(#rainbowGradient)' : color;
  const markingColor = '#FFFFFF';
  
  return (
    <g>
      {/* Body */}
      <ellipse cx="100" cy="120" rx="55" ry="40" fill={fillColor} />
      
      {/* Chest */}
      <ellipse cx="145" cy="105" rx="20" ry="25" fill={fillColor} />
      
      {/* Rear */}
      <ellipse cx="55" cy="115" rx="25" ry="30" fill={fillColor} />
      
      {/* Spots marking */}
      {marking === 'spots' && (
        <g fill={markingColor} opacity="0.8">
          <circle cx="80" cy="110" r="8" />
          <circle cx="100" cy="125" r="6" />
          <circle cx="120" cy="108" r="7" />
          <circle cx="60" cy="120" r="5" />
          <circle cx="90" cy="140" r="4" />
        </g>
      )}
      
      {/* Patches marking */}
      {marking === 'patches' && (
        <g fill={markingColor} opacity="0.85">
          <ellipse cx="75" cy="115" rx="20" ry="15" />
          <ellipse cx="115" cy="125" rx="15" ry="12" />
        </g>
      )}
    </g>
  );
}

// Horse head and neck
function HorseHead({ color, maneColor, maneStyle, marking }: { 
  color: string; 
  maneColor: string; 
  maneStyle: string;
  marking: string;
}) {
  const fillColor = color === 'rainbow' ? 'url(#rainbowGradient)' : color;
  const maneFill = maneColor === 'rainbow' ? 'url(#rainbowMane)' : maneColor;
  const markingColor = '#FFFFFF';
  
  return (
    <g>
      {/* Neck */}
      <path 
        d="M 145 100 Q 165 70 160 40" 
        stroke={fillColor} 
        strokeWidth="28" 
        fill="none" 
        strokeLinecap="round" 
      />
      
      {/* Head */}
      <ellipse cx="165" cy="35" rx="25" ry="20" fill={fillColor} />
      
      {/* Muzzle */}
      <ellipse cx="182" cy="42" rx="12" ry="10" fill={fillColor} />
      
      {/* Ear */}
      <path d="M 155 18 L 160 0 L 170 15 Z" fill={fillColor} />
      
      {/* Eye */}
      <ellipse cx="168" cy="30" rx="5" ry="4" fill="#222" />
      <circle cx="169" cy="29" r="1.5" fill="white" />
      
      {/* Nostril */}
      <circle cx="188" cy="45" r="2" fill="#333" />
      
      {/* Star marking on forehead */}
      {marking === 'star' && (
        <polygon 
          points="165,22 167,28 173,28 168,32 170,38 165,34 160,38 162,32 157,28 163,28" 
          fill={markingColor} 
        />
      )}
      
      {/* Blaze marking - stripe down face */}
      {marking === 'blaze' && (
        <path 
          d="M 165 15 Q 168 25 168 35 Q 170 42 175 48" 
          stroke={markingColor} 
          strokeWidth="8" 
          fill="none"
          strokeLinecap="round"
        />
      )}
      
      {/* Snip marking - on nose */}
      {marking === 'snip' && (
        <ellipse cx="182" cy="47" rx="6" ry="5" fill={markingColor} />
      )}
      
      {/* Mane */}
      <Mane style={maneStyle} color={maneFill} />
    </g>
  );
}

// Different mane styles
function Mane({ style, color }: { style: string; color: string }) {
  switch (style) {
    case 'natural':
      return (
        <g fill={color}>
          <path d="M 145 20 Q 140 10 150 5 Q 155 15 160 8 Q 158 20 155 25 Q 148 20 145 30 Z" />
          <path d="M 145 30 Q 138 25 135 35 Q 140 45 145 55 Q 150 45 148 35 Z" />
          <path d="M 138 50 Q 130 55 132 70 Q 140 75 148 80 Q 150 65 145 55 Z" />
        </g>
      );
    case 'braided':
      return (
        <g fill={color}>
          <circle cx="152" cy="10" r="6" />
          <circle cx="145" cy="25" r="6" />
          <circle cx="140" cy="42" r="6" />
          <circle cx="137" cy="60" r="6" />
          <circle cx="135" cy="78" r="6" />
          <path d="M 152 16 Q 148 20 145 31" stroke={color} strokeWidth="3" fill="none" />
          <path d="M 145 31 Q 142 36 140 48" stroke={color} strokeWidth="3" fill="none" />
        </g>
      );
    case 'flowing':
      return (
        <g fill={color}>
          <path d="M 145 15 Q 125 10 115 25 Q 120 40 110 55 Q 125 50 120 70 Q 140 75 135 90 Q 150 80 145 65 Q 155 55 150 40 Q 160 30 155 20 Z" opacity="0.9" />
          <path d="M 148 18 Q 130 15 125 30" stroke={color} strokeWidth="4" fill="none" />
        </g>
      );
    case 'mohawk':
      return (
        <g fill={color}>
          <path d="M 155 0 L 160 15 L 165 0 Z" />
          <path d="M 150 10 L 158 25 L 162 10 Z" />
          <path d="M 145 25 L 155 40 L 160 25 Z" />
          <path d="M 140 40 L 150 55 L 158 40 Z" />
          <path d="M 135 55 L 145 70 L 152 55 Z" />
          <path d="M 130 70 L 140 85 L 148 70 Z" />
        </g>
      );
    case 'curly':
      return (
        <g fill={color}>
          <circle cx="153" cy="8" r="7" />
          <circle cx="145" cy="18" r="8" />
          <circle cx="138" cy="32" r="8" />
          <circle cx="132" cy="48" r="9" />
          <circle cx="128" cy="66" r="9" />
          <circle cx="127" cy="82" r="8" />
        </g>
      );
    case 'short':
      return (
        <g fill={color}>
          <path d="M 150 12 Q 145 8 155 5 Q 160 15 157 20 Q 150 18 150 12 Z" />
          <path d="M 145 22 Q 140 18 145 28 Q 150 30 148 25 Z" />
        </g>
      );
    default:
      return null;
  }
}

// Horse legs
function HorseLegs({ color, marking }: { color: string; marking: string }) {
  const fillColor = color === 'rainbow' ? 'url(#rainbowGradient)' : color;
  const markingColor = '#FFFFFF';
  const showSocks = marking === 'socks' || marking === 'stockings';
  const sockHeight = marking === 'stockings' ? 35 : 20;
  
  return (
    <g>
      {/* Front left leg */}
      <rect x="125" y="145" width="12" height="50" rx="5" fill={fillColor} />
      <ellipse cx="131" cy="197" rx="8" ry="5" fill="#333" /> {/* Hoof */}
      {showSocks && <rect x="125" y={195 - sockHeight} width="12" height={sockHeight} rx="3" fill={markingColor} />}
      
      {/* Front right leg */}
      <rect x="140" y="140" width="12" height="55" rx="5" fill={fillColor} />
      <ellipse cx="146" cy="197" rx="8" ry="5" fill="#333" />
      {showSocks && <rect x="140" y={195 - sockHeight} width="12" height={sockHeight} rx="3" fill={markingColor} />}
      
      {/* Back left leg */}
      <rect x="50" y="140" width="14" height="55" rx="5" fill={fillColor} />
      <ellipse cx="57" cy="197" rx="9" ry="5" fill="#333" />
      {showSocks && <rect x="50" y={195 - sockHeight} width="14" height={sockHeight} rx="3" fill={markingColor} />}
      
      {/* Back right leg */}
      <rect x="68" y="145" width="14" height="50" rx="5" fill={fillColor} />
      <ellipse cx="75" cy="197" rx="9" ry="5" fill="#333" />
      {showSocks && <rect x="68" y={195 - sockHeight} width="14" height={sockHeight} rx="3" fill={markingColor} />}
    </g>
  );
}

// Tail
function HorseTail({ color, maneStyle }: { color: string; maneStyle: string }) {
  const fillColor = color === 'rainbow' ? 'url(#rainbowMane)' : color;
  
  if (maneStyle === 'braided') {
    return (
      <g fill={fillColor}>
        <circle cx="30" cy="110" r="6" />
        <circle cx="22" cy="125" r="6" />
        <circle cx="18" cy="142" r="6" />
        <circle cx="20" cy="160" r="5" />
        <path d="M 30 116 Q 26 120 22 131" stroke={fillColor} strokeWidth="3" fill="none" />
      </g>
    );
  }
  
  return (
    <path 
      d="M 35 105 Q 15 110 10 130 Q 5 150 15 170 Q 25 175 30 165 Q 20 145 25 125 Q 28 115 35 105 Z" 
      fill={fillColor}
    />
  );
}

// Accessories layer
function Accessories({ horse }: { horse: HorseData }) {
  const color = horse.accessoryColor;
  
  return (
    <g>
      {/* Unicorn horn */}
      {(horse.breed === 'unicorn' || hasAccessory(horse, 'horn')) && (
        <g>
          <path d="M 163 5 L 165 -20 L 170 5 Z" fill="#FFD700" stroke="#FFA500" strokeWidth="1" />
          <path d="M 164 0 L 165 -15" stroke="#FFA500" strokeWidth="1" />
          <path d="M 166 -5 L 167 -10" stroke="#FFA500" strokeWidth="1" />
        </g>
      )}
      
      {/* Wings */}
      {(horse.breed === 'pegasus' || hasAccessory(horse, 'wings')) && (
        <g fill="#E8E8FF" stroke="#B0B0D0" strokeWidth="1" opacity="0.9">
          <path d="M 90 90 Q 60 60 40 30 Q 55 40 70 35 Q 50 50 55 60 Q 75 55 80 70 Q 70 75 75 85 Q 85 80 90 90 Z" />
          <path d="M 110 90 Q 140 60 160 30 Q 145 40 130 35 Q 150 50 145 60 Q 125 55 120 70 Q 130 75 125 85 Q 115 80 110 90 Z" />
        </g>
      )}
      
      {/* Crown */}
      {hasAccessory(horse, 'crown') && (
        <g>
          <path d="M 150 0 L 148 -15 L 155 -8 L 162 -18 L 168 -8 L 175 -15 L 172 0 Z" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
          <circle cx="155" cy="-10" r="2" fill="#E0115F" />
          <circle cx="168" cy="-10" r="2" fill="#4169E1" />
        </g>
      )}
      
      {/* Flower crown */}
      {hasAccessory(horse, 'flower-crown') && (
        <g>
          <circle cx="150" cy="5" r="5" fill="#FF69B4" />
          <circle cx="160" cy="2" r="4" fill="#FFB6C1" />
          <circle cx="170" cy="5" r="5" fill="#FF1493" />
          <circle cx="155" cy="0" r="3" fill="#FFC0CB" />
          <circle cx="165" cy="-2" r="3" fill="#FF69B4" />
        </g>
      )}
      
      {/* Bridle */}
      {hasAccessory(horse, 'bridle') && (
        <g stroke={color} strokeWidth="2" fill="none">
          <path d="M 158 25 Q 150 30 155 45 Q 165 50 175 48" />
          <path d="M 155 25 L 178 32" />
          <circle cx="165" cy="50" r="3" fill={color} />
        </g>
      )}
      
      {/* Halter */}
      {hasAccessory(horse, 'halter') && (
        <g stroke={color} strokeWidth="2" fill="none">
          <path d="M 158 28 L 175 35 L 188 42" />
          <path d="M 165 25 Q 160 35 165 45" />
        </g>
      )}
      
      {/* Saddle */}
      {(hasAccessory(horse, 'western-saddle') || hasAccessory(horse, 'english-saddle') || hasAccessory(horse, 'racing-saddle')) && (
        <g>
          <ellipse cx="95" cy="105" rx="25" ry="15" fill={color} />
          <path d="M 75 105 Q 70 90 80 85 Q 90 88 95 95" fill={color} />
          {hasAccessory(horse, 'western-saddle') && (
            <path d="M 80 85 Q 75 75 85 70 L 90 80" fill={color} stroke="#333" strokeWidth="1" />
          )}
          {hasAccessory(horse, 'racing-saddle') && (
            <ellipse cx="95" cy="105" rx="18" ry="10" fill={color} />
          )}
        </g>
      )}
      
      {/* Bareback pad */}
      {hasAccessory(horse, 'bareback-pad') && (
        <ellipse cx="95" cy="108" rx="28" ry="12" fill={color} opacity="0.9" />
      )}
      
      {/* Blanket */}
      {(hasAccessory(horse, 'blanket') || hasAccessory(horse, 'show-blanket')) && (
        <g>
          <path d="M 55 100 Q 50 110 55 135 L 145 135 Q 150 110 145 100 Z" fill={color} opacity="0.85" />
          {hasAccessory(horse, 'show-blanket') && (
            <path d="M 60 115 L 140 115" stroke="#FFD700" strokeWidth="3" />
          )}
        </g>
      )}
      
      {/* Mane ribbons */}
      {hasAccessory(horse, 'ribbons') && (
        <g>
          <path d="M 145 25 Q 135 30 130 40 Q 140 38 145 25" fill="#FF69B4" />
          <path d="M 140 45 Q 130 50 125 60 Q 135 58 140 45" fill="#FF1493" />
          <path d="M 135 65 Q 125 70 120 80 Q 130 78 135 65" fill="#FF69B4" />
        </g>
      )}
      
      {/* Leg wraps */}
      {hasAccessory(horse, 'leg-wraps') && (
        <g fill={color}>
          <rect x="125" y="165" width="12" height="25" rx="2" opacity="0.8" />
          <rect x="140" y="165" width="12" height="25" rx="2" opacity="0.8" />
          <rect x="50" y="165" width="14" height="25" rx="2" opacity="0.8" />
          <rect x="68" y="165" width="14" height="25" rx="2" opacity="0.8" />
        </g>
      )}
      
      {/* Bell boots */}
      {hasAccessory(horse, 'bell-boots') && (
        <g fill={color}>
          <ellipse cx="131" cy="195" rx="10" ry="6" />
          <ellipse cx="146" cy="195" rx="10" ry="6" />
          <ellipse cx="57" cy="195" rx="11" ry="6" />
          <ellipse cx="75" cy="195" rx="11" ry="6" />
        </g>
      )}
    </g>
  );
}

export function HorseSVG({ 
  horse, 
  size = 'lg', 
  animated = true, 
  showName = false,
  className = '' 
}: HorseSVGProps) {
  const { width, height } = SIZES[size];
  const breed = getBreedInfo(horse.breed);
  
  const HorseGraphic = (
    <svg 
      viewBox="0 0 200 210" 
      width={width} 
      height={height}
      className={`drop-shadow-lg ${className}`}
      style={{ filter: 'url(#shadow)' }}
    >
      <RainbowDefs />
      <g>
        <HorseBody color={horse.coatColor} marking={horse.marking} />
        <HorseLegs color={horse.coatColor} marking={horse.marking} />
        <HorseTail color={horse.maneColor} maneStyle={horse.maneStyle} />
        <HorseHead 
          color={horse.coatColor} 
          maneColor={horse.maneColor} 
          maneStyle={horse.maneStyle}
          marking={horse.marking}
        />
        <Accessories horse={horse} />
      </g>
    </svg>
  );
  
  if (animated) {
    return (
      <div className="flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          {HorseGraphic}
        </motion.div>
        {showName && (
          <div className="text-center">
            <span className="text-2xl">{breed.icon}</span>
            <p className="font-bold text-lg">{horse.name}</p>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center gap-2">
      {HorseGraphic}
      {showName && (
        <div className="text-center">
          <span className="text-2xl">{breed.icon}</span>
          <p className="font-bold text-lg">{horse.name}</p>
        </div>
      )}
    </div>
  );
}

// Simple version for runner game (flipped horizontally, smaller)
export function HorseRunnerSVG({ horse, jumping = false }: { horse: HorseData; jumping?: boolean }) {
  return (
    <motion.div
      animate={jumping ? { y: [-80, 0] } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ transform: 'scaleX(-1)' }}
    >
      <HorseSVG horse={horse} size="sm" animated={false} />
    </motion.div>
  );
}

export default HorseSVG;
