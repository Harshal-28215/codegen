"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import ChatLoader from './ChatLoader';
import { useChat } from '@/Utils/Hooks/workspace';

function Chats() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const params = useParams();
  const id = params.id as string;

  const { chats, loading } = useChat(id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats, loading]);

  return (
    <div className='w-full h-[calc(100%-160px)] overflow-y-auto space-y-2 p-2'>
      {
        chats.map((chat) => (
          chat.role === 'user' ?
            <h1 className='bg-white/10 rounded-2xl p-2 w-[70%] ml-[30%]' key={chat._id}>{chat.message}</h1>
            :
            <h1 key={chat._id}>{chat.message}</h1>
        ))
      }
      {loading && <ChatLoader />}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Chats
