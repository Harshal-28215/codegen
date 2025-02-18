import ChatBox from '@/components/Workspace/ChatBox'
import CodeEditor from '@/components/Workspace/CodeEditor'
import React from 'react'

function page() {
  return (
    <main className='h-[calc(100vh-100px)] w-full flex justify-center items-center mt-2 gap-4'>
      <ChatBox />
      <CodeEditor />
    </main>
  )
}

export default page
