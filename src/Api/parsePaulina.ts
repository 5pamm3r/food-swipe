import { ImageRecipe, RawPaulina } from '@/types/RawPaulina'
import { Recipe } from '@/types/Recipe'
import axios from 'axios'

export async function parsePaulina(rawRecipe: RawPaulina[]): Promise<Recipe[]> {
  const fetchImage = async (url: string, recipe: RawPaulina): Promise<string> => {
    try {
      const { data } = await axios.get<ImageRecipe>(url)
      let imageUrl: Recipe['imageUrl'] = ''
      // if (data && data.media_details && data.media_details.sizes && data.media_details.sizes['medium'] && data.media_details.sizes['medium'].source_url) {
      if (data && data.media_details.sizes.medium) {
        imageUrl = data.media_details.sizes.medium.source_url
      }
      return imageUrl
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const parseRecipes = rawRecipe.map(async (recipe) => {
    const descriptionMatch = recipe.excerpt.rendered.match(/<p>(.*?)<\/p>/) || ''
    const description = descriptionMatch && (descriptionMatch[1]?.toString() || '')
    const imageUrlMatch = recipe.content.rendered.match(/\bhttps:\/\/[^\s"]+768x.*?\.jpg\b/)?.toString() || ''
    let imageUrl: Recipe['imageUrl'] = ''
    if (imageUrlMatch) {
      imageUrl = imageUrlMatch
    } else {
      imageUrl = await fetchImage(recipe._links['wp:featuredmedia'][0].href, recipe)
    }
    return {
      id: recipe.id,
      title: recipe.title.rendered,
      description,
      url: recipe.link,
      imageUrl
    }
  })
  const recipes = await Promise.all(parseRecipes)

  return recipes
}
