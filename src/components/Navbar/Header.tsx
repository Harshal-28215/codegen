"use client"

import React, { useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Header() {
    const [isOpen, setIsOpen] = React.useState(false)
    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    return (
        <header className='relative'>
            <div className="absolute top-[-8%] left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[22rem] rounded-full bg-gradient-to-r from-pink-500 to-purple-500 filter blur-3xl opacity-50 -z-10"></div>
            <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
            <Sidebar isOpen={isOpen} ref={sidebarRef}/>
        </header>
    )
}

export default Header
