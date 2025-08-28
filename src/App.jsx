import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import Loader from "./components/Loader";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      query: "",
      loading: false,
      error: "",
    };
  }

  searchRecipes = async () => {
    const query = this.state.query.trim();
    if (!query) {
      this.setState({ error: "Please enter an ingredient.", recipes: [] });
      return;
    }

    this.setState({ loading: true, error: "" });

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      this.setState({
        recipes: data.meals || [],
        error: data.meals ? "" : "No recipes found for that ingredient.",
      });
    } catch (e) {
      this.setState({
        error: "Network error. Please try again.",
        recipes: [],
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  setQuery = (newQuery) => {
    this.setState({ query: newQuery });
  };

  render() {
    const { query, recipes, loading, error } = this.state;

    return (
      <div className="App">
        <h1>Recipe Finder</h1>
        <SearchBar
          query={query}
          setQuery={this.setQuery}
          onSearch={this.searchRecipes}
        />
        {loading && <Loader />}
        {error && <div className="error">{error}</div>}
        {!loading && <RecipeList recipes={recipes} />}
       
      </div>
    );
  }
}

export default App;
