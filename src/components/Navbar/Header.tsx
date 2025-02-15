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
            <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
            <div ref={sidebarRef}>
                <Sidebar isOpen={isOpen} />
            </div>
        </header>
    )
}

export default Header
