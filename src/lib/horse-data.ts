// ==================== HORSE DATA TYPES & CONSTANTS ====================

export interface HorseData {
  name: string;
  breed: string;
  coatColor: string;
  maneStyle: string;
  maneColor: string;
  marking: string;
  accessories: string[];
  accessoryColor: string;
  personality: string;
  speed: number;
  jumping: number;
  stamina: number;
  friendliness: number;
  savedAt?: string;
}

export const DEFAULT_HORSE: HorseData = {
  name: 'Spirit',
  breed: 'quarter',
  coatColor: '#c4a35a',
  maneStyle: 'natural',
  maneColor: '#2c2c2c',
  marking: 'none',
  accessories: [],
  accessoryColor: '#8B4513',
  personality: 'playful',
  speed: 5,
  jumping: 5,
  stamina: 5,
  friendliness: 8,
};

export const HORSE_BREEDS = [
  { id: 'quarter', name: 'Quarter Horse', description: 'Fast and agile', icon: '🐎' },
  { id: 'arabian', name: 'Arabian', description: 'Elegant and spirited', icon: '✨' },
  { id: 'paint', name: 'Paint Horse', description: 'Colorful and friendly', icon: '🎨' },
  { id: 'appaloosa', name: 'Appaloosa', description: 'Spotted beauty', icon: '🔵' },
  { id: 'mustang', name: 'Mustang', description: 'Wild and free', icon: '🌪️' },
  { id: 'clydesdale', name: 'Clydesdale', description: 'Big and gentle', icon: '💪' },
  { id: 'unicorn', name: 'Unicorn', description: 'Magical and rare!', icon: '🦄' },
  { id: 'pegasus', name: 'Pegasus', description: 'Winged wonder!', icon: '🪽' },
];

export const COAT_COLORS = [
  { name: 'Palomino', color: '#c4a35a', category: 'natural' },
  { name: 'Black', color: '#1a1a1a', category: 'natural' },
  { name: 'White', color: '#f5f5f5', category: 'natural' },
  { name: 'Chestnut', color: '#8B4513', category: 'natural' },
  { name: 'Bay', color: '#6B4423', category: 'natural' },
  { name: 'Gray', color: '#808080', category: 'natural' },
  { name: 'Buckskin', color: '#C19A6B', category: 'natural' },
  { name: 'Dun', color: '#B8860B', category: 'natural' },
  { name: 'Pink', color: '#FF69B4', category: 'fantasy' },
  { name: 'Purple', color: '#9370DB', category: 'fantasy' },
  { name: 'Blue', color: '#4169E1', category: 'fantasy' },
  { name: 'Mint', color: '#98FB98', category: 'fantasy' },
  { name: 'Coral', color: '#FF7F50', category: 'fantasy' },
  { name: 'Lavender', color: '#E6E6FA', category: 'fantasy' },
  { name: 'Gold', color: '#FFD700', category: 'fantasy' },
  { name: 'Rainbow', color: 'rainbow', category: 'fantasy' },
];

export const MANE_STYLES = [
  { id: 'natural', name: 'Natural', icon: '🌿' },
  { id: 'braided', name: 'Braided', icon: '🎀' },
  { id: 'flowing', name: 'Flowing', icon: '💨' },
  { id: 'mohawk', name: 'Mohawk', icon: '⚡' },
  { id: 'curly', name: 'Curly', icon: '🌀' },
  { id: 'short', name: 'Short Crop', icon: '✂️' },
];

export const MANE_COLORS = [
  { name: 'Natural', color: '#2c2c2c' },
  { name: 'Blonde', color: '#F5DEB3' },
  { name: 'White', color: '#FFFFFF' },
  { name: 'Red', color: '#8B0000' },
  { name: 'Pink', color: '#FF69B4' },
  { name: 'Purple', color: '#8B008B' },
  { name: 'Blue', color: '#0000CD' },
  { name: 'Rainbow', color: 'rainbow' },
];

export const MARKINGS = [
  { id: 'none', name: 'None', icon: '⬜' },
  { id: 'star', name: 'Star', description: 'White mark on forehead', icon: '⭐' },
  { id: 'blaze', name: 'Blaze', description: 'White stripe on face', icon: '|' },
  { id: 'snip', name: 'Snip', description: 'White mark on nose', icon: '△' },
  { id: 'socks', name: 'Socks', description: 'White lower legs', icon: '🧦' },
  { id: 'stockings', name: 'Stockings', description: 'White legs', icon: '🦵' },
  { id: 'spots', name: 'Spots', description: 'Spotted pattern', icon: '🔵' },
  { id: 'patches', name: 'Patches', description: 'Large patches', icon: '🎨' },
];

