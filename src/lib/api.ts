export interface RawgGame {
    id: number;
    slug: string;
    name: string;
    background_image: string;
    released: string;
    rating: number; // Rawg rating
}

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export async function searchGames(query: string): Promise<RawgGame[]> {
    if (!API_KEY) {
        console.warn('RAWG API Key missing');
        return [];
    }

    try {
        const res = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=10`);
        if (!res.ok) throw new Error('Failed to fetch games');
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Mock data for development if no API key
export const MOCK_GAMES: RawgGame[] = [
    {
        id: 1,
        slug: 'the-legend-of-zelda-breath-of-the-wild',
        name: 'The Legend of Zelda: Breath of the Wild',
        background_image: 'https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f7a20.jpg',
        released: '2017-03-03',
        rating: 4.86,
    },
    {
        id: 2,
        slug: 'elden-ring',
        name: 'Elden Ring',
        background_image: 'https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg',
        released: '2022-02-25',
        rating: 4.88,
    },
    {
        id: 3,
        slug: 'god-of-war-ragnarok',
        name: 'God of War: Ragnarök',
        background_image: 'https://media.rawg.io/media/games/511/5118af992e742a0ab1d3692629b0a70c.jpg',
        released: '2022-11-09',
        rating: 4.8,
    }
];
