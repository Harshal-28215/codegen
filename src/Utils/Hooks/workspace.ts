import { useMyContext } from "@/context/CodeAgeContext";
import { useEffect, useRef } from "react";
import { updatechat } from "../UpdataChatFunction";
import prompts from "../Prompts/prompts";

export function useChat(id: string) {
    const { chats, setChats } = useMyContext();
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

                updatechat(bodyData, id, setChats);
            } else {
                return;
            }
        }
        generateChat();
    }, [chats, id])

    return chats;
}