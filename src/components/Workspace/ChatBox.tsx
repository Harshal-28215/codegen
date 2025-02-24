import React from 'react'
import Chats from './Chats'
import InputBox from './InputBox'

function ChatBox() {
    return (
        <aside className='md:w-3/12 w-10/12 md:h-full h-[calc(100vh-88px)] md:border-r border-white/10 relative'>
            <Chats />
            <InputBox />
        </aside>
    )
}

export default ChatBox
