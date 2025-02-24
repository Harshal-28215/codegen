import { useMyContext } from "@/context/CodeAgeContext";
import { useEffect, useRef, useState } from "react";
import { updatechat } from "../UpdataChatFunction";
import prompts from "../Prompts/prompts";

export function useChat(id: string) {
    const { chats, setChats,setFiles,setCodeLoading } = useMyContext();
    const [loading, setLoading] = useState(false);
    const hasGeneratedResponse = useRef(false);

    useEffect(() => {
        async function getChats() {
            setLoading(true);
            setCodeLoading(true);
            const response = await fetch(`/api/workspace?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (response.ok) {
                setChats(data.message);
                setFiles(data.files);
                setLoading(false);
                setCodeLoading(false);
            }else{
                console.log('error fetching chat');
                setLoading(false);
                setCodeLoading(false);
            }
        }
        getChats()
    }, [id])

    useEffect(() => {
        async function generateChat() {
            setLoading(true);
            if (chats.length > 0 &&
                chats[chats.length - 1].role === 'user' &&
                !hasGeneratedResponse.current) {

                hasGeneratedResponse.current = true;

                const messages = chats.map(chat => chat.message).join('\n');
                const Prompt = JSON.stringify({ messages }) + prompts.CHAT_PROMPT;
                const response = await fetch(`/api/chatgenerate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Prompt })
                })
                const data = await response.json()
                if (response.ok) {
                    const bodyData = {
                        message: data.data,
                        role: 'Bot',
                    }
    
                    const updated = await updatechat(bodyData, id, setChats);
                    setLoading(false);
                    console.log('chat updated');
                    if (updated) {
                        hasGeneratedResponse.current = false;
                    }
                }
            } else {
                console.log('No new message from user or already generated response');
                setLoading(false);
            }
        }
        generateChat();
    }, [chats, id])

    return {chats,loading};
}