'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import CategorySection from '../components/CategorySection';
import GameGrid from '../components/GameGrid';
import GameDetail from '../components/GameDetail';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');

    // Handle search
    const handleSearch = (query) => {
        if (!query.trim()) {
            setFilteredGames(games);
            return;
        }

        const searchTerms = query.toLowerCase().split(' ');
        const filtered = games.filter(game => {
            const gameText = `${game.title} ${game.description} ${game.genre} ${game.platform} ${game.publisher}`.toLowerCase();
            return searchTerms.every(term => gameText.includes(term));
        });

        setFilteredGames(filtered);
        // Update URL with search query
        const params = new URLSearchParams(window.location.search);
        params.set('search', query);
        router.push(`/?${params.toString()}`);
    };

    // Handle category selection
    const handleCategorySelect = (category) => {
        setActiveCategory(category.toLowerCase());
        const filtered = category === 'all' 
            ? games 
            : games.filter(game => game.genre.toLowerCase() === category.toLowerCase());
        setFilteredGames(filtered);
    };

    // Handle sorting
    useEffect(() => {
        if (!sort) return;
        
        const sortedGames = [...filteredGames];
        switch(sort) {
            case 'newest':
                sortedGames.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                break;
            case 'oldest':
                sortedGames.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
                break;
            case 'popular':
                sortedGames.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
                break;
            case 'rating':
                sortedGames.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
        }
        setFilteredGames(sortedGames);
    }, [sort]);

    // Initial data fetch and category filtering
    useEffect(() => {
        if (category) {
            handleCategorySelect(category);
        }
    }, [category, games]);

    // Fetch all games
    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/api/games`);
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const data = await response.json();
                setGames(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching games:', err);
                setError('Failed to load games. Please try again later.');
                // Fallback data
                setGames([
                    {
                        id: 1,
                        title: "Test Game 1",
                        thumbnail: "https://placehold.co/600x400",
                        description: "This is a test game description",
                        genre: "Action",
                        platform: "PC",
                        publisher: "Test Publisher",
                        release_date: "2024"
                    },
                    {
                        id: 2,
                        title: "Test Game 2",
                        thumbnail: "https://placehold.co/600x400",
                        description: "Another test game description",
                        genre: "RPG",
                        platform: "PC",
                        publisher: "Test Publisher",
                        release_date: "2024"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    // Set game from existing games when id changes
    useEffect(() => {
        if (id) {
            const selectedGame = games.find(g => g.id === parseInt(id));
            if (selectedGame) {
                setGame(selectedGame);
            } else {
                // If game not found in current list, fetch it
                fetch(`${API_URL}/api/game/${id}`)
                    .then(response => response.json())
                    .then(data => setGame(data))
                    .catch(error => {
                        console.error('Error fetching game details:', error);
                        setError('Failed to load game details');
                    });
            }
        } else {
            setGame(null);
        }
    }, [id, games]);

    // Add this effect to handle URL search params
    useEffect(() => {
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            handleSearch(searchQuery);
        }
    }, [searchParams]);

    const handleBackToHome = () => {
        router.push('/');
        setGame(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Navbar />
                <div className="pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                                {[1, 2, 3, 4].map((n) => (
                                    <div key={n} className="bg-gray-800 rounded-lg overflow-hidden">
                                        <div className="h-48 bg-gray-700"></div>
                                        <div className="p-4">
                                            <div className="h-4 bg-gray-700 rounded mb-2"></div>
                                            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Navbar />
                <div className="pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center">
                            <p className="text-red-500 text-xl">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-900">
            <Navbar onSearch={handleSearch} />
            <div className="pt-16">
                {id && game ? (
                    <GameDetail 
                        game={game} 
                        onBack={handleBackToHome}
                    />
                ) : (
                    <>
                        <CategorySection 
                            onCategorySelect={handleCategorySelect}
                            activeCategory={activeCategory}
                        />
                        <GameGrid games={filteredGames.length > 0 ? filteredGames : games} />
                    </>
                )}
            </div>
        </main>
    );
}
