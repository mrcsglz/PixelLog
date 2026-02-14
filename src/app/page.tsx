"use client";

import { useGameStore } from "@/hooks/useGameStore";
import { GameCard } from "@/components/GameCard";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Home() {
  const { games, mounted } = useGameStore();

  if (!mounted) return null;

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100">Your Collection</h2>
          <p className="text-slate-400 text-sm mt-1">
            {games.length} {games.length === 1 ? 'game' : 'games'} rated
          </p>
        </div>
        <Link
          href="/rate"
          className="flex items-center gap-2 bg-slate-100 text-slate-900 px-4 py-2 rounded-full font-bold hover:bg-white transition-colors animate-pulse hover:animate-none"
        >
          <Plus size={18} /> Rate New Game
        </Link>
      </div>

      {games.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-slate-900/50 rounded-3xl border border-slate-800 border-dashed">
          <p className="text-xl mb-4">No games rated yet.</p>
          <Link href="/rate" className="text-violet-400 hover:underline underline-offset-4">
            Start your first review &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
