'use client';

import styles from "./page.module.css";
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Recipe = {
  RecipeID: number;
  name: string;
};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);


  useEffect(() => {
      fetch('http://10.0.0.156:5000/api/recipes') 
        .then((res) => res.json())
        .then((data) => setRecipes(data));
    }, []);

    const deleteRecipe = async (recipeID: number) => {
      try {
        const response = await fetch(
          `http://10.0.0.156:5000/api/recipes/${recipeID}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete recipe');
        }

        setRecipes((prev) =>
          prev.filter((r) => r.RecipeID !== recipeID)
        );
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div className={styles.page}>
      <h1>Makena's List of Not Gross Recipes</h1>
      <h3>Seth Also Thinks They Are Not Gross</h3>
      <h5>Some Recipes Are Peer-Reviewed</h5>

      <h3>Recipe DB Calls</h3>
      <ul>
        {recipes.map((r) => (
          <li key={r.RecipeID}>
            <Link href={`/recipe/${r.RecipeID}`}>{r.name}</Link>
            <button onClick={() => deleteRecipe(r.RecipeID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

