// Hide multi meal inputs
const multiMealInputs = document.querySelector('#multiMealInputs');
multiMealInputs.style.display = 'none';

// Calories Needed Input
const calsNeededInput = document.querySelector('#calsNeeded');
let calsNeeded = calsNeededInput.value;
calsNeededInput.oninput = (e) => {
  calsNeeded = e.target.value;
  calculate();
};

// Meals per Day Input
const mealsPerDayInput = document.querySelector('#mealsPerDay');
let mealsPerDay = mealsPerDayInput.value;
mealsPerDayInput.oninput = (e) => {
  mealsPerDay = e.target.value;
  calculate();
};

// Calories in Food Input
const calsInFoodInput = document.querySelector('#calsInFood');
let calsInFood = calsInFoodInput.value;
calsInFoodInput.oninput = (e) => {
  calsInFood = e.target.value;
  calculate();
};

// Treats Input
const treatsInput = document.querySelector('#treats');
let treats = treatsInput.value;
treatsInput.oninput = (e) => {
  treats = e.target.value;
  calculate();
};

// Treats Units Input
const possibleTreatsUnits = { percent: 'percent', cals: 'cals' };
const treatsUnitsInput = document.querySelector('#treatsUnits');
let treatsUnits = treatsUnitsInput.value;
treatsUnitsInput.onchange = (e) => {
  treatsUnits = e.target.value;

  // Reset default value
  if (treatsUnits === possibleTreatsUnits.percent) treats = 10;
  else if (treatsUnits === possibleTreatsUnits.cals) treats = 20;
  treatsInput.value = treats;

  calculate();
};

// Calories per Treat Input
const calsPerTreatInput = document.querySelector('#calsPerTreat');
let calsPerTreat = calsPerTreatInput.value;
calsPerTreatInput.oninput = (e) => {
  calsPerTreat = e.target.value;
  calculate();
};

// Meal 1 Grams Input
const meal1GramsInput = document.querySelector('#meal1Grams');
let meal1Grams = meal1GramsInput.value;
meal1GramsInput.oninput = (e) => {
  meal1Grams = e.target.value;
  calculate();
};

// Meal 2 Cals Input
const meal2CalsInput = document.querySelector('#meal2Cals');
let meal2Cals = meal2CalsInput.value;
meal2CalsInput.oninput = (e) => {
  meal2Cals = e.target.value;
  calculate();
};

// Is Multi Meal Input
const isMultiMealInput = document.querySelector('#isMultiMeal');
let isMultiMeal = isMultiMealInput.checked;
isMultiMealInput.onchange = (e) => {
  isMultiMeal = e.target.checked;

  if (isMultiMeal) multiMealInputs.style.display = 'flex';
  else multiMealInputs.style.display = 'none';

  calculate();
};

function calculate() {
  const totalText = document.querySelector('#total');
  const treatsTotalText = document.querySelector('#treatsTotal');
  const meal2TotalText = document.querySelector('#meal2Total');
  if (
    !calsNeeded ||
    !mealsPerDay ||
    !calsInFood ||
    !treats ||
    !treatsUnits ||
    !calsPerTreat
  ) {
    totalText.textContent = '';
    treatsTotalText.textContent = '';
    meal2TotalText.textContent = '';
    return;
  }

  let totalTreatCals = 0;
  if (treatsUnits === possibleTreatsUnits.percent) {
    totalTreatCals = calsNeeded * (treats / 100);
  } else if (treatsUnits === possibleTreatsUnits.cals) {
    totalTreatCals = treats;
  }
  const treatsToGive = Math.round(totalTreatCals / calsPerTreat);

  const calsPerMeal = (calsNeeded - totalTreatCals) / mealsPerDay;
  const calsInFoodPerGram = calsInFood / 1000;
  const gramsNeeded = (calsPerMeal / calsInFoodPerGram).toFixed(2);

  totalText.innerHTML = `Give <strong>${gramsNeeded}g</strong> of food for this meal.`;
  treatsTotalText.innerHTML = `Give ~${treatsToGive} treats throughout the day.`;

  if (isMultiMeal) {
    if (!meal1Grams || !meal2Cals) {
      meal2TotalText.textContent = '';
    }

    if (meal1Grams) {
      totalText.innerHTML = `You've given ${meal1Grams}g of the first food.`;
    }

    if (meal1Grams && meal2Cals) {
      const calsLeft = calsPerMeal - calsInFoodPerGram * meal1Grams;
      const food2CalsPerGram = meal2Cals / 1000;
      const gramsLeft = (calsLeft / food2CalsPerGram).toFixed(2);

      meal2TotalText.innerHTML = `Give <strong>${gramsLeft}g</strong> of the second food.`;
    }
  }
}

// Initial calculation
calculate();
