import { SidebarClose, SidebarOpen } from 'lucide-react'
import React from 'react'
import { AvatarDemo } from './Avtar'

function Navbar({ setIsOpen, isOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, isOpen: boolean }) {
  return (
    <nav className='w-[90%] rounded-full bg-white/5 backdrop-blur-xl shadow-md p-4 mx-auto mt-4 flex justify-between items-center'>
      {isOpen ?
        <SidebarClose onClick={() => setIsOpen(false)} className='text-white hover:cursor-pointer' />
        :
        <SidebarOpen onClick={() => setIsOpen(true)} className='text-white hover:cursor-pointer' />
      }
      <AvatarDemo />
    </nav>
  )
}

export default Navbar
