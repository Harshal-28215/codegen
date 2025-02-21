import connectToDatabase from "@/DBconnect/Db";
import { chatSession } from "@/Utils/AiBoilerPlate";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    await connectToDatabase();
    
    const {Prompt} = await request.json();
    try{
        const response = await chatSession.sendMessage(Prompt);
        const res = response.response.text();
        return NextResponse.json({message:"workspace created",data:res},{status:200});
    }catch(error){
        console.log(error);
        return NextResponse.json({message:"workspace not created",error},{status:404});
    }
}