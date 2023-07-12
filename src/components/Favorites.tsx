import { RecipeContext } from "@/context/recipeContext";
import React, { FC, useContext, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
interface Props {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}
interface DragState {
  activeDrags: number;
  deltaPosition: { x: number };
}
const Favorites: FC<Props> = ({ modalActive, setModalActive }) => {
  const {
    state: { favorites },
    actions: { saveFavorites },
  } = useContext(RecipeContext);
  const [dragState, setDragState] = useState<DragState>({
    activeDrags: 0,
    deltaPosition: {
      x: 0,
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

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter((recipe) => recipe.id.toString() !== id)
    saveFavorites(newFavorites);
  };
  const handleStop = (e: DraggableEvent, ui: DraggableData) => {
    const x = dragState.deltaPosition.x;

    if (x < -100) {
      removeFavorite(ui.node.id);
    }
  };
  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { x } = dragState.deltaPosition;

    setDragState((prevState) => ({
      ...prevState,
      deltaPosition: {
        x: x + ui.deltaX,
      },
    }));
  };
  const dragHandlers = { onStart: onStart, onStop: onStop };

  return (
    <div className="fixed max-w-lg w-full h-screen bg-white z-10">
      <button
        className="mx-auto h-fit block bg-red text-2xl font-bold"
        onClick={() => setModalActive(!modalActive)}
      >
        Volver
      </button>
      <ul className="flex flex-col h-95% py-4 w-full overflow-y-scroll overflow-x-hidden gap-2 p-2">
        {favorites.length > 0 ? (
          favorites.map((recipe, index) => (
            <Draggable
              key={index}
              axis="x"
              {...dragHandlers}
              position={{ x: 0, y: 0 }}
              onStop={handleStop}
              onDrag={handleDrag}
            >
              <li id={recipe.id} className="shadow draggable-handle cursor-pointer text-sm p-1 grid grid-cols-3 items-center justify-center [&>*:nth-child(3)]:text-center">
                <div
                  className="w-20 h-20 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${recipe.yoast_head_json.og_image?.[0]?.url})`,
                  }}
                ></div>
                <h1>{recipe.yoast_head_json.og_title}</h1>
                <a
                  className="hover:underline"
                  href={recipe.yoast_head_json.og_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i>Receta</i>
                </a>
              </li>
            </Draggable>
          ))
        ) : (
          <h1 className="text-center">Vacío</h1>
        )}
      </ul>
    </div>
  );
};

export default Favorites;
