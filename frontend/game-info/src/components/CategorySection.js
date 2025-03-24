'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const CategorySection = ({ onCategorySelect, activeCategory }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categories = [
        { id: 1, name: 'Action', icon: '🎮', count: 150 },
        { id: 2, name: 'Adventure', icon: '🗺️', count: 120 },
        { id: 3, name: 'RPG', icon: '⚔️', count: 90 },
        { id: 4, name: 'Strategy', icon: '🎯', count: 80 },
        { id: 5, name: 'Sports', icon: '⚽', count: 70 },
        { id: 6, name: 'Racing', icon: '🏎️', count: 60 },
    ];

    const handleCategoryClick = (categoryName) => {
        router.push(`/?category=${categoryName.toLowerCase()}`);
        onCategorySelect(categoryName);
    };

    return (
        <section id="categories" className="bg-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Browse Categories</h2>
                    <div className="flex space-x-4">
                        <select 
                            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                            onChange={(e) => router.push(`/?sort=${e.target.value}`)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="popular">Most Popular</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            onClick={() => handleCategoryClick(category.name)}
                            className={`bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors duration-200 cursor-pointer group
                                ${activeCategory === category.name.toLowerCase() ? 'ring-2 ring-blue-500' : ''}`}
                        >
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                                {category.icon}
                            </div>
                            <h3 className="text-white font-medium mb-2">{category.name}</h3>
                            <p className="text-gray-400 text-sm">{category.count} Games</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection; 