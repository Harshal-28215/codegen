import { useEffect, useState } from "react";

type Chat = {
    role: string;
    message: string;
    _id: string;
  }[]

export function useChat(id: string) {
    const [chats, setChats] = useState<Chat | []>([]);

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
    return chats;
}