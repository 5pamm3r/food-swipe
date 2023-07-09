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
    <button className='p-2 m-auto w-2/4 mt-4 bg-red-500 rounded-lg' type='button' onClick={onOpenModal}>Favorites</button>
  )
}

export default Buttons