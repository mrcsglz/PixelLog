import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Scoring Logic
export type RatingCategory = 
  | 'story'
  | 'characters'
  | 'audio'
  | 'art'
  | 'innovation'
  | 'gameplay'
  | 'duration'
  | 'world'
  | 'satisfaction';

export interface GameRating {
  id: string; // Game ID from API
  title: string;
  image: string;
  ratings: Partial<Record<RatingCategory, number>>;
  finalScore: number; // 0-10
  stars: number; // 0-5
  timestamp: number;
  review?: string;
}

export const CATEGORIES: { id: RatingCategory; label: string }[] = [
  { id: 'story', label: 'Historia / Narrativa' },
  { id: 'characters', label: 'Personajes' },
  { id: 'audio', label: 'Banda Sonora / Audio' },
  { id: 'art', label: 'Dirección Artística' },
  { id: 'innovation', label: 'Originalidad / Innovación' },
  { id: 'gameplay', label: 'Jugabilidad' },
  { id: 'duration', label: 'Duración / Ritmo' },
  { id: 'world', label: 'Diseño de Mundo' },
  { id: 'satisfaction', label: 'Satisfacción Personal' },
];

export function calculateScore(ratings: Partial<Record<RatingCategory, number>>): { finalScore: number; stars: number } {
  const values = Object.values(ratings).filter((v): v is number => typeof v === 'number');
  if (values.length === 0) return { finalScore: 0, stars: 0 };
  
  const sum = values.reduce((acc, curr) => acc + curr, 0);
  const avg = sum / values.length;
  
  // Round to 1 decimal
  const finalScore = Math.round(avg * 10) / 10;
  // Convert to stars (0-5), round to nearest 0.5
  const stars = Math.round((finalScore / 2) * 2) / 2;
  
  return { finalScore, stars };
}

export function getScoreColor(score: number): string {
  if (score >= 9) return 'text-emerald-400';
  if (score >= 7) return 'text-lime-400';
  if (score >= 5) return 'text-yellow-400';
  if (score >= 3) return 'text-orange-400';
  return 'text-red-400';
}
