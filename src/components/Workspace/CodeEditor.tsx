"use client"

import React, { useEffect, useRef } from 'react'
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import File from '@/Utils/Files and Dependencies/File';
import { useMyContext } from '@/context/CodeAgeContext';
import prompts from '@/Utils/Prompts/prompts';

function CodeEditor() {
    const [activeTab, setActiveTab] = React.useState('code');
    const { files, setFiles } = useMyContext();
    const { chats } = useMyContext();
    const hasGeneratedResponse = useRef(false);


    async function getFiles() {
        if (chats.length > 0 &&
            chats[chats.length - 1].role === 'user' &&
            !hasGeneratedResponse.current) {

            hasGeneratedResponse.current = true;

            const messages = chats.map(chat => chat.message).join('\n');
            const Prompt = JSON.stringify({ messages }) + " " + prompts.CODE_GEN_PROMPT;

            const response = await fetch('/api/codegenerate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Prompt })
            })
            const data = await response.json();
            if (response.ok) {
                const mergedfile = { ...File.DEFAULT_FILE, ...data.files }
                setFiles(mergedfile);
            }
        }
    }

    useEffect(() => {
        getFiles();
    }, [chats])

    return (
        <section className='w-8/12'>
            <div className='bg-[#181818] w-full p-2 rounded-sm'>
                <div className='flex'>
                    <h1 className={`${activeTab === 'code' && 'font-bold bg-white/10 rounded-full'} px-2 cursor-pointer`} onClick={() => setActiveTab('code')}>Code</h1>
                    <h1 className={`${activeTab !== 'code' && 'font-bold bg-white/10 rounded-full'} px-2 cursor-pointer`} onClick={() => setActiveTab('')}>Preview</h1>
                </div>
            </div>
            <SandpackProvider
                files={files}
                template="react"
                options={{
                    externalResources: [
                      "https://unpkg.com/@tailwindcss/browser@4"
                    ]
                  }}
                theme='dark'
                customSetup={{
                    dependencies: {
                        ...File.DEPENDANCY
                    },
                }}>

                <SandpackLayout>
                    {activeTab === 'code' ?
                        <>
                            <SandpackFileExplorer style={{ height: 'calc(100vh - 140px)', width: '100%' }} />
                            <SandpackCodeEditor style={{ height: 'calc(100vh - 140px)', width: '100%' }} />
                        </>
                        :
                        <SandpackPreview style={{ height: 'calc(100vh - 140px)', width: '100%' }} showNavigator={true} />
                    }
                </SandpackLayout>
            </SandpackProvider>
        </section>
    )
}

export default CodeEditor
