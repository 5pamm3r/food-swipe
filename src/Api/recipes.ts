import axios from "axios";
import { RawGorka } from "../types/RawGorka";
import { parseRecipe } from "./parseGorka";
import { RawPaulina } from "@/types/RawPaulina";
import { parsePaulina } from "./parsePaulina";

export async function getRecipes({ chef }: { chef?: string }) {
  try {
    if (chef === 'Gorka') {
      const recipes = await axios.get<RawGorka[]>('https://www.cocinacaserayfacil.net/wp-json/wp/v2/posts?&per_page=100').then((res) => parseRecipe(res.data));
      return recipes.sort(() => 0.5 - Math.random())

    } else {
      const recipes = await axios.get<RawPaulina[]>('https://www.paulinacocina.net/wp-json/wp/v2/posts?&per_page=100').then((res) => parsePaulina(res.data));
      return recipes.sort(() => 0.5 - Math.random())
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
