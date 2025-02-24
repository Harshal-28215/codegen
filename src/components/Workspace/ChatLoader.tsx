import React from 'react'

function ChatLoader() {
  return (
    <div className='space-y-5'>
      <div className='w-full skeleton h-3 rounded-full'></div>
      <div className='w-8/12 skeleton h-3 rounded-full'></div>
      <div className='w-10/12 skeleton h-3 rounded-full'></div>
      <div className='w-66/12 skeleton h-3 rounded-full'></div>
    </div>
  )
}

export default ChatLoader
