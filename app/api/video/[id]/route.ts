import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET(
     request: Request,
  { params }: { params:Promise< { id: string } >}
){
try{
    await connectToDatabase()
        const { id } = await params;
  if (!id) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }
    const video=await Video.findById(id).lean()
     if (!video) {
      return NextResponse.json(
        { error: "Video not found" },
        { status: 404 }
      );
    }
        return NextResponse.json(video, { status: 200 });

}
catch(error){
     console.error("Error fetching video by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 }
    );
}
}