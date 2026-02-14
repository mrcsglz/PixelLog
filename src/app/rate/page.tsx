"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchModal } from "@/components/SearchModal";
import { RatingForm } from "@/components/RatingForm";
import { SummaryCard } from "@/components/SummaryCard";
import { useGameStore } from "@/hooks/useGameStore";
import { type RawgGame } from "@/lib/api";
import { type GameRating, type RatingCategory } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type Step = "search" | "rate" | "summary";

export default function RatePage() {
    const [step, setStep] = useState<Step>("search");
    const [selectedGame, setSelectedGame] = useState<RawgGame | null>(null);
    const [currentRating, setCurrentRating] = useState<Partial<GameRating> | null>(null);

    const { addRating } = useGameStore();

    const handleSelectGame = (game: RawgGame) => {
        setSelectedGame(game);
        setStep("rate");
    };

    const handleRate = (ratings: Partial<Record<RatingCategory, number>>, finalScore: number, stars: number) => {
        if (!selectedGame) return;

        const gameRating: GameRating = {
            id: selectedGame.id.toString(),
            title: selectedGame.name,
            image: selectedGame.background_image,
            ratings,
            finalScore,
            stars,
            timestamp: Date.now(),
        };

        setCurrentRating(gameRating);
    };

    const handleSave = () => {
        if (currentRating) {
            addRating(currentRating as GameRating);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Stepper */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto">
                <span className={step === 'search' ? "text-violet-400 font-bold" : ""}>1. Select Game</span>
                <ChevronRight size={14} />
                <span className={step === 'rate' ? "text-violet-400 font-bold" : ""}>2. Evaluation</span>
                <ChevronRight size={14} />
                <span className={step === 'summary' ? "text-violet-400 font-bold" : ""}>3. Summary</span>
            </div>

            {step === "search" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h1 className="text-3xl font-bold text-center mb-2">Find a Game</h1>
                    <p className="text-center text-slate-400 mb-8">Search for the game you want to log into your collection.</p>
                    <SearchModal onSelect={handleSelectGame} />
                </div>
            )}

            {step === "rate" && selectedGame && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center gap-6 mb-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                        <img src={selectedGame.background_image} className="w-20 h-28 object-cover rounded-lg shadow-lg" />
                        <div>
                            <h1 className="text-2xl font-bold">{selectedGame.name}</h1>
                            <p className="text-slate-400">{selectedGame.released?.split('-')[0]}</p>
                        </div>
                    </div>

                    <RatingForm
                        onRate={(ratings, score, stars) => handleRate(ratings, score, stars)}
                    />

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={() => setStep("summary")}
                            disabled={!currentRating || currentRating.finalScore === 0}
                            className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
                        >
                            Generate Summary &rarr;
                        </button>
                    </div>
                </div>
            )}

            {step === "summary" && currentRating && (
                <SummaryCard
                    game={currentRating as GameRating}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
