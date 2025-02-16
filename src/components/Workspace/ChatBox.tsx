import React from 'react'
import MassageBox from './MassageBox'
import Chats from './Chats'

function ChatBox() {
    return (
        <aside className='w-3/12 h-full border-r border-white/10 relative'>
            <Chats />
            <MassageBox />
        </aside>
    )
}

export default ChatBox
