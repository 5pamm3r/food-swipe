"use client";
import React, { useEffect, useState } from "react";
import { getRecipes } from "@/Api/recipes";
import { Post } from "@/types/Post";
import ItemRecipe from "@/components/ItemRecipe";
import Buttons from "@/components/Buttons";
import Index from "@/types/Index";
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler, DraggableProps } from "react-draggable";
import { mockData } from '@/Api/mock';

interface DragState {
  activeDrags: number;
  deltaPosition: { x: number; y: number; };
  controlledPosition: { x: number; y: number; };
}
export default function Home() {
  const [recipes, setRecipes] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // const recipes = await getRecipes();
        const recipes = await mockData();
        setRecipes(recipes)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const [index, setIndex] = useState<Index>({ startIndex: 0, endIndex: 1 })
  const [dragState, setDragState] = useState<DragState>({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: 0, y: 0
    }
  });
  const onStart = () => {
    setDragState((prevState) => ({
      ...prevState,
      activeDrags: ++dragState.activeDrags
    }));
  };
  const onStop = () => {
    setDragState((prevState) => ({
      ...prevState,
      activeDrags: --dragState.activeDrags
    }));
  }
  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = dragState.deltaPosition;
    setDragState((prevState) => ({
      ...prevState,
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    }));
    console.log(ui.deltaX, ui.deltaY)
  }
  // const onControlledDrag = (e: DraggableEvent, position: DraggableData) => {
  //   const { x, y } = position;
  //   setDragState((prevState) => ({
  //     ...prevState,
  //     controlledPosition: { x, y }
  //   }));
  // };
  // const onControlledDragStop = (e: DraggableEvent, position: DraggableData) => {
  //   onControlledDrag(e, position);
  //   onStop();
  // };
  const dragHandlers = { onStart: onStart, onStop: onStop };
  return (
    <main className='flex flex-col justify-between h-full'>
      <ul className="p-2">
        {recipes.slice(index.startIndex, index.endIndex).map((recipe: Post, index: number) => (
          <Draggable
            key={index}
            {...dragHandlers}
            onDrag={handleDrag}
            position={dragState.controlledPosition}
          // onStop={onControlledDragStop}
          >
            <div className='w-full h-full'>
              <ItemRecipe
                drag='draggable-handle'
                title={recipe.yoast_head_json.title}
                description={recipe.yoast_head_json.description}
                imageUrl={recipe.yoast_head_json.og_image?.[0]?.url}
                link={recipe.yoast_head_json.og_url}
              />
              <p>x: ${dragState.deltaPosition.x.toFixed()} y: ${dragState.deltaPosition.y.toFixed()}</p>
            </div>
          </Draggable>
        ))}
      </ul>
      <Buttons setIndex={setIndex} />
    </main >
  );
}
