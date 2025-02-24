import { useMyContext } from "@/context/CodeAgeContext";
import { useEffect, useState } from "react";

type userChat = {
    _id: string,
    message: { role: string, message: string }[],
    user: string
}[]

export function useSideBarChat(id:string) {
    const { user } = useMyContext();
    const [userChat, setUserChat] = useState<userChat>([])

    useEffect(() => {
        if (user === null) {
            return
        }
        async function getUserChat() {
            const response = await fetch(`/api/workspace?uid=${user?._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (response.ok) {
                setUserChat(data)
            } else {
                console.log('error fetching user chat');
            }
        }
        getUserChat()
    }, [user,id])

    return { userChat }
}