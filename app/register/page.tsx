'use client'
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const RegisterPage = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
        const[confirmPassword,setConfirmPassword]=useState("")
const router=useRouter()

const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault()
if(password!== confirmPassword){
    alert("passsword didnot match")
}
try{
    const res=await fetch ("api/auth/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            email,
            password,

        }),
    })
    const data=await res.json();
    if(!res.ok){
        throw new Error(data.error || "registration failed")
    }
    console.log(data);
    router.push("/login")
}
catch(error){
    console.error(error)

}
}
  return (
        <div className="flex w-full min-h-screen justify-center items-center bg-gray-50 p-4">
          <div className='w-full max-w-md'>
               <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
<div className='p-6 sm:p-8'>
   <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
             Create an account
          </h2>
<form onSubmit={handleSubmit}>
     <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
                   <input
          type="email"
            id="email"
                  name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
                            className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}

        />
              </div>
                <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
                <input
                   id="password"
                  name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
                                      className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}

        />
              </div>
                <div className="mb-4">
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
                <input
                   id="cpassword"
                  name="cpassword"
          type="password"
          placeholder=" Confirm Password"
            value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
                                      className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}

        />
              </div>
                  <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >Register</button>
</form>
   <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account? 
          <Link href='/login' className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors duration-200"
> Login</Link>
          </p>
</div>
      </div>
          </div>
</div>
  )
}

export default RegisterPage