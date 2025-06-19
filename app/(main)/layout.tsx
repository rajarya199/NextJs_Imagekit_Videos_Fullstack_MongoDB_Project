import Navbar from '@/components/Navbar'
import React from 'react'

const Layout=async({children}:{children:React.ReactNode})=>{
    return (
         <main className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <div >
   {children}
      </div>
  
    </main>

    )
}
 export default Layout