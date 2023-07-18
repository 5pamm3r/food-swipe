export interface RawPaulina {
  id: string;
  title: {
    rendered: string;
  }
  excerpt: {
    rendered: string;
  }
  link: string;
  content: {
    rendered: string;
  }
  _links: {
    "wp:featuredmedia": {
      href: string;
    }[]
  }
}

export interface ImageRecipe {
  media_details: {
    sizes: {
      "medium": {
        source_url: string;
      }
    }
  }
}