import React from 'react'
import {
  UploadIcon,
  WandIcon,
  LayoutGridIcon,
  PlayIcon,
  PauseIcon,
  CheckIcon,
} from 'lucide-react'
import Button from './Button'
// import VideoPreview from './VideoPreview'
const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-60 -left-40 w-80 h-80 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:flex-col lg:justify-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block">Transform Your Videos</span>
              <span className="block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Beyond Imagination
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Upload, transform, and showcase your videos in stunning new ways.
              Our platform handles videos of any size and dimension, with
              powerful transformation features to make your content stand out.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg">
                  <UploadIcon className="mr-2 h-5 w-5" />
                  Upload Video
                </Button>
                <Button variant="outline" size="lg">
                  Explore Features
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-sm text-gray-300">Any resolution</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-sm text-gray-300">Any file size</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-sm text-gray-300">Smart editing</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-sm text-gray-300">AI enhancements</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-sm text-gray-300">Custom filters</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-sm text-gray-300">Easy sharing</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            {/* <VideoPreview /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default HeroSection
