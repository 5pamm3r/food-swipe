import { RecipeContext } from '@/context/recipeContext';
import { Recipe } from '@/types/Recipe';
import Link from 'next/link';
import React, { useContext } from 'react';

interface Props {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}
const Buttons = ({ modalActive, setModalActive, setRecipes }: Props): JSX.Element => {
  const {
    state: { originalRecipes }
  } = useContext(RecipeContext);

  const onOpenModal = () => {
    setModalActive(!modalActive)
  }
  const onReset = () => {
    setRecipes(originalRecipes)
  }
  return (
    <div className='mx-auto absolute bottom-2 left-0 right-0 px-2 flex justify-evenly'>
      <button className='w-1/4 p-2 bg-slate-500 rounded-lg' onClick={onReset}>Reiniciar</button>
      <button className='w-1/4 p-2  bg-red-500 rounded-lg' type='button' onClick={onOpenModal}>Favoritos</button>
      <Link href='/' className='w-1/4 p-2 bg-slate-500 rounded-lg text-center'>Chefs</Link>
    </div>
  )
}

export default Buttons