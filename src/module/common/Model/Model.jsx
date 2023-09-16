import React from 'react'

const Model = ({children, show, setShowModel}) => {
  return (
   show? <>
    <div className='fixed inset-0 z-20 overflow-y-auto'>
        <div className='fixed inset-0 w-full h-full bg-black opacity-40
         ' onClick={()=> setShowModel(false)}
         >
        </div>
        <div className='flex items-center min-h-screen px-4 py-8'>
            <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
                {children}
            </div>
        </div>
    </div>
   </> : <></>
  )
}

export default Model