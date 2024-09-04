import React from 'react'

const Loader = () => {
  return (
    <div className='flex space-x-2 justify-center mt-[14rem] bg-white h-screen'>
    <div className='h-3 w-3 bg-blue-200 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
     <div className='h-3 w-3 bg-blue-200 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
     <div className='h-3 w-3 bg-blue-200 rounded-full animate-bounce'></div>
   </div>
  )
}

export default Loader;