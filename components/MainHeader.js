"use client"
import { MenuContext } from '@/context/MenuContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { FaBars } from "react-icons/fa6";


const MainHeader = () => {
    const { toggle } = useContext(MenuContext);
  return (
    <div className='bg-white flex items-center justify-between px-4 h-14 shadow-lg'>
       <div className='cursor-pointer  flex gap-[6px]'>
         <p className='font-bold'>Admin</p>
       </div>
       <div className='cursor-pointer lg:hidden' onClick={ toggle }>
        <FaBars />
       </div>
    </div>
  )
}

export default MainHeader