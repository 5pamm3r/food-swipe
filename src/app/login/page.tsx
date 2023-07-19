'use client'
import { RecipeContext } from '@/context/recipeContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import imgPaulina from '../../../public/assets/images/paulina.webp'
import imgGorka from '../../../public/assets/images/gorka.webp'

export default function Login(): React.JSX.Element {
  const {
    actions: { setLogin, saveChef }
  } = useContext(RecipeContext)

  const onClickGorka = () => {
    setLogin((prevState) => !prevState)
    saveChef('Gorka')
  }

  const onClickPaulina = () => {
    setLogin((prevState) => !prevState)
    saveChef('Paulina')
  }

  useEffect(() => {
    setLogin(false)
  }, [])
  return (
    <div className='flex flex-col px-2 justify-center h-full w-full max-w-md items-center mx-auto bg-bgPrimary rounded-lg gap-4'>
      <h1 className='font-bold text-2xl text-center mb-4 text-white'>Elige tu cocinero o cocinera favorito</h1>
      <Link href='/' className='flex items-center justify-center gap-4 text-center max-w-sm w-full bg-red-400 rounded-lg py-3 mx-4' onClick={onClickPaulina}>
        <Image src={imgPaulina} alt='Paulina cocina profile' className='rounded-full w-20 h-20' />
        <strong className='text-xl'>Paulina Cocina</strong>
      </Link>
      <Link href='/' className='flex items-center justify-center gap-4 max-w-sm w-full bg-blue-400 rounded-lg py-3' onClick={onClickGorka}>
        <Image src={imgGorka} alt='Gorka Barredo profile' className='rounded-full w-20 h-20' />
        <strong className='text-xl'>Gorka Barredo</strong>
      </Link>
    </div>
  )
}
