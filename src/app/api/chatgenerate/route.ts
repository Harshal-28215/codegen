import { createChatSession } from "@/Utils/AiBoilerPlate";
import { NextResponse } from "next/server";

export async function POST(request:Request){    
    const {Prompt,credit} = await request.json();

    try{
        if (credit === 0) {
            return NextResponse.json({ message: "Insufficient Credits" }, { status: 429 });
        }
        const chatSession = createChatSession();

        const response = await chatSession.sendMessage(Prompt);
        const res = response.response.text();

        return NextResponse.json({message:"chat generated",data:res},{status:200});
    }catch(error){
        return NextResponse.json({message:"chat bit generated",error},{status:404});
    }
}