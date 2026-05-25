'use client';

import styles from "./page.module.css";
import { useState } from 'react';

export default function Home() {
    const fractionOptions = ['1/8', '1/4', '1/3', '1/2', '2/3', '3/4', '7/8']
    const unitOptions = ['tsp','tbsp','cup','g','kg','oz','lb','ml','l','pinch','pcs'];

    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '', fraction: '', unit: '' }]);
    const [instructions, setInstructions] = useState([{ stepNumber: 1, instruction: '' }]);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '', fraction: '', unit: '' }]);
    };

    const handleAddInstruction = () => {
        setInstructions([
        ...instructions,
        { stepNumber: instructions.length + 1, instruction: '' },
        ]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
          // Create recipe
          const recipeRes = await fetch('http://10.0.0.156:5000/api/recipes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: name }),
          });
          const recipe = await recipeRes.json();
          const recipeId = recipe.RecipeID;

          // Add ingredients
          for (const ing of ingredients) {
            const quantity = parseQuantity(ing.quantity, ing.fraction);
            await fetch('http://10.0.0.156:5000/api/ingredients', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  RecipeID: recipeId,
                  Name: ing.name,
                  Quantity: quantity,
                  Unit: ing.unit,
              }),
            });
          }

          // Add instructions
          for (const instr of instructions) {
            await fetch('http://10.0.0.156:5000/api/instructions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  RecipeID: recipeId,
                  StepNumber: instr.stepNumber,
                  Instruction: instr.instruction,
              }),
            });
          }

          alert('Recipe added successfully!');
          setName('');
          setIngredients([{ name: '', quantity: '', fraction: '', unit: '' }]);
          setInstructions([{ stepNumber: 1, instruction: '' }]);
        } 
        catch (err) {
          console.error(err);
          alert('Failed to add recipe');
        }
    };

    function parseQuantity(quantity: string, fraction: string) {
      const whole = quantity === '' ? 0 : Number(quantity);
      if (fraction && fraction.includes('/')) {
        const [numerator, denominator] = fraction.split('/').map(Number);
        if (isFinite(numerator) && isFinite(denominator) && denominator !== 0) {
          return whole + numerator / denominator;
        }
      }

      return quantity === '' && fraction === '' ? null : (whole || (fraction || null));
    }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Recipe Name */}
        <div>
          <label className="block font-medium">Recipe Name</label>
          <input
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <h2 className="font-semibold">Ingredients</h2>
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2 my-2">
              <input
                placeholder="Name"
                className="border p-2 flex-1"
                value={ing.name}
                onChange={(e) => {
                  const newIngs = [...ingredients];
                  newIngs[i].name = e.target.value;
                  setIngredients(newIngs);
                }}
              />
              <input
                type="number"
                placeholder="Quantity"
                className="border p-2 flex-1"
                value={ing.quantity}
                onChange={(e) => {
                  const newIngs = [...ingredients];
                  newIngs[i].quantity = e.target.value;
                  setIngredients(newIngs);
                }}
              />
              <select
                className="border p-2 w-20"
                value={ing.fraction}
                onChange={(e) => {
                  const newIngs = [...ingredients];
                  newIngs[i].fraction = e.target.value;
                  setIngredients(newIngs);
                }}>
                  <option value=""></option>
                  {fractionOptions.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <select
                className="border p-2 w-20"
                value={ing.unit}
                onChange={(e) => {
                  const newIngs = [...ingredients];
                  newIngs[i].unit = e.target.value;
                  setIngredients(newIngs);
                }}>
                  <option value=""></option>
                  {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient} className="text-blue-500">
            + Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="font-semibold">Instructions</h2>
          {instructions.map((instr, i) => (
            <div key={i} className="flex gap-2 my-2">
              <span className="w-6">{instr.stepNumber}.</span>
              <input
                placeholder="Instruction"
                className="border p-2 flex-1"
                value={instr.instruction}
                onChange={(e) => {
                  const newInstr = [...instructions];
                  newInstr[i].instruction = e.target.value;
                  setInstructions(newInstr);
                }}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddInstruction} className="text-blue-500">
            + Add Step
          </button>
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Save Recipe
        </button>
      </form>
    </div>
  );
}

