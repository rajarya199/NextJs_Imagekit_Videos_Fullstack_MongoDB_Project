import VideoPage from '@/components/video/VideoPage'
import React from 'react'
interface VideoParam{
    params:Promise<{id:string}>
}
const page = async({params}:VideoParam) => {
    const{id}=await params
  return (
    <div className='wrapper'>
        <VideoPage videoId={id}/>
    </div>
  )
}

export default page