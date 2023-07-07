import { url } from 'inspector';
import React from 'react'

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  link: string
}
const ItemRecipe = ({ title, description, imageUrl, link }: Props): JSX.Element => {
  return (
    <>
      <li className='border-2 border-black p-2 absolute h-full w-full max-w-lg flex items-center justify-center'>
        <a href={link} target='_blank'>
          <div className='h-400px'>
            <div className='bg-center bg-cover h-full' style={{ backgroundImage: `url(${imageUrl})` }}>
            </div>
          </div>
          <p className='font-bold mb-2'>{title}</p>
          <p className='line-clamp-3 text-gray-500'>{description}</p>
        </a>
      </li>
    </>
  )
}

export default ItemRecipe