const cors = require('cors');

// Update CORS configuration
app.use(cors({
    origin: [
        'https://your-frontend-url.vercel.app',
        'http://localhost:3000' // for local development
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
})); 