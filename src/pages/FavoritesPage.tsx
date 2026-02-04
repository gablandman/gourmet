import { useEffect, useState } from "react";
import { getFavorites } from "../services/api";
import type { Recipe } from "../types";
import RecipeCard from "../components/RecipeCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getFavorites()
      .then(setFavorites)
      .catch(() => setError("failed to load favorites"));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (favorites.length === 0) return <p>no favorites yet</p>;

  return (
    <div className="recipe-grid">
      {favorites.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
