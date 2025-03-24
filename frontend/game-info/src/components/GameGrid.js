'use client';
import Link from 'next/link';

const GameGrid = ({ games }) => {
    if (!games || games.length === 0) {
        return (
            <div className="bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-white text-center">No games available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {games.map(game => (
                        <Link 
                            href={`/?id=${game.id}`}
                            key={game.id}
                            className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                        >
                            <div className="relative">
                                <img
                                    src={game.thumbnail}
                                    alt={game.title}
                                    className="w-full h-48 object-cover"
                                />
                                {/* <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
                                    Free
                                </div> */}
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{game.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-300 text-sm">{game.genre}</span>
                                    <span className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameGrid; 