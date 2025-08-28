import { Link } from "react-router-dom";
import "./RecipeCard.css";

// keep slugify if want nice URLs but not necessary for routing
function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>{recipe.strMeal}</h3>
      <Link to={`/meal/${recipe.idMeal}`} className="view-recipe-button">
        View Recipe
      </Link>
    </div>
  );
}

export default RecipeCard;
