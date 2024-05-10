var calories = document.getElementById("calories");
var numMeals = document.getElementById("numMeals");
var plan = document.getElementById("plan");
var generateBtn = document.getElementById("generate");

async function generatePlan() {
    var avgCalMeal = calories.value / numMeals.value;
    const currentFoods = await fetchFood(avgCalMeal);
    console.log(currentFoods);
}

async function fetchFood(calories) {
    const response = await fetch(`/getData?calories=${calories}&numMeals=${numMeals}`);
    const data = await response.json();
    return data;
}

// test