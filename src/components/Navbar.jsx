import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white w-full'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        <div className='logo font-bold text-white text-2xl'>
          <span className="text-green-500">&lt;</span>
          <span><span>Secure</span></span>
          <span className="text-green-500">P*ss/&gt;</span></div>
          <a href="https://github.com/safihyder" target='blank'>
        <button className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center ring-white ring-1'>
          <img src="icons/github.png" className='invert w-10 p-1' alt="" />
          <span className='font-bold px-2'>Github</span>
        </button>
        </a>
      </div>
    </nav>
  )
}

export default Navbar