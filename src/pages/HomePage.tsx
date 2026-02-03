import { useEffect, useState } from "react";
import { getRecipes } from "../services/api";
import type { Recipe } from "../types";
import RecipeCard from "../components/RecipeCard";
import "./HomePage.css";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecipes()
      .then(setRecipes)
      .catch(() => setError("failed to load recipes"));
  }, []);

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="recipe-grid">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
