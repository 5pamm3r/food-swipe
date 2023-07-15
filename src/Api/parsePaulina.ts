import { RawPaulina } from "@/types/RawPaulina";
import { Recipe } from "@/types/Recipe";

export function parsePaulina(rawRecipe: RawPaulina[]): Recipe[] {
  const parseRecipes = rawRecipe.map((recipe) => {
    const descriptionMatch = recipe.excerpt.rendered.match(/<p>(.*?)<\/p>/);
    const description = descriptionMatch && descriptionMatch[1]?.toString() || '';

    const imageUrlMatch = recipe.content.rendered.match(/\bhttps:\/\/[^\s"]+640x.*?\.jpg\b/);
    const imageUrl = imageUrlMatch && imageUrlMatch.toString() || '';
    return {
      id: recipe.id,
      title: recipe.title.rendered,
      description: description,
      url: recipe.link,
      imageUrl: imageUrl
    }
  })
  return parseRecipes;
}