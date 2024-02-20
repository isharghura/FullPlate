var calories = document.getElementById("calories");
var numMeals = document.getElementById("numMeals");
var plan = document.getElementById("plan");
var generateBtn = document.getElementById("generate");

async function generatePlan() {
    var avgCalMeal = calories.value / numMeals.value;
    let allFood = [];
    let fdcId = 167698;

    const currentFoods = await fetchFood(fdcId);

    // const filteredFoods = currentFoods.foods.filter(food => {
    //     const foodCalories = food.foodNutrients.find(nutrient =>
    //         nutrient.nutrientId === 1008 &&
    //         nutrient.value >= avgCalMeal - 50 &&
    //         nutrient.value <= avgCalMeal + 50);
    //     return foodCalories;
    // });

    // allFood = allFood.concat(filteredFoods);

    // const randomFood = allFood[Math.floor(Math.random() * allFood.length)];
    // console.log(randomFood);
    console.log(currentFoods);

    // return randomFood;
}

async function fetchFood(fdcId) {
    const config = await fetch("config.json").then(response => response.json());
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${config.apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}