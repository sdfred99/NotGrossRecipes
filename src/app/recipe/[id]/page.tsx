'use client';

import { use, useEffect, useState } from 'react';

type Ingredient = { RecipeID: number; Name: string; Quantity: number | string | null; Unit: string };
type Instruction = { RecipeID: number; StepNumber: number; Instruction: string };

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [servings, setServings] = useState<number>(0);
  const [multiplier, setMultiplier] = useState(1);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  function scaleQuantity(quantity: number | string | null, multiplier: number) {
    if (quantity == null) return '';

    const num = Number(quantity);

    if (isNaN(num)) return quantity;

    return Number((num * multiplier).toFixed(2));
  }

  useEffect(() => {
    fetch(`http://10.0.0.156:5000/api/recipes/${id}`)
      .then((res) => res.json())
      .then((recipe) => { setServings(recipe.Servings) });

    fetch(`http://10.0.0.156:5000/api/instructions/by-recipe?recipeId=${id}`)
      .then((res) => res.json())
      .then(setInstructions);

    fetch(`http://10.0.0.156:5000/api/ingredients/by-recipe?recipeId=${id}`)
      .then((res) => res.json())
      .then(setIngredients);
  }, [id]);

  return (
    <div>
      <h3>Ingredients</h3>
      <div>
        Servings: {Number(servings) * multiplier}
        <select id="servings-scale" value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))}>
          <option value={0.5}>x1/2</option>
          <option value={1}>x1</option>
          <option value={2}>x2</option>
          <option value={3}>x3</option>
        </select>
      </div>
      <ul>
        {ingredients.map((j) => (
          <li key={`${j.RecipeID}-${j.Name}`}>
            {scaleQuantity(j.Quantity, multiplier)} {j.Unit} {j.Name}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ul>
        {instructions.map((i) => (
          <li key={`${i.RecipeID}-${i.StepNumber}`}>
            Step {i.StepNumber}: {i.Instruction}
          </li>
        ))}
      </ul>
    </div>
  );
}

