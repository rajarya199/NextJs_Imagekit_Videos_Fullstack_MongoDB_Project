"use client"
import React,{useEffect,useState} from 'react'
import { apiClient } from '@/lib/api-client'
import { IVideo } from "@/models/Video";
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react'

interface videoProps{
    videoId:string
}
const VideoPage = ({videoId}:videoProps) => {
    const[video,setVideo]=useState<IVideo| null>(null)
    const[loading,setLoading]=useState<boolean> (true)
useEffect(()=>{
    async function fetchVideo(){
      try{
        const res=await apiClient.getVideoById(videoId)
         setVideo(res);

      }
      catch(error){
        console.error("something went wrong:",error)
      }
      finally{
        setLoading(false)
      }
    }
    fetchVideo()
},[videoId])
  if (loading) {
    return <div>Loading video...</div>;
  }
   if (!video) {
    return <div>No video found.</div>;
  }
  return (
    <div className='mx-auto py-2'>
        <Link
        href={'/'}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-2"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to home
      </Link>
      <div className='w-full rounded-lg overflow-hidden mb-4 relative'>
        <video 
        src={video.videoUrl}
        poster={video.thumbnailUrl}
        controls={video.controls ?? true}
         className="w-full h-[450px] aspect-video object-contain"

        />
        
      </div>
      <div className='mt-4'>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        {video.title}
      </h1>
   <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        {/* {video.createdAt ? video.createdAt.toString() : ''} */}
        <p className="mt-2 text-gray-800 dark:text-gray-300">
          {video.description}
        </p>
      </div>
      </div>
    </div>
  )
}

export default VideoPage