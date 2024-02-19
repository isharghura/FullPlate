var calories = document.getElementById("calories");
var numMeals = document.getElementById("numMeals");
var plan = document.getElementById("plan");
var generateBtn = document.getElementById("generate");

async function generatePlan() {
    const config = await fetch("config.json").then(response => response.json());
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=&api_key=${config.apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    var avgCalMeal = calories.value / numMeals.value;
    let allFood = [];

    var pages = 1;

    while (pages <= data.totalPages) {
        const filteredFoods = data.foods.filter(food => {
            const foodCalories = food.foodNutrients.find(nutrient => nutrient.Energy >= avgCalMeal - 100 && nutrient.Energy <= avgCalMeal + 100);
            return foodCalories;
        })
        pages++;
        allFood = allFood.concat(filteredFoods);
    }

    const randomFood = allFood[Math.ceil(Math.random() * allFood.length)];
    console.log(data.foods[11].foodNutrients.find(nutrient => nutrient.nutrientId === 1008)?.value);

    return randomFood;
}