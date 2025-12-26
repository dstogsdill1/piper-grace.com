'use client';

import { useState, useEffect, useCallback } from 'react';
import { HorseData, DEFAULT_HORSE, loadHorseData, saveHorseData } from '@/lib/horse-data';

export function useHorse() {
  const [horse, setHorse] = useState<HorseData>(DEFAULT_HORSE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load horse data on mount
  useEffect(() => {
    const data = loadHorseData();
    setHorse(data);
    setIsLoaded(true);
  }, []);

  // Save horse data
  const saveHorse = useCallback((updates?: Partial<HorseData>) => {
    const updatedHorse = updates ? { ...horse, ...updates } : horse;
    setHorse(updatedHorse);
    saveHorseData(updatedHorse);
    return updatedHorse;
  }, [horse]);

  // Update a single field
  const updateHorse = useCallback((field: keyof HorseData, value: HorseData[keyof HorseData]) => {
    const updated = { ...horse, [field]: value };
    setHorse(updated);
    return updated;
  }, [horse]);

  // Update multiple fields
  const updateHorseFields = useCallback((updates: Partial<HorseData>) => {
    const updated = { ...horse, ...updates };
    setHorse(updated);
    return updated;
  }, [horse]);

  // Toggle an accessory
  const toggleAccessory = useCallback((accessoryId: string) => {
    const accessories = horse.accessories.includes(accessoryId)
      ? horse.accessories.filter(a => a !== accessoryId)
      : [...horse.accessories, accessoryId];
    const updated = { ...horse, accessories };
    setHorse(updated);
    return updated;
  }, [horse]);

  // Set name
  const setName = useCallback((name: string) => {
    const updated = { ...horse, name };
    setHorse(updated);
    saveHorseData(updated);
    return updated;
  }, [horse]);

  // Randomize horse
  const randomizeHorse = useCallback(() => {
    const random = {
      ...horse,
      breed: ['quarter', 'arabian', 'paint', 'appaloosa', 'mustang', 'clydesdale', 'unicorn', 'pegasus'][Math.floor(Math.random() * 8)],
      coatColor: ['#c4a35a', '#1a1a1a', '#f5f5f5', '#8B4513', '#FF69B4', '#9370DB', '#4169E1', '#FFD700'][Math.floor(Math.random() * 8)],
      maneStyle: ['natural', 'braided', 'flowing', 'mohawk', 'curly', 'short'][Math.floor(Math.random() * 6)],
      maneColor: ['#2c2c2c', '#F5DEB3', '#FFFFFF', '#FF69B4', '#8B008B'][Math.floor(Math.random() * 5)],
      marking: ['none', 'star', 'blaze', 'socks', 'spots'][Math.floor(Math.random() * 5)],
      personality: ['brave', 'gentle', 'playful', 'loyal', 'wise', 'adventurous', 'mysterious', 'silly'][Math.floor(Math.random() * 8)],
      speed: Math.floor(Math.random() * 10) + 1,
      jumping: Math.floor(Math.random() * 10) + 1,
      stamina: Math.floor(Math.random() * 10) + 1,
      friendliness: Math.floor(Math.random() * 10) + 1,
    };
    setHorse(random);
    return random;
  }, [horse]);

  return {
    horse,
    isLoaded,
    setHorse,
    saveHorse,
    updateHorse,
    updateHorseFields,
    toggleAccessory,
    setName,
    randomizeHorse,
  };
}
