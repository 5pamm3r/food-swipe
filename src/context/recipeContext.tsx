'use client'
import { getRecipes } from "@/Api/recipes";
import { useLocalStorage } from "@/localStorage/useLocalStorage";
import { Recipe } from "@/types/Recipe";
import React, { createContext, useEffect, useState } from "react";

interface Context {
  state: {
    favorites: Recipe[];
    originalRecipes: Recipe[];
  };
  actions: {
    saveFavorites: (recipes: Recipe[]) => void;
  };
}
export const RecipeContext = createContext({} as Context);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const saveFavorites = (recipes: Recipe[]) => {
    setFavorites(recipes);
  };
  const [originalRecipes, setOriginalRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const recipes = await getRecipes();
        // const recipes = await mockData();
        setOriginalRecipes(recipes);
      } catch (error) {
        console.error(error);
      }
    })()
  }, []);
  const state: Context["state"] = {
    favorites,
    originalRecipes,
  };
  const actions: Context["actions"] = {
    saveFavorites,
  };

  return (
    <RecipeContext.Provider value={{ state, actions }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
