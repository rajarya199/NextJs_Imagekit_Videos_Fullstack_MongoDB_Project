import React, { useState } from 'react'
import {
    
  PlayIcon,
//   PauseIcon,
  SettingsIcon,
  SlidersIcon,
  ZapIcon,
} from 'lucide-react'
import Image from 'next/image'
const VideoPreview = () => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative border */}
      <div
        className={`absolute -inset-0.5 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 dark:bg-gradient-to-r dark:from-pink-500 dark:to-purple-600' : 'bg-gradient-to-r from-purple-400 to-indigo-500`}
      ></div>
      <div
        className={`relative dark:bg-black bg-gray-800 rounded-2xl overflow-hidden`}
      >
        {/* Video preview */}
        <div className="aspect-video w-full h-full max-w-[600px] relative">
          <Image
            src="https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
            alt="Video editing preview"
            width={500}
            height={500}
                        // sizes="(max-width: 600px) 100vw, 600px"

            className="w-full h-full object-cover"
          />
          {/* Video controls overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex justify-between">
              <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                Original
              </span>
              <div className="flex space-x-2">
                <button className="bg-black/60 text-white p-1.5 rounded-full hover:bg-purple-600/80 backdrop-blur-sm transition-colors">
                  <SlidersIcon className="h-4 w-4" />
                </button>
                <button className="bg-black/60 text-white p-1.5 rounded-full hover:bg-purple-600/80 backdrop-blur-sm transition-colors">
                  <SettingsIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`text-white p-2 rounded-full transition-colors dark:bg-purple-600 dark:hover:bg-purple-500 bg-indigo-600 hover:bg-indigo-500`}
              >
                <PlayIcon className="h-5 w-5" />
              </button>
              <div className="w-full mx-4 bg-gray-600/50 h-1 rounded-full overflow-hidden">
                <div
                  className={`h-full w-3/4 dark:bg-purple-500 bg-indigo-500`}
                ></div>
              </div>
              <span className="text-white text-xs">1:45 / 2:30</span>
            </div>
          </div>
        </div>
        {/* Transformation preview */}
        <div
          className={`p-4 border-t dark:bg-gray-900 dark:border-gray-800 bg-gray-800 border-gray-700`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-medium">Transform Preview</h3>
              <p className="text-gray-400 text-sm">
                See how your video could look
              </p>
            </div>
            <button
              className={`text-white text-sm py-1.5 px-3 rounded-md flex items-center transition-colors dark:bg-purple-600 dark:hover:bg-purple-500 bg-indigo-600 hover:bg-indigo-500`}
            >
              <ZapIcon className="h-4 w-4 mr-1" />
              Apply Effect
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="aspect-video bg-gray-800 rounded overflow-hidden relative group/thumb hover:ring-2 hover:ring-purple-500 cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                alt="Cinematic effect"
                fill
                className="w-full h-full object-cover brightness-75 saturate-150"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition">
                <span className="text-xs text-white">Cinematic</span>
              </div>
            </div>
            <div className="aspect-video bg-gray-800 rounded overflow-hidden relative group/thumb hover:ring-2 hover:ring-purple-500 cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                alt="Vintage effect"
                fill
                className="w-full h-full object-cover grayscale sepia-[0.5]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition">
                <span className="text-xs text-white">Vintage</span>
              </div>
            </div>
            <div className="aspect-video bg-gray-800 rounded overflow-hidden relative group/thumb hover:ring-2 hover:ring-purple-500 cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                alt="Neon effect"
                fill
                className="w-full h-full object-cover contrast-125 brightness-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition">
                <span className="text-xs text-white">Vibrant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VideoPreview 