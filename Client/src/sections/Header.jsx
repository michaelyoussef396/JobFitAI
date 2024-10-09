import React from 'react'
import { images } from '../Constants'

const Header = () => {
  return (
    <header>
      <div>
        <a href="">
            <img src={images.logo} alt="" />
        </a>
    </div>
    </header>
  )
}

export default Header
