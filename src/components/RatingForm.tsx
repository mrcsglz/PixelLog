import { useState, useEffect } from "react";
import { CATEGORIES, type RatingCategory, calculateScore, getScoreColor } from "@/lib/utils";

interface RatingFormProps {
    onRate: (ratings: Partial<Record<RatingCategory, number>>, finalScore: number, stars: number) => void;
    initialRatings?: Partial<Record<RatingCategory, number>>;
}

export function RatingForm({ onRate, initialRatings = {} }: RatingFormProps) {
    const [ratings, setRatings] = useState<Partial<Record<RatingCategory, number>>>(initialRatings);
    const [score, setScore] = useState({ finalScore: 0, stars: 0 });

    useEffect(() => {
        const calculated = calculateScore(ratings);
        setScore(calculated);
        onRate(ratings, calculated.finalScore, calculated.stars);
    }, [ratings]);

    const handleChange = (category: RatingCategory, value: string) => {
        // If empty string, remove the key
        if (value === "") {
            const newRatings = { ...ratings };
            delete newRatings[category];
            setRatings(newRatings);
            return;
        }

        const num = parseFloat(value);
        if (!isNaN(num) && num >= 0 && num <= 10) {
            setRatings((prev) => ({ ...prev, [category]: num }));
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto p-6 bg-slate-900/50 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-200">Rate Details</h2>
                <div className="text-right">
                    <div className={`text-4xl font-black ${getScoreColor(score.finalScore)}`}>
                        {score.finalScore || "-"}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Average</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="space-y-1">
                        <label className="flex justify-between text-sm font-medium text-slate-300">
                            {cat.label}
                            <span className={ratings[cat.id] ? "text-violet-400" : "text-slate-600"}>
                                {ratings[cat.id] ?? "-"}
                            </span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.5"
                            value={ratings[cat.id] ?? 0}
                            onChange={(e) => handleChange(cat.id, e.target.value)}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
                        />
                        {/* Optional Input for precise typing */}
                        {/* <input 
                type="number" 
                min="0" max="10" 
                className="w-16 bg-slate-800 border border-slate-700 rounded px-2"
                onChange={(e) => handleChange(cat.id, e.target.value)}
            /> */}
                    </div>
                ))}
            </div>
        </div>
    );
}
