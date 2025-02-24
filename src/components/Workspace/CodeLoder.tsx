import React from 'react'

function CodeLoder() {
    return (
        <div className='w-full h-[calc(100vh-140px)] flex justify-center items-center'>
            <div className='w-[25%] h-full border-r border-white/30 px-4 pt-5 space-y-5'>
                <div className='w-full h-3 skeleton rounded-full'></div>
                <div className='w-6/12 h-3 skeleton rounded-full'></div>
                <div className='w-8/12 h-3 skeleton rounded-full'></div>
                <div className='w-full h-3 skeleton rounded-full'></div>
                <div className='w-10/12 h-3 skeleton rounded-full'></div>
            </div>
            <div className='w-[80%] h-full px-4 pt-5 space-y-5'>
                <div className='w-full h-3 skeleton rounded-full'></div>
                <div className='w-6/12 h-3 skeleton rounded-full'></div>
                <div className='w-8/12 h-3 skeleton rounded-full'></div>
                <div className='w-full h-3 skeleton rounded-full'></div>
                <div className='w-6/12 h-3 skeleton rounded-full'></div>
                <div className='w-8/12 h-3 skeleton rounded-full'></div>
                <div className='w-full h-3 skeleton rounded-full'></div>
                <div className='w-6/12 h-3 skeleton rounded-full'></div>
                <div className='w-8/12 h-3 skeleton rounded-full'></div>
                <div className='w-full h-3 skeleton rounded-full'></div>
                <div className='w-10/12 h-3 skeleton rounded-full'></div>
            </div>
        </div>
    )
}

export default CodeLoder
