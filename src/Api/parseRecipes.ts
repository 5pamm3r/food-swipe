import { ImageRecipe, RawRecipe } from "@/types/RawRecipe";
import { Recipe } from "@/types/Recipe";
import axios from "axios";

export async function parseRecipe(rawRecipe: RawRecipe[]): Promise<Recipe[]> {
  const fetchImage = async (url: string): Promise<string> => {
    try {
      const { data } = await axios.get<ImageRecipe>(url);
      const imageUrl = data.media_details.sizes['schema-slider'].source_url;
      return imageUrl;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const promises = rawRecipe.map(async (recipe) => {
    const image = await fetchImage(recipe._links['wp:featuredmedia'][0].href);
    return {
      id: recipe.id,
      title: recipe.yoast_head_json.og_title,
      description: recipe.yoast_head_json.og_description,
      url: recipe.yoast_head_json.og_url,
      imageUrl: image,
    };
  });

  const recipes = await Promise.all(promises);
  return recipes;
}
