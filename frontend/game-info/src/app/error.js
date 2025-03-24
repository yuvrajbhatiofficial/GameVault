'use client';

export default function Error({ error, reset }) {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Something went wrong!</h2>
                <button
                    onClick={() => reset()}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                    Try again
                </button>
            </div>
        </div>
    );
} 