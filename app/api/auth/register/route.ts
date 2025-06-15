import { NextRequest,NextResponse } from "next/server";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
    try{
        //get data from frontend
const{email,password}=await request.json()
//check if data provided
if(!email || !password){
    return NextResponse.json(
        {error:"email and password are required"},
        {status:400}
    )
}
//to check user exist ,also check if db is connected
await connectToDatabase();
const existingUser=await User.findOne({email})
if(existingUser){
    return NextResponse.json(
        {error:"User already exists"},
        {status:400}
    )
}
await User.create({
    email,
    password,
})
return NextResponse.json(
    {
    message:"user register successfully"},
    {status:201}
)
    }
    catch(error){
        console.error("Error in user registration:", error);
        return NextResponse.json(
            {error:"failed to register"},
            {status:400}
        )
    }
}