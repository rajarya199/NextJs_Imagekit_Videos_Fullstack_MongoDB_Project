"use client"
import React,{useState} from 'react';
import Link from 'next/link';
interface Video {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    width?: number;
    height?: number;
  };
}
interface VideoCardProps {
video:Video
}

const VideoCard: React.FC<VideoCardProps> = ({
 video
}) => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/video/${video._id}`} passHref>
      <div className="dark:bg-primary-600 border border-gray-100 dark:border-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer transition-transform duration-200 hover:scale-105"
    
     onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative w-full h-[250px]'>
        {!isHovered ? (
           <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ):(
           <video
            src={video.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}

      </div>
      {/* <video
        src={video.videoUrl}
            poster={video.thumbnailUrl}
            controls={video.controls ?? true}
            width={video.transformation?.width}
            height={video.transformation?.height}
        className="w-full h-[200px] object-cover"
      /> */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-medium line-clamp-2 mb-2 text-gray-900 dark:text-gray-200">{video.title}</h3>
        {/* <p className="text-gray-600 flex-grow ">{video.description}</p> */}
      </div>
    </div>
  
    </Link>
  )
  
};

export default VideoCard;



// import React, { useState } from "react";

// interface VideoCardProps {
//   title: string;
//   description: string;
//   videoUrl: string;
//   thumbnailUrl: string;
//   controls?: boolean;
//   width?: number;
//   height?: number;
// }

// const VideoCard: React.FC<VideoCardProps> = ({
//   title,
//   description,
//   videoUrl,
//   thumbnailUrl,
//   controls = true,
//   width = 320,
//   height = 180,
// }) => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
//       <div
//         className="w-full"
//         style={{ height, maxHeight: height, maxWidth: width }}
//       >
//         {!isPlaying ? (
//           <img
//             src={thumbnailUrl}
//             alt={`Thumbnail for ${title}`}
//             className="w-full h-full object-cover cursor-pointer"
//             onClick={() => setIsPlaying(true)}
//             loading="lazy"
//           />
//         ) : (
//           <video
//             src={videoUrl}
//             controls={controls}
//             autoPlay
//             className="w-full h-full object-cover"
//             onEnded={() => setIsPlaying(false)}
//           />
//         )}
//       </div>
//       <div className="p-4 flex flex-col flex-grow">
//         <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
//         <p className="text-gray-600 flex-grow">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default VideoCard;
