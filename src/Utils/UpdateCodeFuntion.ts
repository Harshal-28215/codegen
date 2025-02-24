import { fileType } from "@/context/CodeAgeContext";

export async function updatedFiles(files:fileType,id:string) {
    const response = await fetch(`/api/workspace?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ files })
    })
    if (response.ok) {
        console.log("code updated");
        return true;
    }else{
        console.log("code not updated");
        return false;
    }
}