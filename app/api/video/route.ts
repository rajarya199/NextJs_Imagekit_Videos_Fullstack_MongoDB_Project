import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";
export async function GET(){
    try{
        await connectToDatabase()
        const videos=await Video.find({}).sort({createdAt:-1}).lean()
        if(!videos || videos.length===0){
            return NextResponse.json([],{status:200})
        }
        return NextResponse.json(videos)
    }
    catch(error){
        console.error("Error fetching videos:", error);
        return NextResponse.json(
            { error:"Failed to fetch videos" },
            {status:500}
        )

    }
}