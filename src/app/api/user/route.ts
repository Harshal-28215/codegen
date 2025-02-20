import connectToDatabase from "@/DBconnect/Db";
import User from "@/DbSchema/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    await connectToDatabase();

    const data = await request.json();
    const { email, name, sub, picture } = data;

    const user = await User.findOne({ email: data.email });

    if (user) {
        return NextResponse.json({ message: "User already exists", data })
    } else {
        await User.create({
            name: name,
            email: email,
            image: picture,
            id: sub
        });
        return NextResponse.json({ message: "User created", data })
    }
}

export async function GET(request: Request) {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const {email,id} = Object.fromEntries(searchParams);
    const users = await User.findOne({email});

    if (users.id === id) {
        return NextResponse.json({message:"User Found",users},{status:200});
    }else{
        return NextResponse.json({message:"User not found"},{status:404});
    }
}