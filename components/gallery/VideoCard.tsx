import React from 'react';
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
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <video
        src={video.videoUrl}
            poster={video.thumbnailUrl}
            controls={video.controls ?? true}
            width={video.transformation?.width}
            height={video.transformation?.height}
        className="w-full h-[200px] object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{video.title}</h3>
        <p className="text-gray-600 flex-grow">{video.description}</p>
      </div>
    </div>
  );
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
