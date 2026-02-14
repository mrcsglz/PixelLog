import { Search, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { searchGames, type RawgGame, MOCK_GAMES } from "@/lib/api";

interface SearchModalProps {
    onSelect: (game: RawgGame) => void;
}

export function SearchModal({ onSelect }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<RawgGame[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout>(null);

    const handleSearch = async (term: string) => {
        if (!term) {
            setResults([]);
            return;
        }
        setLoading(true);

        // Check if we have an API key, otherwise use mock
        if (!process.env.NEXT_PUBLIC_RAWG_API_KEY) {
            // Simple mock filter
            const matches = MOCK_GAMES.filter(g => g.name.toLowerCase().includes(term.toLowerCase()));
            setResults(matches);
            setLoading(false);
            return;
        }

        const games = await searchGames(term);
        setResults(games);
        setLoading(false);
    };

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            handleSearch(query);
        }, 500);
    }, [query]);

    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    {loading ? <Loader2 className="animate-spin" /> : <Search />}
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-4 border border-slate-700 rounded-xl leading-5 bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-lg shadow-lg transition-all"
                    placeholder="Search for a game..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
            </div>

            {results.length > 0 && (
                <ul className="mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto divide-y divide-slate-700 z-50 absolute w-full max-w-2xl">
                    {results.map((game) => (
                        <li
                            key={game.id}
                            className="px-4 py-3 hover:bg-slate-700 cursor-pointer flex items-center gap-4 transition-colors"
                            onClick={() => onSelect(game)}
                        >
                            {game.background_image && (
                                <img src={game.background_image} alt={game.name} className="w-12 h-16 object-cover rounded" />
                            )}
                            <div>
                                <span className="block font-medium text-slate-200">{game.name}</span>
                                <span className="text-sm text-slate-500">{game.released?.split('-')[0]}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
