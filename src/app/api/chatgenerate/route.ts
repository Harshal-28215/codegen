import { chatSession } from "@/Utils/AiBoilerPlate";
import { NextResponse } from "next/server";

export async function POST(request:Request){    
    const {Prompt} = await request.json();
    try{
        const response = await chatSession.sendMessage(Prompt);
        const res = response.response.text();
        
        return NextResponse.json({message:"chat generated",data:res},{status:200});
    }catch(error){
        return NextResponse.json({message:"chat bit generated",error},{status:404});
    }
}