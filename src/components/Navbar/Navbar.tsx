import { SidebarClose, SidebarOpen } from 'lucide-react'
import React from 'react'
import Signin from './Signin'

function Navbar({ setIsOpen, isOpen }: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, isOpen: boolean }) {
  return (
    <nav className='w-[90%] rounded-full bg-white/5 backdrop-blur-xl shadow-md p-4 mx-auto mt-4 flex justify-between items-center'>
      {isOpen ?
        <SidebarClose onClick={() => setIsOpen(false)} className='text-white hover:cursor-pointer' />
        :
        <SidebarOpen onClick={() => setIsOpen(true)} className='text-white hover:cursor-pointer' />
      }
      {/* <AvatarDemo /> */}
      <Signin />
    </nav>
  )
}

export default Navbar
