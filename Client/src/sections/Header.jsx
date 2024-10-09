import React from 'react'
import { images } from '../Constants'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 z-50 w-full py-10'>
      <div className='flex container h-14 items-center max-lg:px-5'>
        <a href="/" className='lg:hidden flex-1 cursor-pointer z-2'>
            <img src={images.logo} alt="logo" width={115} height={115}/>
        </a>
    </div>
    </header>
  )
}

export default Header
