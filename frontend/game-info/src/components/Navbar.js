'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    // Clear search when navigating to a new page
    useEffect(() => {
        setSearchQuery('');
    }, [pathname]);

    const isActive = (path) => pathname === path;

    return (
        <nav className="bg-gray-900 fixed w-full z-50 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
                               💀
                            </span>
                        </Link>
                        <div className="hidden md:flex space-x-4">
                            <Link 
                                href="/" 
                                className={`px-3 py-2 rounded-md ${
                                    isActive('/') 
                                        ? 'text-white bg-gray-800' 
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/?sort=newest" 
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                            >
                                New Games
                            </Link>
                            <Link 
                                href="/?sort=popular" 
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
                            >
                                Popular
                            </Link>
                            <Link 
                                href="/about" 
                                className={`px-3 py-2 rounded-md ${
                                    isActive('/about') 
                                        ? 'text-white bg-gray-800' 
                                        : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                About
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search games..."
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            />
                            <button 
                                type="submit" 
                                className="absolute right-3 top-2 text-gray-400 hover:text-white"
                            >
                                🔍
                            </button>
                        </form>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => router.push('/login')} 
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 