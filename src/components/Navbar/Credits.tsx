import { useMyContext } from '@/context/CodeAgeContext'
import React from 'react'

function Credits() {
    const { credits,user } = useMyContext();
    return (
        <div className='mb-1 text-white font-bold text-xl'>
            {user?.gemini 
            ? 'Credits: Ask Google'
                : `Credits: ${credits}`
            }
        </div>
    )
}

export default Credits
