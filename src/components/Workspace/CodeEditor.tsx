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

function CodeEditor() {

      const params = useParams();
      const id = params.id as string;
    const [activeTab, setActiveTab] = React.useState('code');

    const {updatedFiles} = useGetFiles(id);
    

    return (
        <section className='w-8/12'>
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
