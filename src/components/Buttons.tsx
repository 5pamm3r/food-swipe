import Index from '@/types/Index'
import React from 'react'

interface Props {
  setIndex: React.Dispatch<React.SetStateAction<Index>>
}
const Buttons = ({ setIndex }: Props): JSX.Element => {
  const onBack = () => {
    setIndex((prevState) => ({
      ...prevState,
      startIndex: prevState.startIndex - 4,
      endIndex: prevState.endIndex - 4,
    }))
  }
  const onNext = () => {
    setIndex((prevState) => ({
      ...prevState,
      startIndex: prevState.startIndex + 4,
      endIndex: prevState.endIndex + 4,
    }))
  }
  return (
    <div className='flex justify-between p-4'>
      <button className='border border-black p-2' type='button' onClick={onBack}>Back</button>
      <button className='border border-black p-2' type='button' onClick={onNext}>Next</button>
    </div>
  )
}

export default Buttons