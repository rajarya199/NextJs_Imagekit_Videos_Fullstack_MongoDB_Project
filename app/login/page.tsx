"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
const LoginPage = () => {
 const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    const router=useRouter()

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    const result=await signIn("credentials",{
            email,
            password,
            redirect:false
        })
        if(result?.error){
            console.log(result.error)
        }else {
            router.push('/')
        }
    }
  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
              <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
                <button type="submit">Register</button>

        </form>
           <div>
         Don't have an account ?
        <button onClick={() => router.push("/register")}>Register</button>
      </div>
    </div>
  )
}

export default LoginPage