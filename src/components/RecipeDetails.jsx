import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "./withRouter"; // import your HOC
import "./RecipeDetails.css";

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
      loading: true,
      error: "",
    };
  }

  componentDidMount() {
    this.fetchRecipe();
  }

  componentDidUpdate(prevProps) {
    // If route param changes, refetch
    if (this.props.params.idMeal !== prevProps.params.idMeal) {
      this.fetchRecipe();
    }
  }

  fetchRecipe = async () => {
    const { idMeal } = this.props.params;
    this.setState({ loading: true, error: "", recipe: null });

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      const data = await res.json();
      if (data.meals) this.setState({ recipe: data.meals[0] });
      else this.setState({ error: "Recipe not found." });
    } catch {
      this.setState({ error: "Failed to fetch recipe." });
    } finally {
      this.setState({ loading: false });
    }
  };

  getIngredients() {
    const { recipe } = this.state;
    let ingredients = [];
    if (!recipe) return ingredients;
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure ? measure : ""} ${ingredient}`.trim());
      }
    }
    return ingredients;
  }

  render() {
    const { recipe, loading, error } = this.state;

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
      <div className="recipe-details">
        <Link to="/" className="back-button">
          &larr; Back to search
        </Link>
        <h1>{recipe.strMeal}</h1>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          {this.getIngredients().map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <p className="instructions">{recipe.strInstructions}</p>
        {recipe.strYoutube && (
          <div className="video-wrapper">
            <h2>Video Tutorial</h2>
            <iframe
              src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`}
              title={recipe.strMeal}
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
        )}
      </div>
    );
  }
}

// Wrap with withRouter to inject params and navigate
export default withRouter(RecipeDetails);
