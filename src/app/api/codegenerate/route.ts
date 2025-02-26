import User from "@/DbSchema/user";
import { createCodeSession, setApiKey } from "@/Utils/AiBoilerPlate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { Prompt } = await request.json();
    // const query = new URL(request.url);
    // const uid = query.searchParams.get('uid');

    try {
        const chatSession = createCodeSession();

        const response = await chatSession.sendMessage(Prompt);
        const data = response.response.text();

        return NextResponse.json(JSON.parse(data), { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error generating code", error }, { status: 404 });
    }
}