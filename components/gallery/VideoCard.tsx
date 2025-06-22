import React from 'react';

interface VideoCardProps {
  title: string;
  description: string;
  videoUrl: string;      
  thumbnailUrl: string;  
  controls?: boolean;
  width?: number;
  height?: number;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  description,
  videoUrl,
  thumbnailUrl,
  controls = true,
  width ,
  height 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <video
        src={videoUrl}
        poster={thumbnailUrl}
        controls={controls}
        width={width}
        height={height}
        className="w-full h-[200px] object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
      </div>
    </div>
  );
};

export default VideoCard;