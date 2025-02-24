import connectToDatabase from "@/DBconnect/Db";
import { NextResponse } from "next/server";
import Workspace from "@/DbSchema/workspace";

export async function POST(request: Request) {
    await connectToDatabase();

    const { message, role, user, files } = await request.json();

    if (message === "") {
        return NextResponse.json({ message: "message is required" }, { status: 400 });
    }

    try {

        const data = new Workspace({ message: [{ role, message }], files: files, user: user });
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

    const { searchParams } = new URL(request.url);
    const { id, uid } = Object.fromEntries(searchParams);

    if (id) {
        try {
            const data = await Workspace.findById(id).sort({ createdAt: -1 });
            return NextResponse.json(data, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "workspace not found", error }, { status: 404 });
        }
    } else if (uid) {
        try {
            const data = await Workspace.find({ user: uid });
            return NextResponse.json(data, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "workspace not found", error }, { status: 404 });
        }
    }

}

export async function PUT(request: Request) {
    await connectToDatabase();

    const { message, role, files } = await request.json();
    const { searchParams } = new URL(request.url);
    const { id } = Object.fromEntries(searchParams);

    if (message) {
        try {
            const data = await Workspace.findByIdAndUpdate(
                id,
                { $push: { message: { role, message } } },
                { new: true }
            );
            const response = data.message[data.message.length - 1];
            return NextResponse.json({ data: response }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "workspace not found", error }, { status: 404 });
        }
    } else if (files) {
        try {
            const data = await Workspace.findByIdAndUpdate(
                id,
                { files },
                { new: true }
            );
            return NextResponse.json({ data }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "workspace not found", error }, { status: 404 });
        }
    }
}