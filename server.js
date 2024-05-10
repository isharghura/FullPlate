const express = require('express');
let app = express();
const fetch = require('node-fetch');
require('dotenv').config();

app.use(express.static(__dirname));

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/getData', async (req, res) => {
    let calories = parseInt(req.params.calories);
    let numMeals = parseInt(req.params.numMeals);
    let calorieRange = 25;
    const findAFood = async () => {
        let randomPage = Math.floor(Math.random() * 113) + 1;
        let api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.apikey}&dataType=Survey (FNDDS)&pageNumber=${randomPage}`;
        try {
            let response = await fetch(api_url);
            let data = await response.json();

            console.log("calories: " + calories);
            console.log("calorieRange: " + (calories - calorieRange) + " - " + (calories + calorieRange));

            let foodsInRange = data.foods.filter(food => {
                let energy = food.foodNutrients.find(nutrient => nutrient.nutrientId === 1008);
                if (calories + calorieRange >= energy.value && calories - calorieRange < energy.value) {
                    console.log(food.description + ": " + energy.value);
                    return true;
                }
                return false;
            });

            if (foodsInRange.length === 0) {
                return findAFood();
            }

            let randomFood = Math.floor(Math.random() * foodsInRange.length);

            res.json(foodsInRange[randomFood]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    findAFood();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
