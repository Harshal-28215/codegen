import { useMyContext } from '@/context/CodeAgeContext';
import Link from 'next/link'
import React from 'react'

function GeminiApi() {
    const {user} = useMyContext();
    const [key, setKey] = React.useState<string>('');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKey(e.target.value);
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (key === '') {
            alert('Please Enter Gemini Key');
            return
        }
        const response = await fetch(`/api/user?id=${user?._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gemini:key })
        })
        if (response.ok) {
            alert('Gemini Key Updated Successfully Please ignore if input is showing');
            setKey('');
        }
    }
    return (
        <div className='flex gap-4 items-center justify-center flex-col md:flex-row'>
            <form className='flex gap-2 items-center justify-center' onSubmit={onSubmit}>
                <input type="text" className='bg-white/10 p-2 rounded-md' placeholder='Enter Your Gemini Key' value={key} onChange={onChange} />
                <button type='submit' className='p-2 bg-white/10 rounded-md cursor-pointer'>Submit</button>
            </form>
            <Link href='https://aistudio.google.com/apikey' target='_blank' rel='noopener noreferrer'>
                Get Your Gemini Key From Here
            </Link>
        </div>
    )
}

export default GeminiApi
