import connectToDatabase from "@/DBconnect/Db";
import { NextResponse } from "next/server";
import Workspace from "@/DbSchema/workspace";

export async function POST(request: Request) {
    await connectToDatabase();

    const { message, role, user } = await request.json();

    if (message === "" ) {
        return NextResponse.json({ message: "message is required" }, { status: 400 });
    }

    try {
        
        const data = new Workspace({message: [{ role, message }],user: user});
        await data.save();
        const dataId = data._id;

        return NextResponse.json({ message: "workspace created", dataId }, { status: 200 });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ message: "workspace not created", error }, { status: 404 });
    }
}

export async function GET(request: Request) {
    await connectToDatabase();

    const {searchParams} = new URL(request.url); 
    const {id} = Object.fromEntries(searchParams);

    try {
        const data = await Workspace.findById(id);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "workspace not found", error }, { status: 404 });
    }
}