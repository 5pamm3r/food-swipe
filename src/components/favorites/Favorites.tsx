import { RecipeContext } from '@/context/recipeContext'
import React, { useContext, useState } from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'
import { ItemFavorites } from './ItemFavorites'
import { BackItem } from './backItem'
interface Props {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}
interface DragState {
  activeDrags: number;
  deltaPosition: { x: number };
}
export function Favorites({ modalActive, setModalActive }: Props): React.JSX.Element {
  const {
    state: { favorites },
    actions: { saveFavorites }
  } = useContext(RecipeContext)
  const [dragState, setDragState] = useState<DragState>({
    activeDrags: 0,
    deltaPosition: {
      x: 0
    }
  })
  const onStart = () => {
    setDragState((prevState) => ({
      ...prevState,
      activeDrags: ++dragState.activeDrags
    }))
  }
  const handleStop = (e: DraggableEvent, ui: DraggableData) => {
    const { x } = dragState.deltaPosition
    if (x < -80) {
      removeFavorite(ui.node.id)
    }
    setDragState((prevState) => ({
      ...prevState,
      activeDrags: --dragState.activeDrags,
      deltaPosition: { x: 0 }
    }))
  }

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter(
      (recipe) => recipe.id.toString() !== id
    )
    saveFavorites(newFavorites)
    setDragState((prevState) => ({
      ...prevState,
      deltaPosition: {
        x: 0
      }
    }))
  }
  const onDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { x } = dragState.deltaPosition
    setDragState((prevState) => ({
      ...prevState,
      deltaPosition: {
        x: x + ui.deltaX
      }
    }))
  }

  const dragHandlers = { onStart, onStop: handleStop, onDrag }

  return (
    <div className='fixed max-w-lg w-full h-screen bg-white z-10'>
      <button
        className='mx-auto h-fit block bg-red text-2xl font-bold'
        onClick={() => setModalActive(!modalActive)}
      >
        Volver
      </button>
      <ul className='flex flex-col h-95% py-4 w-full overflow-y-scroll overflow-x-hidden gap-2 p-2'>
        {favorites.length > 0
          ? (
            favorites.map((recipe) => (
              <li key={recipe.id} className='relative'>
                <Draggable
                  axis='x'
                  {...dragHandlers}
                  position={{ x: 0, y: 0 }}
                  cancel='a'
                >
                  <div id={recipe.id} className='bg-white'>
                    <ItemFavorites
                      title={recipe.title}
                      imageUrl={recipe.imageUrl}
                      url={recipe.url}
                    />
                  </div>
                </Draggable>
                <BackItem deltaX={dragState.deltaPosition.x} />
              </li>
            ))
          )
          : (
            <h1 className='text-center'>Vacío</h1>
          )}
      </ul>
    </div>
  )
};

export default Favorites
