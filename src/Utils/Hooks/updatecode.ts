import { useMyContext } from "@/context/CodeAgeContext";
import prompts from "../Prompts/prompts";
import { useEffect, useRef } from "react";
import File from "../Files and Dependencies/File";
import { updatedFiles } from "../UpdateCodeFuntion";

export function useGetFiles(id: string) {
    const hasGeneratedResponse = useRef(false);
    const { files, setFiles, chats, setCodeLoading, codeLoading, user, credits } = useMyContext();

    useEffect(() => {
        async function getFiles() {
            if (chats.length > 0 &&
                chats[chats.length - 1].role === 'user' &&
                !hasGeneratedResponse.current) {
                setCodeLoading(true);
                console.log('code loading');
                

                hasGeneratedResponse.current = true;

                const messages = chats.map(chat => chat.message).join('\n');
                const Prompt = JSON.stringify({ messages }) + " " + prompts.CODE_GEN_PROMPT;

                const response = await fetch(`/api/codegenerate?uid=${user?._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Prompt, credit: credits })
                })
                const data = await response.json();
                if (response.ok) {
                    const dataFiles = data.files
                    const mergedfile = { ...File.DEFAULT_FILE, ...dataFiles }
                    await updatedFiles(mergedfile, id);
                    setFiles(mergedfile);
                    setCodeLoading(false);
                    console.log('code updated1');
                    
                    hasGeneratedResponse.current = false;
                } else {
                    setFiles(File.DEFAULT_FILE);
                    setCodeLoading(false);
                    console.log('code updated2');

                }
            }else{
                console.log('code updated else');
            }
        }
        getFiles()
    }, [chats])


    return { updatedFiles: files, codeLoading };
}