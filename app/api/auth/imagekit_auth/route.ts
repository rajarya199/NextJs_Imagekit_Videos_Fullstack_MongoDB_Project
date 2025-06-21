// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server"
import { NextResponse } from "next/server";

export async function GET() {
    // Your application logic to authenticate the user
    // For example, you can check if the user is logged in or has the necessary permissions
    // If the user is not authenticated, you can return an error response
try{

    const authenticationParameters = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, 
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
 
    })

    return NextResponse.json({ ...authenticationParameters, publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY })
}
catch(error){
    console.error("Error generating Imagekit authentication parameters:", error);
   return NextResponse.json(
      {
        error: "Authentication for Imagekit failed",
      },
      { status: 500 }
    );
}
}