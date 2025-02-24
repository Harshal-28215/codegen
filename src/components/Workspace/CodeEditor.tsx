"use client"

import React from 'react'
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import File from '@/Utils/Files and Dependencies/File';
import { useGetFiles } from '@/Utils/Hooks/updatecode';
import { useParams } from 'next/navigation';
import CodeLoder from './CodeLoder';

function CodeEditor() {

    const params = useParams();
    const id = params.id as string;
    const [activeTab, setActiveTab] = React.useState('code');

    const { updatedFiles, codeLoading } = useGetFiles(id);


    return (
        <section className='md:w-8/12 w-10/12'>
            <div className='bg-[#181818] w-full p-2 rounded-sm'>
                <div className='flex'>
                    <h1 className={`${activeTab === 'code' && 'font-bold bg-white/10 rounded-full'} px-2 cursor-pointer`} onClick={() => setActiveTab('code')}>Code</h1>
                    <h1 className={`${activeTab !== 'code' && 'font-bold bg-white/10 rounded-full'} px-2 cursor-pointer`} onClick={() => setActiveTab('')}>Preview</h1>
                </div>
            </div>
            <SandpackProvider
                files={updatedFiles}
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
                    {codeLoading ?
                        <CodeLoder />
                        :
                        activeTab === 'code' ?
                            <>
                                <SandpackFileExplorer className='fileexplorer' />
                                <SandpackCodeEditor className='codeediter' />
                            </>
                            :
                            <SandpackPreview className='codeediter' showNavigator={true} />

                    }
                </SandpackLayout>
            </SandpackProvider>
        </section>
    )
}

export default CodeEditor
