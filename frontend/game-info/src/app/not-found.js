export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
                <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
                    Go Back Home
                </a>
            </div>
        </div>
    );
} 