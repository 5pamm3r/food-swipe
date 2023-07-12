export interface Recipe {
  id: string;
  yoast_head_json: {
    og_title: string;
    og_description: string;
    og_url: string;
    og_image: {
      width: number;
      height: number;
      url: string;
      type: string;
    }[];
  };
}