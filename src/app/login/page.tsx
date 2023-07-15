'use client'
import { RecipeContext } from '@/context/recipeContext';
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'

export function Login(): JSX.Element {
  const {
    actions: { setLogin, saveChef }
  } = useContext(RecipeContext);
  const onClickGorka = () => {
    setLogin((prevState) => !prevState);
    saveChef('Gorka')
  }
  const onClickPaulina = () => {
    setLogin((prevState) => !prevState);
    saveChef('Paulina')
  }
  useEffect(() => {
    setLogin(false)
  }, [])
  return (
    <div className='flex flex-col justify-center h-full w-full items-center bg-white rounded-lg gap-4'>
      <h1 className='font-bold text-lg mb-4'>Elige tu cocinero o cocinera favorito</h1>
      <Link href='/main' className='text-center w-96 bg-red-400 rounded-lg py-3' onClick={onClickPaulina}>Paulina Cocina</Link>
      <Link href='/main' className='text-center w-96 bg-blue-400 rounded-lg py-3' onClick={onClickGorka}>Gorka Barredo</Link>
    </div>
  )
}

export default Login