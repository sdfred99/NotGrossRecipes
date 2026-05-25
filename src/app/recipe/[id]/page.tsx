'use client';

import { use, useEffect, useState } from 'react';

type Ingredient = { RecipeID: number; Name: string; Quantity: number | string | null; Unit: string };
type Instruction = { RecipeID: number; StepNumber: number; Instruction: string };

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
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
      <ul>
        {ingredients.map((j) => (
          <li key={`${j.RecipeID}-${j.Name}`}>
            {j.Quantity} {j.Unit} {j.Name}
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

