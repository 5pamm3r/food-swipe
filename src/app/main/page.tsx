"use client";
import React, { useContext, useEffect, useState } from "react";
import { Recipe } from "@/types/Recipe";
import ItemRecipe from "@/components/recipes/ItemRecipe";
import Buttons from "@/components/Buttons";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import Favorites from "@/components/favorites/Favorites";
import { RecipeContext } from "@/context/recipeContext";
import { SkeletonItemRecipe } from "@/components/recipes/skeleton";

interface DragState {
  activeDrags: number;
  deltaPosition: { x: number; y: number };
  controlledPosition: { x: number; y: number };
}
export default function Home() {
  const {
    state: { favorites, originalRecipes },
    actions: { saveFavorites },
  } = useContext(RecipeContext);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setRecipes(originalRecipes);
    setLoading(false);
  }, [originalRecipes]);


  const indexMap = {
    startIndex: 0,
    endIndex: 3,
  };
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
    if (favorites.find((recipe) => recipe.id === currentItem.id)) return;
    saveFavorites([...favorites, currentItem]);
  };
  const handleStop = () => {
    const { x } = dragState.deltaPosition;
    if (x > 100) {
      handleSwipeRight();
    } else if (x < -100) {
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
        {loading ? (
          <SkeletonItemRecipe />
        ) : (
          recipes
            .slice(indexMap.startIndex, indexMap.endIndex)
            .map((recipe: Recipe, index: number) => (
              <li
                className="absolute h-90vh"
                style={{ zIndex: indexMap.endIndex - index - 1 }}
                key={index}
              >
                <Draggable
                  {...dragHandlers}
                  onDrag={handleDrag}
                  position={dragState.controlledPosition}
                  onStop={handleStop}
                  cancel="a"
                >
                  <div className="w-full px-2 pt-2">
                    <ItemRecipe
                      drag="draggable-handle"
                      title={recipe.title}
                      description={recipe.description}
                      imageUrl={recipe.imageUrl}
                      link={recipe.url}
                    />
                  </div>
                </Draggable>
              </li>
            ))
        )}
        <Buttons
          modalActive={modalActive}
          setModalActive={setModalActive}
          setRecipes={setRecipes}
        />
      </ul>
      {modalActive && (
        <Favorites modalActive={modalActive} setModalActive={setModalActive} />
      )}
    </main>
  );
}
