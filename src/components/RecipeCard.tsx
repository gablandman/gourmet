import { Link } from "react-router-dom";
import type { Recipe } from "../types";
import "./RecipeCard.css";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recettes/${recipe.id}`} className="recipe-card">
      {recipe.image_url && (
        <img src={recipe.image_url} alt={recipe.name} className="recipe-card-img" loading="lazy" width="400" height="180" />
      )}
      <div className="recipe-card-body">
        <h2>{recipe.name}</h2>
        <span className="recipe-card-category">{recipe.category}</span>
      </div>
    </Link>
  );
}
