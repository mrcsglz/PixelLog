import { Share2, RotateCcw, Check } from "lucide-react";
import { type GameRating, CATEGORIES, getScoreColor } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SummaryCardProps {
    game: GameRating;
    onSave: () => void;
}

export function SummaryCard({ game, onSave }: SummaryCardProps) {
    const router = useRouter();

    const handleFinish = () => {
        onSave();
        router.push("/");
    };

    return (
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-in fade-in zoom-in duration-500">
            <div className="flex flex-col md:flex-row">
                {/* Left: Image */}
                <div className="w-full md:w-1/3 relative h-96 md:h-auto">
                    <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-full object-cover absolute inset-0 md:relative"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Right: Content */}
                <div className="p-8 md:p-12 w-full md:w-2/3 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
                        {game.title}
                    </h2>
                    <div className="text-sm text-slate-400 mb-8 uppercase tracking-widest font-semibold">
                        Review Summary
                    </div>

                    <div className="flex items-center gap-6 mb-10">
                        <div className={`text-7xl font-black ${getScoreColor(game.finalScore)}`}>
                            {game.finalScore}
                        </div>
                        <div className="space-y-1">
                            <div className="text-xl text-slate-300 font-medium">Average Score</div>
                            <div className="flex gap-1 text-yellow-400">
                                {/* Simplified stars for summary */}
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className={`h-2 w-8 rounded-full ${i < game.stars ? 'bg-yellow-400' : 'bg-slate-700'}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Categories Grid (Top 4 or all?) Let's show all compact */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 text-sm">
                        {CATEGORIES.map(cat => (
                            game.ratings[cat.id] !== undefined && (
                                <div key={cat.id} className="flex justify-between border-b border-slate-800 pb-1">
                                    <span className="text-slate-400 truncate mr-2">{cat.label}</span>
                                    <span className={`font-bold ${getScoreColor(game.ratings[cat.id]!)}`}>
                                        {game.ratings[cat.id]}
                                    </span>
                                </div>
                            )
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleFinish}
                            className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl font-bold transition-transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <Check size={20} /> Save & Finish
                        </button>
                        <button className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
