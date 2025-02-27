import { codeSession } from "@/Utils/AiBoilerPlate";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { Prompt, credit } = await request.json();

    try {
        if (credit === 0) {
            return NextResponse.json({ message: "Insufficient Credits" }, { status: 429 });
        }

        const response = await codeSession.sendMessage(Prompt);
        const data = response.response.text();

        return NextResponse.json(JSON.parse(data), { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error generating code", error }, { status: 404 });
    }
}