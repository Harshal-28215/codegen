"use client"

import React from 'react'
import { TextareaForm } from './Input'
import Suggestions from './Suggestions'

function LandingUi() {
  
  return (
    <main className='h-[calc(100vh-88px)] w-full flex justify-center items-center flex-col relative px-5'>
      <h1 className='font-bold text-2xl sm:text-3xl mb-4'>Enter The Prompt And See Magic</h1>
      <div className="absolute bottom-[32%] right-[21%] transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 filter blur-3xl opacity-50 -z-10"></div>
      <TextareaForm />
      <Suggestions />
    </main>
  )
}

export default LandingUi
