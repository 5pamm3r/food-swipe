import React from 'react'

const Login = (): JSX.Element => {
  return (
    <div className='flex flex-col justify-center h-full w-full items-center bg-white rounded-lg gap-4'>
      <h1>Elige tu cocinero o cocinera favorito</h1>
      <button className='w-96 bg-red-400 rounded-lg py-3'>Paulina Cocina</button>
      <button className='w-96 bg-blue-400 rounded-lg py-3 '>Gorka Barredo</button>
    </div>
  )
}

export default Login