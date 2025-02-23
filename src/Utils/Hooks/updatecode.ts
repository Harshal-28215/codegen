import { useMyContext } from "@/context/CodeAgeContext";
import prompts from "../Prompts/prompts";
import { useEffect, useRef } from "react";
import File from "../Files and Dependencies/File";

export function useGetFiles(id: string) {
    const hasGeneratedResponse = useRef(false);
    const { chats } = useMyContext();
    const { files, setFiles } = useMyContext();

    useEffect(() => {
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
                    const dataFiles = data.files
                    const mergedfile = { ...File.DEFAULT_FILE, ...dataFiles }
                    setFiles(mergedfile);
                }
            }
        }
        getFiles()
    }, [chats])

    useEffect(() => {
        async function updatedFiles() {
            const response = await fetch(`/api/workspace?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ files })
            })
            if (response.ok) {
                console.log("code updated");
            }else{
                console.log("code not updated");
            }
        }
        updatedFiles()
    }, [files])


    return { updatedFiles: files };
}