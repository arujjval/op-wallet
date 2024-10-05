"use client";

import React, { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Navbar = () => {

  return (
    <nav className='h-20 w-full flex justify-center px-10 bg-gradient-to-b from-[#1E3E62] via-[#0B192C] to-[#000000]'>
      <div className='w-full h-full max-w-[1400px] flex flex-row justify-between items-center'>
        <div className='logo text-white font-extrabold text-4xl'>
          OP Wallet
        </div>
        <div className='address-show '>
          <ConnectButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar