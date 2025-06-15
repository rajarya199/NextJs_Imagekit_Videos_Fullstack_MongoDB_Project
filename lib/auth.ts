import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth"
import { connectToDatabase } from "./db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
export const authOptions:NextAuthOptions={
   providers:[
    CredentialsProvider({
        name:"Credentials",
        credentials:{
            email:{label:"Email",type:"text"},
            password:{label:"Password",type:"password"}
      
        },
        async authorize(credentials){
            if(!credentials?.email || !credentials?.password) {
                throw new Error("Email and password are required");
            }
            try{
                //wait till db connect
                await connectToDatabase()
                //check if user exist
            const user=await User.findOne({email:credentials.email})
            if(!user){
                throw new Error("User not found");
            }
//compare password
       const isValid= await bcrypt.compare(
                credentials.password,
                user.password
            )
            if(!isValid){
                throw new Error("Invalid password");
            }
//return auth user data
            return{
                id:user._id.toString(),
                email:user.email,
            }
            }
            catch(error){
                console.error("auth error",error)

            }
        }
    })
   ],
   callbacks:{
    // This callback is called whenever a session is checked or created
    //customize jwt
    async jwt({ token,user}){
        if(user){
            token.id=user.id
        }
        return token
    },
    //customize session
    async session({session,token}){
        if(session.user){
            session.user.id=token.id as string; // Ensure token.id is a string

        }
        return session;
    }

       

   },
   //location of auth pages
   pages:{
    signIn:"/login",
    error:"/login",
   },
   session:{
    strategy:"jwt", // Use JWT for session management
    maxAge:30 * 24 * 60 * 60, // 30 days
   },
   secret:process.env.NEXTAUTH_SECRET
}