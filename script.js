var calories = document.getElementById("calories");
var numMeals = document.getElementById("numMeals");
var plan = document.getElementById("plan");
var generateBtn = document.getElementById("generate");

async function generatePlan() {
    var avgCalMeal = calories.value / numMeals.value;
    let allFood = [];
    var pages = 1;
    const initialData = await fetchFood(pages);
    const totalPages = initialData.totalPages;
    let pageToVist = Math.floor(Math.random() * totalPages) + 1;

    const currentFoods = await fetchFood(pageToVist);
    const filteredFoods = currentFoods.foods.filter(food => {
        const foodCalories = food.foodNutrients.find(nutrient =>
            nutrient.nutrientId === 1008 &&
            nutrient.value >= avgCalMeal - 100 &&
            nutrient.value <= avgCalMeal + 100);
        return foodCalories;
    })
    allFood = allFood.concat(filteredFoods);

    const randomFood = allFood[Math.floor(Math.random() * allFood.length)];
    console.log(allFood);

    return randomFood;
}

async function fetchFood(page) {
    const config = await fetch("config.json").then(response => response.json());
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=&api_key=${config.apikey}&page=${page}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}