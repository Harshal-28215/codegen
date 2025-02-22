"use client"

import { useMyContext } from '@/context/CodeAgeContext'
import React from 'react'

function Suggestions() {
  const {setHomePrompt} = useMyContext();

  const suggestions = [
    'Create ToDo App',
    'Create Gym Management App',
    'Create Budget Traking System',
    'Create Lms Portal For Collage',
    'Create Authentication Ui'
  ]
  return (
    <div className='w-3/6 flex flex-wrap justify-center items-center gap-4 mt-3'>
      {suggestions.map((suggestion, index) => (
        <p className='flex justify-center items-center py-1 px-2 text-center rounded-full border-2 border-white/20 text-white/80 cursor-pointer hover:border-white hover:text-white' key={index} onClick={()=>setHomePrompt(suggestion)}>{suggestion}</p>
      ))}
    </div>
  )
}

export default Suggestions
