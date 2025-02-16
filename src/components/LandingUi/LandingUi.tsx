import React from 'react'
import { TextareaForm } from './Input'
import Suggestions from './Suggestions'

function LandingUi() {
  return (
    <main className='h-[calc(100vh-88px)] w-full flex justify-center items-center flex-col'>
      <h1 className='font-bold text-3xl mb-4'>Enter The Prompt And See Magic</h1>
      <TextareaForm />
      <Suggestions />
    </main>
  )
}

export default LandingUi
