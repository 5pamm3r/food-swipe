import { Recipe } from '@/types/Recipe'
import React from 'react'

interface Props {
  title: Recipe['title'],
  imageUrl: Recipe['imageUrl'],
  url: Recipe['url'],
}
export function ItemFavorites({ title, imageUrl, url }: Props): React.JSX.Element {
  return (
    <div
      className='z-10 rounded-md shadow draggable-handle cursor-pointer text-sm p-1 grid grid-cols-3 items-center justify-center [&>*:nth-child(3)]:text-center'
    >
      <div
        className='w-20 h-20 bg-cover bg-center rounded-md'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <h1>{title}</h1>
      <a
        className='hover:underline block mx-auto w-fit'
        href={url}
        rel='noopener noreferrer'
        target='_blank'
      >
        <i>Receta</i>
      </a>
    </div>
  )
}
