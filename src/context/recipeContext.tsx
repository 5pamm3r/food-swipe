'use client'
import { getRecipes } from "@/Api/recipes";
import { useLocalStorage } from "@/localStorage/useLocalStorage";
import { RawRecipe } from "@/types/RawRecipe";
import { Recipe } from "@/types/Recipe";
import { get } from "http";
import React, { createContext, useEffect, useState } from "react";

interface Context {
  state: {
    favorites: Recipe[];
    originalRecipes: Recipe[];
  };
  actions: {
    saveFavorites: (recipes: Recipe[]) => void;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
    saveChef: (chef: string) => void;
  };
}
export const RecipeContext = createContext({} as Context);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const saveFavorites = (recipes: Recipe[]) => {
    setFavorites(recipes);
  };
  const [originalRecipes, setOriginalRecipes] = useState<Recipe[]>([]);
  const [login, setLogin] = useState<boolean>(false);
  const [chef, setChef] = useState<string>('')
  const saveChef = (chef: string) => {
    setChef(chef)
  }
  useEffect(() => {
    (async function () {
      try {
        if (!login) {
          return
        }
        let recipes: Recipe[] = []
        if (chef === 'Gorka') {
          recipes = await getRecipes({ chef });
        } else if (chef === 'Paulina') {
          recipes = await getRecipes({ chef });
        }
        // const recipes = await mockData();
        setOriginalRecipes(recipes);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [login, chef]);
  const state: Context["state"] = {
    favorites,
    originalRecipes,
  };
  const actions: Context["actions"] = {
    saveFavorites,
    setLogin,
    saveChef,
  };

  return (
    <RecipeContext.Provider value={{ state, actions }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
