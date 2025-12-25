import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qmna1pqb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

// For mutations (write operations)
export const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qmna1pqb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Types for our Sanity documents
export interface SanityDiaryEntry {
  _id: string;
  _createdAt: string;
  title: string;
  content: string;
  mood: string;
  date: string;
}

export interface SanityPhoto {
  _id: string;
  _createdAt: string;
  caption: string;
  image: SanityImageSource;
}

export interface SanityHorse {
  _id: string;
  _createdAt: string;
  name: string;
  color: string;
  personality: string;
  story: string;
  image?: SanityImageSource;
}

export interface SanityScrapbook {
  _id: string;
  _createdAt: string;
  title: string;
  content: string;
  stickers: string[];
  backgroundColor: string;
}
