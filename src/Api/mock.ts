import mock from '@/mocks/recipes.json';
import { Recipe } from '../types/Recipe';

export async function mockData() {
  try {
    const response = mock;
    const posts: Recipe[] = response;

    const extractedData = posts.map(post => {
      const { yoast_head_json } = post;
      const postTitle = yoast_head_json.title;
      const postDesc = yoast_head_json.description;
      const og_url = yoast_head_json.og_url;
      const og_image = yoast_head_json.og_image;
      const imageUrl = og_image && og_image.length > 0 ? og_image[0].url : null;

      return {
        title: postTitle,
        description: postDesc,
        og_url: og_url,
        imageUrl: imageUrl,
        yoast_head_json: yoast_head_json
      };
    });
    return extractedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}