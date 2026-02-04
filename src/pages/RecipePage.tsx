import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../services/api";
import type { Recipe } from "../types";
import FavoriteButton from "../components/FavoriteButton";
import "./RecipePage.css";

export default function RecipePage() {
  const { recetteID } = useParams<{ recetteID: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!recetteID) return;
    getRecipe(recetteID)
      .then(setRecipe)
      .catch(() => setError("recipe not found"));
  }, [recetteID]);

  if (error) return <p className="error">{error}</p>;
  if (!recipe) return <p>loading...</p>;

  return (
    <article className="recipe-detail">
      {recipe.image_url && (
        <img src={recipe.image_url} alt={recipe.name} className="recipe-detail-img" />
      )}
      <div className="recipe-detail-header">
        <h2>{recipe.name}</h2>
        <FavoriteButton recipeID={recipe.id} />
      </div>
      <p className="recipe-detail-meta">
        {recipe.category} &middot; {recipe.prep_time + recipe.cook_time} min &middot;{" "}
        {recipe.servings} portions
      </p>
      <p>{recipe.description}</p>
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <section>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.quantity} {ing.unit} {ing.name}
              </li>
            ))}
          </ul>
        </section>
      )}
      {recipe.instructions && (
        <section>
          <h3>Instructions</h3>
          <p className="recipe-detail-instructions">{recipe.instructions}</p>
        </section>
      )}
    </article>
  );
}
