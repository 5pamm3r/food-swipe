import React from 'react'

export function SkeletonItemRecipe(): React.JSX.Element {
  return (
    <div className='animate-pulse'>
      <div className='h-80vh bg-gray-300 rounded-2xl tall:h-750 mt-4' />
    </div>
  )
}
