import axios from "axios";
import { Post } from "../types/Post";

export async function getRecipes() {
  try {
    const response = await axios.get<Post[]>('https://www.cocinacaserayfacil.net/wp-json/wp/v2/posts?&per_page=100');
    const posts: Post[] = response.data;

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
