"use client"

import React from 'react'

function Logout() {
    const logout = () => {
        localStorage.removeItem('user')
        window.location.href = '/'
    }
    return (
        <div className='bg-white/70 hover:bg-white text-black w-[100%] rounded-md' onClick={logout}>
            <h1 className='text-black text-center font-semibold my-2 w-full cursor-pointer' onClick={() => logout}>Log Out</h1>
        </div>
    )
}

export default Logout
