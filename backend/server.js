// backend/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 8000;
const BASE_URL = 'https://www.freetogame.com/api';

app.use(cors());

// Fetch all games
app.get('/api/games', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/games`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch games' });
    }
});

// Fetch game details by ID
app.get('/api/game/:id', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/game?id=${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch game details' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
