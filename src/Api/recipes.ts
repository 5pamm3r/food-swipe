import axios from "axios";
import { RawRecipe } from "../types/RawRecipe";
import { parseRecipe } from "./parseRecipes";

export async function getRecipes() {
  try {
    const recipes = await axios.get<RawRecipe[]>('https://www.cocinacaserayfacil.net/wp-json/wp/v2/posts?&per_page=100').then((res) => parseRecipe(res.data));
    return recipes.sort(() => 0.5 - Math.random())
  } catch (error) {
    console.error(error);
    throw error;
  }
}
