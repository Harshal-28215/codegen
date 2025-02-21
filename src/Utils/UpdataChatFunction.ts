type Chat = {
    role: string;
    message: string;
    _id: string;
  }[]
  
export async function updatechat(bodyData: { message: string, role: string }, id: string, setChats: React.Dispatch<React.SetStateAction<Chat | []>>) {

    const response = await fetch(`/api/workspace?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
    const body = await response.json()
    if (response.ok) {
        setChats((prev) => [...prev, body.data])
        return true
    }
    return false
}