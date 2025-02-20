"use client"

import { useChat } from '@/Utils/Hooks/workspace';
import { useParams } from 'next/navigation'
import React from 'react'

function Chats() {

  const params = useParams();
  const id = params.id as string;
  
  const chats = useChat(id);

  return (
    <div className='w-full h-[calc(100%-150px)] overflow-y-auto space-y-2 p-2'>
      {chats.map((chat) => (
        chat.role === 'user' ?
          <h1 className='bg-white/10 rounded-2xl p-2 w-[70%] ml-[30%]' key={chat._id}>{chat.message}</h1>
          :
          <h1 key={chat._id}>{chat.message}</h1>
      ))}
    </div>
  )
}

export default Chats
