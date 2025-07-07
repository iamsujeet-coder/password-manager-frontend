import React from 'react'

function Footer() {
  return (
    <footer className='w-full text-white bg-slate-800 flex flex-col justify-center items-center py-2 mt-auto border-t border-green-900'>
      <div className="logo font-bold text-2xl flex items-center gap-1">
        <span className='text-green-500'>&lt;</span>
        <span>Pass</span>
        <span className='text-green-500'>OP/&gt;</span>
      </div>
      <div className='flex flex-wrap justify-center items-center py-1 text-sm'>
        Created with <img className='w-6 mx-2 inline-block' src='./icons/love.png' alt='love' />by <span className='font-semibold ml-1'>CodewithSujeet</span>
      </div>
    </footer>
  )
}

export default Footer