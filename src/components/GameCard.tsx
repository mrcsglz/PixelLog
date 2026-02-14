import Link from "next/link";
import { Star } from "lucide-react";
import { type GameRating, getScoreColor } from "@/lib/utils";

interface GameCardProps {
    game: GameRating;
}

export function GameCard({ game }: GameCardProps) {
    return (
        <div className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-slate-800 shadow-md transition-all hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-violet-500/50">
            <img
                src={game.image}
                alt={game.title}
                className="h-full w-full object-cover transition-opacity group-hover:opacity-40"
            />

            {/* Overlay Content (Visible on Hover or always visible mini-badge) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/60 p-4 text-center">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{game.title}</h3>

                <div className="flex items-center gap-1 mb-1">
                    <span className={`text-2xl font-black ${getScoreColor(game.finalScore)}`}>
                        {game.finalScore}
                    </span>
                    <span className="text-xs text-slate-400">/ 10</span>
                </div>

                <div className="flex gap-0.5 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            fill={i < Math.floor(game.stars) ? "currentColor" : "none"}
                            className={i < game.stars ? "text-yellow-400" : "text-slate-600"}
                        />
                    ))}
                </div>
            </div>

            {/* Mini Badge (Always visible corner) */}
            <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-bold bg-black/80 backdrop-blur-sm ${getScoreColor(game.finalScore)}`}>
                {game.finalScore}
            </div>
        </div>
    );
}
