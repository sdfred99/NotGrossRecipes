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
      <h2>Recipes</h2>
      <ul>
        {recipes.map((r) => (
          <li key={r.RecipeID}>
            <Link href={`/recipe/${r.RecipeID}`}>{r.name}</Link>
            <button onClick={() => deleteRecipe(r.RecipeID)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Things I Still need to do</h2>
      <ul>
        <li>Home page? Shows buckets but still supports search across all recipes</li>
        <li>Bucket capabilities in the back end</li>
        <li>Edit Capabilities: if on recipe page have edit button that open up same page thing as add recipe but at bottom (once opened edit) has delete button adn you have to confirm to delete.</li>
        <li>Admin capabilities: Only Makena and I can edit and delete stuff when exposed to internet</li>
        <li>General CSS stuff. Make all pages look better</li>
        <li>Back end validation (No scripting attacks)</li>
        <li>Figure out how to deploy</li>
      </ul>
    </div>
  );
}

