import React from 'react'
import { Button } from '../ui/button'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'

function Sidebar({ isOpen }: { isOpen: boolean }) {
    return (
        <aside className={`h-[calc(100vh-120px)] w-[250px] bg-white/5 backdrop-blur-xl shadow-md fixed top-[100px] flex flex-col items-center rounded-2xl transition-all duration-300 pt-3 px-3 ${isOpen ? 'left-[5%]' : '-left-80'}`}>
            <Button className='bg-white/70 hover:bg-white text-black w-[100%]'> <MessageCircle /> Start New Chat</Button>

            <h1 className='text-white font-semibold my-5 w-full px-2'>Your Chat</h1>

            <div className='mt-2 w-full overflow-y-auto flex items-center gap-2 hover:bg-white/20 rounded-md p-2 cursor-pointer'>
                <p className='text-white overflow-hidden text-ellipsis whitespace-nowrap'>this is chat that overflow sidebar</p>
                <div className='text-white cursor-pointer'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md"><path fillRule="evenodd" clipRule="evenodd" d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z" fill="currentColor"></path></svg>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
