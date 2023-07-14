export interface RawRecipe {
  id: string;
  yoast_head_json: {
    og_title: string;
    og_description: string;
    og_url: string;
    // og_image: {
    //   width: number;
    //   height: number;
    //   url: string;
    //   type: string;
    // }[];
  };
  _links: {
    'wp:featuredmedia': {
      href: string;
    }[];
  }
}

export interface ImageRecipe {
  media_details: {
    sizes: {
      "schema-slider": {
        source_url: string;
      }
    }
  }
}