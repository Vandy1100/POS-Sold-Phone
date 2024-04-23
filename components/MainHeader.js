"use client"
import { MenuContext } from '@/context/MenuContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { FaBars } from "react-icons/fa6";


const MainHeader = () => {
    const { toggle } = useContext(MenuContext);
  return (
    <div className='bg-white flex items-center justify-between px-4 h-14 shadow-lg'>
       <div class=" flex gap-6 items-center">
    <img src="../../logo_pos.png" alt="Logo" class="w-20 h-auto"/>
    <p class="font-bold text-lg">ហាងលក់ទូរស័ព្ទដៃ ចេក​ ស្រីណុច</p>
</div>

       <div className='cursor-pointer lg:hidden' onClick={ toggle }>
        <FaBars />
       </div>
    </div>
  )
}

export default MainHeader