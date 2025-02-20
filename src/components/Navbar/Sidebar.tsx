"use client"

import React, { forwardRef } from 'react'
import { Button } from '../ui/button'
import { MessageCircle } from 'lucide-react'
import { redirect } from 'next/navigation'
import SidebarChats from './SidebarChats'
import { useSideBarChat } from '@/Utils/Hooks/SideBarChat'

const Sidebar = forwardRef<HTMLDivElement, { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }>(({ isOpen, setIsOpen }, ref) => {

    const createnewchat = () => {
        setIsOpen(false)
        redirect('/')
    }

    const { userChat } = useSideBarChat()

    return (
        <aside ref={ref} className={`h-[calc(100vh-120px)] w-[250px] bg-white/5 backdrop-blur-xl shadow-md fixed top-[100px] flex flex-col items-center rounded-2xl transition-all duration-300 pt-3 px-3 z-20 ${isOpen ? 'left-[5%]' : '-left-80'}`}>
            <Button className='bg-white/70 hover:bg-white text-black w-[100%]' onClick={createnewchat}> <MessageCircle /> Start New Chat</Button>

            <h1 className='text-white font-semibold my-5 w-full px-2'>Your Chat</h1>

            {userChat.map((chat) => (
                <SidebarChats chat={chat} key={chat._id} setIsOpen={setIsOpen}/>
            ))}
        </aside>
    )
})

export default Sidebar
