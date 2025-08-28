import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

const RecipeList = (props) => {
  const { recipes } = props;

  if (!recipes.length) {
    return <p className="no-results">Search by ingredient above.</p>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
