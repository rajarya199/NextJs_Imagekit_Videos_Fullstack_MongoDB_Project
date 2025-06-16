import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request:NextRequest){
    try{
        //check if the user is authenticated
const session=await getServerSession(authOptions)
if(!session){
       console.error("Error fetching videos:");
        return NextResponse.json(
            { error:"unauthorized user" },
            {status:401}
        )
}
//check db conneted
await connectToDatabase()
//post
const body:IVideo=await request.json()
if(!body.title ||
    !body.description || 
    !body.videoUrl ||
     !body.thumbnailUrl
){
    return NextResponse.json(
        { error: "missing required filed" },
        { status: 400 }
    );
}

//create video data to post
const videoData={
    ...body,
    controls: body?.controls ?? true,
    transformations:{
        height:1920,
        width:1080,
        quality:body.transformation?.quality ?? 100
    }
}
const newVideo =await Video.create(videoData)
return NextResponse.json(newVideo, { status: 201 });
    }
    catch(error){
        console.error("Error uploading video:", error);
        return NextResponse.json(
            { error: "Failed to upload video" },
            { status: 500 }
        );
    }
}