"use client"
import React, { useState, useEffect } from "react";
import VideoCard from "./VideoCard";

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

const VideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/video");
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data: Video[] = await res.json();
        setVideos(data);
      } catch (error: any) {
        setError(error.message || "Unknown error");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (loading) return <p className="text-center py-10">Loading videos...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <div className="grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          title={video.title}
          description={video.description}
          videoUrl={video.videoUrl}
          thumbnailUrl={video.thumbnailUrl}
          controls={video.controls}
          width={video.transformation?.width}
          height={video.transformation?.height}
        />
      ))}
    </div>
  );
};

export default VideoGallery;
