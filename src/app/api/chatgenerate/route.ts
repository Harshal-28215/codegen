import User from "@/DbSchema/user";
import { createChatSession, setApiKey } from "@/Utils/AiBoilerPlate";
import { NextResponse } from "next/server";

export async function POST(request:Request){    
    const {Prompt} = await request.json();
    const query = new URL(request.url);
    const uid = query.searchParams.get('uid');

    try{
        const user = await User.findById(uid);
        
        if(user.credit === 0 && user.gemini === ""){
            return NextResponse.json({message:"You Reached Your Credit Limit"},{status:429});
        }
        if (user.gemini !== "") {            
            setApiKey(user.gemini);
        }

        const chatSession = createChatSession(); // Create a new session

        const response = await chatSession.sendMessage(Prompt);
        const res = response.response.text();
        
        if (user.gemini === "") {
            user.credit -= 1;
            await user.save();
        }

        return NextResponse.json({message:"chat generated",data:res},{status:200});
    }catch(error){
        return NextResponse.json({message:"chat bit generated",error},{status:404});
    }
}