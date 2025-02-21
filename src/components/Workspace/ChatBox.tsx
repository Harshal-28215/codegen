import React from 'react'
import Chats from './Chats'
import InputBox from './InputBox'

function ChatBox() {
    return (
        <aside className='w-3/12 h-full border-r border-white/10 relative'>
            <Chats />
            <InputBox />
        </aside>
    )
}

export default ChatBox
