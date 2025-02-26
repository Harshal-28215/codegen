"use client"

import React, { forwardRef } from 'react'
import { Button } from '../ui/button'
import { MessageCircle } from 'lucide-react'
import { redirect, useParams } from 'next/navigation'
import SidebarChats from './SidebarChats'
import { useSideBarChat } from '@/Utils/Hooks/SideBarChat'
import Logout from './Logout'
import Credits from './Credits'

const Sidebar = forwardRef<HTMLDivElement, { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }>(({ isOpen, setIsOpen }, ref) => {

    const createnewchat = () => {
        setIsOpen(false)
        redirect('/')
    }

    const params = useParams();
    let id = ''
    if (params.id) {
        id = params.id as string;
    }

    const { userChat } = useSideBarChat(id)

    return (
        <aside ref={ref} className={`h-[calc(100vh-120px)] w-[250px] bg-white/5 backdrop-blur-xl shadow-md absolute top-[80px] flex flex-col items-center rounded-2xl transition-all duration-300 py-3 px-3 z-20 ${isOpen ? 'left-[5%]' : '-left-80'}`}>
            <Button className='bg-white/70 hover:bg-white text-black w-[100%]' onClick={createnewchat}> <MessageCircle /> Start New Chat</Button>

            <h1 className='text-white font-semibold my-2 w-full px-2 py-4 border-b border-white/30'>Your Chat</h1>

            <div className='w-full h-[calc(100%-140px)] overflow-y-auto mb-3'>
                {userChat.slice().reverse().map((chat) => (
                    <SidebarChats chat={chat} key={chat._id} setIsOpen={setIsOpen} />
                ))}
            </div>

            <Credits />
            <Logout />
        </aside>
    )
})

Sidebar.displayName = "Sidebar";

export default Sidebar
