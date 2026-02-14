"use client";

import { useState, useEffect } from "react";
import { type GameRating } from "@/lib/utils";

const STORAGE_KEY = "pixellog-ratings";

export function useGameStore() {
    const [games, setGames] = useState<GameRating[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setGames(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse stored games", e);
            }
        }
    }, []);

    const addRating = (rating: GameRating) => {
        setGames((prev) => {
            const exists = prev.find((g) => g.id === rating.id);
            let newGames;
            if (exists) {
                newGames = prev.map((g) => (g.id === rating.id ? rating : g));
            } else {
                newGames = [rating, ...prev];
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newGames));
            return newGames;
        });
    };

    const removeRating = (id: string) => {
        setGames((prev) => {
            const newGames = prev.filter((g) => g.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newGames));
            return newGames;
        });
    };

    return {
        games,
        addRating,
        removeRating,
        mounted,
    };
}
