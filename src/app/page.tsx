"use client";
import { useEffect, useState } from "react";
import { getRecipes } from "@/Api/recipes";
import { Post } from "@/Api/type";
import ItemRecipe from "@/components/ItemRecipe";
import Buttons from "@/components/Buttons";
import Index from "@/types/Index";

export default function Home() {
  const [recipes, setRecipes] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const recipesData = await getRecipes();
        setRecipes(recipesData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const [index, setIndex] = useState<Index>({ startIndex: 0, endIndex: 4 })

  return (
    <main className='grid content-center h-screen'>
      <ul className="m-auto relative w-full relative h-80vh flex items-center justify-center">
        {recipes.slice(index.startIndex, index.endIndex).map((recipe: Post, index: number) => (
          <ItemRecipe
            key={index}
            title={recipe.yoast_head_json.title}
            description={recipe.yoast_head_json.description}
            imageUrl={recipe.yoast_head_json.og_image?.[0]?.url}
            link={recipe.yoast_head_json.og_url}
          />
        ))}
      </ul>
      <Buttons setIndex={setIndex} />
    </main>
  );
}
