import { useMyContext } from "@/context/CodeAgeContext";
import { useEffect, useRef, useState } from "react";
import { updatechat } from "../UpdataChatFunction";
import prompts from "../Prompts/prompts";

export function useChat(id: string) {
    const { chats, setChats, setFiles, user, setCredits, setOpenCredit,credits } = useMyContext();
    const [loading, setLoading] = useState(false);
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
            if (response.ok) {
                setChats(data.message);
                setFiles(data.files);
            } else {
                console.log('error fetching chat');
            }

        }
        getChats()
    }, [id])

    useEffect(() => {
        async function generateChat() {
            if (chats.length > 0 &&
                chats[chats.length - 1].role === 'user' &&
                !hasGeneratedResponse.current) {
                setLoading(true);

                hasGeneratedResponse.current = true;

                const messages = chats.map(chat => chat.message).join('\n');
                const Prompt = JSON.stringify({ messages }) + prompts.CHAT_PROMPT;
                const response = await fetch(`/api/chatgenerate?uid=${user?._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ Prompt, credit: credits})
                })
                const data = await response.json()
                if (response.ok) {
                    const bodyData = {
                        message: data.data,
                        role: 'Bot',
                    }

                    const updated = await updatechat(bodyData, id, setChats);
                    setCredits(prev=>prev-1);
                    setLoading(false);
                    if (updated) {
                        hasGeneratedResponse.current = false;
                    }
                }else if (response.status === 429) {
                    setOpenCredit(true);
                    setLoading(false);
                    
                }else{
                    setLoading(false);
                }
            } else {
                console.log('No new message from user or already generated response');
            }
        }
        generateChat();
    }, [chats, id])

    return { chats, loading };
}