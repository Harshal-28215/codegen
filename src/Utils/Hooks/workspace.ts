import { useMyContext } from "@/context/CodeAgeContext";
import { useEffect, useRef } from "react";
import { updatechat } from "../UpdataChatFunction";
import prompts from "../Prompts/prompts";

export function useChat(id: string) {
    const { chats, setChats } = useMyContext();
    const {setFiles} = useMyContext();
    const hasGeneratedResponse = useRef(false);

    useEffect(() => {
        async function getChats() {
            const response = await fetch(`/api/workspace?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setChats(data.message);
            setFiles(data.files);
        }
        getChats()
    }, [id])

    useEffect(() => {
        async function generateChat() {
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
    
                    await updatechat(bodyData, id, setChats);
                    console.log('chat updated');
                    
                }
            } else {
                console.log('No new message from user or already generated response');
                
            }
        }
        generateChat();
    }, [chats, id])

    return chats;
}