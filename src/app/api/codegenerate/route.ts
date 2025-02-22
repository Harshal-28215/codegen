import { codeSession } from "@/Utils/AiBoilerPlate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {Prompt} = await request.json();
    try {
        const response = await codeSession.sendMessage(Prompt);
        const data = response.response.text();
    
        return NextResponse.json(JSON.parse(data), {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"error generating code",error},{status:404});
    }
}