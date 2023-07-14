import { ImageRecipe, RawRecipe } from "@/types/RawRecipe";
import { Recipe } from "@/types/Recipe";
import axios from "axios";

export async function parseRecipe(rawRecipe: RawRecipe[]): Promise<Recipe[]> {
  const fetchImage = async (url: string, recipe: RawRecipe): Promise<string> => {
    try {
      const { data } = await axios.get<ImageRecipe>(url);
      let imageUrl: Recipe['imageUrl'] = ''
      if (data && data.media_details && data.media_details.sizes && data.media_details.sizes['schema-slider'] && data.media_details.sizes['schema-slider'].source_url) {
        imageUrl = data.media_details.sizes['schema-slider'].source_url;
      } else {
        imageUrl = recipe.yoast_head_json.og_image[0].url;
      };
      return imageUrl
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const promises = rawRecipe.map(async (recipe) => {

    const imageUrl = await fetchImage(recipe._links['wp:featuredmedia'][0].href, recipe);

    return {
      id: recipe.id,
      title: recipe.yoast_head_json.og_title,
      description: recipe.yoast_head_json.og_description,
      url: recipe.yoast_head_json.og_url,
      imageUrl: imageUrl,
    };
  });

  const recipes = await Promise.all(promises);
  return recipes;
}
