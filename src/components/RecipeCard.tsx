import { Link } from "react-router-dom";
import type { Recipe } from "../types";
import "./RecipeCard.css";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recettes/${recipe.id}`} className="recipe-card">
      {recipe.image_url && (
        <img src={recipe.image_url} alt={recipe.name} className="recipe-card-img" />
      )}
      <div className="recipe-card-body">
        <h3>{recipe.name}</h3>
        <span className="recipe-card-category">{recipe.category}</span>
      </div>
    </Link>
  );
}
