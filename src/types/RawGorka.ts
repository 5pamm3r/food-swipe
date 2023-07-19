export interface RawGorka {
  id: string;
  yoast_head_json: {
    og_title: string;
    og_description: string;
    og_url: string;
    og_image: {
      url: string;
    }[];
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
      'schema-slider': {
        source_url: string;
      }
    }
  }
}
