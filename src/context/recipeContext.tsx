'use client'
import { getRecipes } from "@/Api/recipes";
import { useLocalStorage } from "@/localStorage/useLocalStorage";
import { Recipe } from "@/types/Recipe";
import React, { createContext, useEffect, useState } from "react";

interface Context {
  state: {
    favorites: Recipe[];
    originalRecipes: Recipe[];
    chef: string;
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
        setOriginalRecipes(recipes);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [login, chef]);
  const state: Context["state"] = {
    favorites,
    originalRecipes,
    chef,
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
