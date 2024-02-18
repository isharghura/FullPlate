var calories = document.getElementById("calories");
var numMeals = document.getElementById("numMeals");
var plan = document.getElementById("plan");
var generateBtn = document.getElementById("generate");
var avgCalMeal = calories.value / numMeals.value;

async function generatePlan() {
    const config = await fetch("config.json").then(response => response.json());
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=&api_key=${config.apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    const filteredFoods = data.foods.filter(food => {
        const foodCalories = food.foodNutrients.find(nutrient => nutrient.nutrientId == 1008
            && nutrient.nutrientNumber >= avgCalMeal - 50 && nutrient.nutrientNumber >= avgCalMeal + 50);
        return foodCalories;
    })

    const randomFood = filteredFoods[Math.ceil(Math.random() * filteredFoods.length)];

    console.log(filteredFoods);

    return randomFood;
}