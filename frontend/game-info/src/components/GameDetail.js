'use client';

const GameDetail = ({ game, onBack }) => {
    if (!game) return null;

    return (
        <div className="min-h-screen bg-gray-900 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                    <div className="relative h-[500px]">
                        <img
                            src={game.thumbnail}
                            alt={game.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-32"></div>
                    </div>
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-4xl font-bold text-white">{game.title}</h1>
                            <button 
                                onClick={onBack}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                Back to Games
                            </button>
                        </div>
                        <div className="flex items-center space-x-4 mb-6">
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Free to Play</span>
                            <span className="text-gray-400">{game.genre}</span>
                            {game.platform && <span className="text-gray-400">{game.platform}</span>}
                        </div>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">{game.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-white font-semibold mb-2">Platform</h3>
                                <p className="text-gray-300">{game.platform || 'Not specified'}</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-white font-semibold mb-2">Publisher</h3>
                                <p className="text-gray-300">{game.publisher || 'Not specified'}</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-white font-semibold mb-2">Release Date</h3>
                                <p className="text-gray-300">{game.release_date || 'Not specified'}</p>
                            </div>
                        </div>
                        
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 w-full md:w-auto">
                            Play Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetail; 