export const ACCESSORIES = [
  { id: 'none', name: 'None', category: 'tack', icon: '⬜' },
  { id: 'western-saddle', name: 'Western Saddle', category: 'tack', icon: '🤠' },
  { id: 'english-saddle', name: 'English Saddle', category: 'tack', icon: '🏇' },
  { id: 'racing-saddle', name: 'Racing Saddle', category: 'tack', icon: '⚡' },
  { id: 'bareback-pad', name: 'Bareback Pad', category: 'tack', icon: '🛋️' },
  { id: 'bridle', name: 'Classic Bridle', category: 'head', icon: '🔗' },
  { id: 'halter', name: 'Halter', category: 'head', icon: '⭕' },
  { id: 'flower-crown', name: 'Flower Crown', category: 'decoration', icon: '🌸' },
  { id: 'ribbons', name: 'Mane Ribbons', category: 'decoration', icon: '🎀' },
  { id: 'blanket', name: 'Horse Blanket', category: 'blanket', icon: '🧥' },
  { id: 'show-blanket', name: 'Show Blanket', category: 'blanket', icon: '✨' },
  { id: 'leg-wraps', name: 'Leg Wraps', category: 'legs', icon: '🩹' },
  { id: 'bell-boots', name: 'Bell Boots', category: 'legs', icon: '🔔' },
  { id: 'wings', name: 'Magical Wings', category: 'fantasy', icon: '🪽' },
  { id: 'horn', name: 'Unicorn Horn', category: 'fantasy', icon: '🦄' },
  { id: 'crown', name: 'Royal Crown', category: 'fantasy', icon: '👑' },
];

export const ACCESSORY_COLORS = [
  { name: 'Brown', color: '#8B4513' },
  { name: 'Black', color: '#1a1a1a' },
  { name: 'Pink', color: '#FF69B4' },
  { name: 'Purple', color: '#9370DB' },
  { name: 'Blue', color: '#4169E1' },
  { name: 'Red', color: '#DC143C' },
  { name: 'Gold', color: '#FFD700' },
  { name: 'Silver', color: '#C0C0C0' },
];

export const PERSONALITIES = [
  { id: 'brave', name: 'Brave', emoji: '🦁', description: 'Fearless and bold' },
  { id: 'gentle', name: 'Gentle', emoji: '🕊️', description: 'Kind and calm' },
  { id: 'playful', name: 'Playful', emoji: '🎉', description: 'Fun and energetic' },
  { id: 'loyal', name: 'Loyal', emoji: '💝', description: 'Best friend forever' },
  { id: 'wise', name: 'Wise', emoji: '🦉', description: 'Smart and thoughtful' },
  { id: 'adventurous', name: 'Adventurous', emoji: '🗺️', description: 'Loves exploring' },
  { id: 'mysterious', name: 'Mysterious', emoji: '🌙', description: 'Magical aura' },
  { id: 'silly', name: 'Silly', emoji: '🤪', description: 'Makes you laugh' },
];

export const BACKGROUNDS = [
  { id: 'studio', name: 'Studio', icon: '📷' },
  { id: 'meadow', name: 'Meadow', icon: '🌾' },
  { id: 'sunset', name: 'Sunset', icon: '🌅' },
  { id: 'night', name: 'Starry Night', icon: '🌙' },
  { id: 'beach', name: 'Beach', icon: '🏖️' },
  { id: 'mountains', name: 'Mountains', icon: '🏔️' },
  { id: 'forest', name: 'Forest', icon: '🌲' },
  { id: 'rainbow', name: 'Rainbow', icon: '🌈' },
];

// ==================== STORAGE FUNCTIONS ====================

const STORAGE_KEY = 'myHorseData';

export function loadHorseData(): HorseData {
  if (typeof window === 'undefined') return DEFAULT_HORSE;
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults to ensure all fields exist
      return { ...DEFAULT_HORSE, ...parsed };
    }
    
    // Fallback: check old storage keys for migration
    const oldColor = localStorage.getItem('myHorseColor');
    const oldName = localStorage.getItem('myHorseName');
    if (oldColor || oldName) {
      const migrated: HorseData = {
        ...DEFAULT_HORSE,
        coatColor: oldColor || DEFAULT_HORSE.coatColor,
        name: oldName || DEFAULT_HORSE.name,
      };
      saveHorseData(migrated);
      return migrated;
    }
  } catch (e) {
    console.error('Failed to load horse data:', e);
  }
  
  return DEFAULT_HORSE;
}

export function saveHorseData(horse: HorseData): void {
  if (typeof window === 'undefined') return;
  
  try {
    const data = { ...horse, savedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Keep old keys for backward compatibility
    localStorage.setItem('myHorseColor', horse.coatColor);
    localStorage.setItem('myHorseName', horse.name);
  } catch (e) {
    console.error('Failed to save horse data:', e);
  }
}

// ==================== HELPER FUNCTIONS ====================

export function getBreedInfo(breedId: string) {
  return HORSE_BREEDS.find(b => b.id === breedId) || HORSE_BREEDS[0];
}

export function getPersonalityInfo(personalityId: string) {
  return PERSONALITIES.find(p => p.id === personalityId) || PERSONALITIES[0];
}

export function getManeStyleInfo(styleId: string) {
  return MANE_STYLES.find(s => s.id === styleId) || MANE_STYLES[0];
}

export function getMarkingInfo(markingId: string) {
  return MARKINGS.find(m => m.id === markingId) || MARKINGS[0];
}

export function getAccessoryInfo(accessoryId: string) {
  return ACCESSORIES.find(a => a.id === accessoryId);
}

export function hasAccessory(horse: HorseData, accessoryId: string): boolean {
  return horse.accessories.includes(accessoryId);
}

export function isUnicorn(horse: HorseData): boolean {
  return horse.breed === 'unicorn' || hasAccessory(horse, 'horn');
}

export function isPegasus(horse: HorseData): boolean {
  return horse.breed === 'pegasus' || hasAccessory(horse, 'wings');
}

export function getHorseTitle(horse: HorseData): string {
  const breed = getBreedInfo(horse.breed);
  const personality = getPersonalityInfo(horse.personality);
  return `${horse.name} the ${personality.name} ${breed.name}`;
}
