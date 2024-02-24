const express = require('express');
let app = express();
const fetch = require('node-fetch');
require('dotenv').config();

app.use(express.static(__dirname));

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/getData/:calories', async (req, res) => {
    const calories = req.params.calories;
    const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.apikey}`;
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
