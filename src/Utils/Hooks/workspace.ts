import { useMyContext } from "@/context/CodeAgeContext";
import { useEffect } from "react";
import { updatechat } from "../UpdataChatFunction";

export function useChat(id: string) {
    const { chats, setChats } = useMyContext();

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
        }
        getChats()
    }, [])

    useEffect(() => {
        async function generateChat() {
            if (chats.length > 0 && chats[chats.length - 1].role === 'user') {
                const Prompt = chats.map(chat => chat.message).join('\n');
                const response = await fetch(`/api/codegenerate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Prompt })
                })
                const data = await response.json()
                const bodyData = {
                    message: data.data,
                    role: 'Bot',
                }
                console.log(bodyData);
                
                updatechat(bodyData, id, setChats);
            } else {
                return;
            }
        }
        generateChat();
    }, [chats])

    return chats;
}