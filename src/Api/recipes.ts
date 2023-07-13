import axios from "axios";
import { RawRecipe } from "../types/RawRecipe";
import { parseRecipe } from "./parseRecipes";

export async function getRecipes() {
  try {
    const recipes = await axios.get<RawRecipe[]>('https://www.cocinacaserayfacil.net/wp-json/wp/v2/posts?&per_page=10').then((res) => parseRecipe(res.data));
    return recipes;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
