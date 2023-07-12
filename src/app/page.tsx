"use client";
import React, { useContext, useEffect, useState } from "react";
import { getRecipes } from "@/Api/recipes";
import { Recipe } from "@/types/Recipe";
import ItemRecipe from "@/components/ItemRecipe";
import Buttons from "@/components/Buttons";
import Index from "@/types/Index";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { mockData } from "@/Api/mock";
import Favorites from "@/components/Favorites";
import { RecipeContext } from "@/context/recipeContext";

interface DragState {
  activeDrags: number;
  deltaPosition: { x: number; y: number };
  controlledPosition: { x: number; y: number };
}
export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const {
    state: { favorites },
    actions: { saveFavorites },
  } = useContext(RecipeContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const recipes = await getRecipes();
        // const recipes = await mockData();
        setRecipes(recipes);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const indexMap = {
    startIndex: 0,
    endIndex: 3,
  }
  const [dragState, setDragState] = useState<DragState>({
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: 0,
      y: 0,
    },
  });
  const onStart = () => {
    setDragState((prevState) => ({
      ...prevState,
      activeDrags: ++dragState.activeDrags,
    }));
  };
  const onStop = () => {
    setDragState((prevState) => ({
      ...prevState,
      activeDrags: --dragState.activeDrags,
    }));
  };
  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = dragState.deltaPosition;
    setDragState((prevState) => ({
      ...prevState,
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    }));
  };
  const [modalActive, setModalActive] = useState<boolean>(false);
  const dragHandlers = { onStart: onStart, onStop: onStop };
  const handleSwipeLeft = () => {
    const [currentItem, ...restItems] = recipes;
    setRecipes(restItems);
  };

  const handleSwipeRight = () => {
    const [currentItem, ...restItems] = recipes;
    setRecipes(restItems);
    saveFavorites([...favorites, currentItem]);
  };
  const handleStop = () => {
    const { x } = dragState.deltaPosition;
    if (x > 200) {
      handleSwipeRight();
    } else if (x < -200) {
      handleSwipeLeft();
    }
    setDragState((prevState) => ({
      ...prevState,
      deltaPosition: {
        x: 0,
        y: 0,
      },
    }));
  };
  return (
    <main className="flex flex-col justify-between h-full w-full items-center">
      <ul className="h-full w-full flex flex-col align-text justify-between relative">
        {recipes
          .slice(indexMap.startIndex, indexMap.endIndex)
          .map((recipe: Recipe, index: number) => (
            <li className="absolute h-90vh" style={{ zIndex: indexMap.endIndex - index - 1 }} key={index}>
              <Draggable
                {...dragHandlers}
                onDrag={handleDrag}
                position={dragState.controlledPosition}
                onStop={handleStop}
              >
                <div className="w-full px-2 pt-2">
                  <ItemRecipe
                    drag="draggable-handle"
                    title={recipe.yoast_head_json.og_title}
                    description={recipe.yoast_head_json.og_description}
                    imageUrl={recipe.yoast_head_json.og_image?.[0]?.url}
                    link={recipe.yoast_head_json.og_url}
                  />
                </div>
              </Draggable>
            </li>
          ))}
        <Buttons
          modalActive={modalActive}
          setModalActive={setModalActive}
        />
      </ul>
      {modalActive && (
        <Favorites modalActive={modalActive} setModalActive={setModalActive} />
      )}
    </main>
  );
}