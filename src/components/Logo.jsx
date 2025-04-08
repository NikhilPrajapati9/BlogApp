import React from 'react'
import logo from '../../public/logo-white.png'

function Logo({width = '100px'}) {
  return (
    <div className='text-white flex justify-center items-center'>
      <p>

      <img className='sm:10 w-25' src={logo} alt="" />
      </p>
    </div>
  )
}

export default Logo