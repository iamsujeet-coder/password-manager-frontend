import React from 'react'

function Navbar() {
  return (
    <nav className='bg-slate-800 text-white w-full pb-2'>
      <div className="max-w-5xl mx-auto flex flex-row flex-wrap justify-between items-center  px-4 py-4 sm:py-5 h-auto sm:h-16 w-full gap-2 sm:gap-0">
        <div className="logo font-bold text-white text-2xl flex items-center gap-1 mb-0">
          <span className='text-green-500'>&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        <button className='flex gap-2 py-2  px-5 bg-green-900 rounded-full ring-white ring-1 focus:ring-2 focus:ring-green-400 transition-all duration-150 text-base font-semibold border border-green-400 hover:bg-green-800 active:scale-95'>
          <span> <i className="fab fa-github h-5"></i></span><span className='font-bold'>Github</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar