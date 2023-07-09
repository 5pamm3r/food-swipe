'use client'
import { Recipe } from "@/types/Recipe";
import React, { createContext, useState } from "react";

interface Context {
  state: {
    favorites: Recipe[];
  };
  actions: {
    saveFavorites: (recipes: Recipe[]) => void;
  };
}
export const RecipeContext = createContext({} as Context);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  const saveFavorites = (recipes: Recipe[]) => {
    setFavorites(recipes);
  };
  const state: Context["state"] = {
    favorites,
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
