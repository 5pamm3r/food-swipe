export interface Post {
  yoast_head_json: {
    title: string;
    description: string;
    og_url: string;
    og_image: {
      width: number;
      height: number;
      url: string;
      type: string;
    }[];
  };
}