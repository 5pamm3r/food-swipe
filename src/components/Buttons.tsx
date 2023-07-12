import React from 'react';

interface Props {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const Buttons = ({ modalActive, setModalActive }: Props): JSX.Element => {

  const onOpenModal = () => {
    setModalActive(!modalActive)
  }
  return (
    <button className='p-2 mx-auto absolute bottom-2 left-0 right-0 w-2/4  bg-red-500 rounded-lg' type='button' onClick={onOpenModal}>Favoritos</button>
  )
}

export default Buttons